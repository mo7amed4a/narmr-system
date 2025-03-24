import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import ProductsSelect from "../selects/ProductsSelect";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface AddInvoiceDialogProps {
  supplierId: number;
  onInvoiceAdded?: () => void; // Callback to refresh data after adding
}

export default function AddInvoiceDialog({ supplierId, onInvoiceAdded }: AddInvoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [invoiceType, setInvoiceType] = useState<"purchase" | "sale">("purchase");
  const [products, setProducts] = useState<{ product_id: string; quantity: string }[]>([
    { product_id: "", quantity: "" },
  ]);

  // Handle adding a new product row
  const handleAddProduct = () => {
    setProducts([...products, { product_id: "", quantity: "" }]);
  };

  // Handle removing a product row
  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  // Handle product selection change
  const handleProductChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].product_id = value;
    setProducts(updatedProducts);
  };

  // Handle quantity change
  const handleQuantityChange = (index: number, value: string) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = value;
    setProducts(updatedProducts);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedProducts = products
      .filter((p) => p.product_id && p.quantity) // Filter out incomplete entries
      .map((p) => ({
        product_id: parseInt(p.product_id),
        quantity: parseInt(p.quantity),
      }));

    if (formattedProducts.length === 0) {
      alert("يرجى إضافة منتج واحد على الأقل مع كمية صحيحة");
      return;
    }

    const payload = {
      supplier_id: parseInt(supplierId as any),
      products: formattedProducts,
      invoice_type: invoiceType,
    };

    try {
      const response = await api.post("/invoice1/add", payload);
      if (response.status === 200) {
        setOpen(false); // Close dialog
        setProducts([{ product_id: "", quantity: "" }]); // Reset form
        if (onInvoiceAdded) onInvoiceAdded(); // Trigger refresh
        toast.success("تم اضافة الفاتورة بنجاح");
      } else {
        toast.error("فشل في إضافة الفاتورة");
      }
    } catch (err) {
      console.error("Error adding invoice:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="green">فاتورة جديدة</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] text-right">
        <DialogHeader>
          <DialogTitle>إضافة فاتورة جديدة</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Invoice Type Selection */}
            <div className="grid gap-2">
              <Label htmlFor="invoiceType">نوع الفاتورة</Label>
              <select
                id="invoiceType"
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value as "purchase" | "sale")}
                className="w-full border rounded-md p-2"
              >
                <option value="purchase">شراء</option>
                <option value="sale">بيع</option>
              </select>
            </div>

            {/* Products List */}
            {products.map((product, index) => (
              <div key={index} className="flex gap-3 items-end">
                <div className="flex-1">
                  <ProductsSelect
                    value={product.product_id}
                    onValueChange={(value) => handleProductChange(index, value as any)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`quantity-${index}`}>الكمية</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(index, e.target.value)}
                    placeholder="ادخل الكمية"
                    required
                  />
                </div>
                {products.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    <Trash className="text-red-500" />
                  </Button>
                )}
              </div>
            ))}

            {/* Add Product Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleAddProduct}
              className="w-fit"
            >
              إضافة منتج <Plus className="mr-2" />
            </Button>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit" variant="green">
              حفظ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}