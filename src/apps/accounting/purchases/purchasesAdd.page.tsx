import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SuppliersSelect from "@/components/selects/SuppliersSelect";
import api from "@/lib/axios";
// ... باقي الاستيرادات كما هي
// ..
interface InvoiceFormProps {
  invoiceType?: "purchase" | "sale"; // Optional prop to set default invoice type
}

export default function InvoiceFormPage({ invoiceType = "purchase" }: InvoiceFormProps) {
  const navigate = useNavigate();
  const [supplierId, setSupplierId] = useState<string | null>(null);

  const [products, setProducts] = useState<
    { product_name: string; quantity: string; unit_price: string }[]
  >([{ product_name: "", quantity: "", unit_price: "" }]);

  const [selectedInvoiceType] = useState<"purchase" | "sale">(invoiceType);

  const handleAddProduct = () => {
    setProducts([...products, { product_name: "", quantity: "", unit_price: "" }]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: string, value: string) => {
    const updatedProducts = [...products];
    (updatedProducts[index] as any)[field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supplierId) {
      toast.error("يرجى اختيار مورد");
      return;
    }

    const formattedProducts = products
      .filter((p) => p.product_name && p.quantity && p.unit_price)
      .map((p) => ({
        product_name: p.product_name,
        quantity: parseInt(p.quantity),
        unit_price: parseFloat(p.unit_price),
      }));

    if (formattedProducts.length === 0) {
      toast.error("يرجى إضافة منتج واحد على الأقل مع جميع البيانات");
      return;
    }

    const payload = {
      supplier_id: parseInt(supplierId as any),
      products: formattedProducts,
      invoice_type: selectedInvoiceType,
    };

    try {
      const response = await api.post("/invoice1/add", payload);

      if (response.status === 200) {
        toast.success("تم إضافة الفاتورة بنجاح");
        navigate(-1);
      } else {
        toast.error("فشل في إضافة الفاتورة");
      }
    } catch (err) {
      console.error("Error adding invoice:", err);
      toast.error("حدث خطأ أثناء إضافة الفاتورة");
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SuppliersSelect
            value={supplierId?.toString() as string}
            onValueChange={(value) => setSupplierId(value)}
          />

          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-3 gap-3 items-end">
                <div>
                  <Label>اسم المنتج</Label>
                  <Input
                    type="text"
                    placeholder="اسم المنتج"
                    value={product.product_name}
                    onChange={(e) => handleProductChange(index, "product_name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>الكمية</Label>
                  <Input
                    type="number"
                    min="1"
                    placeholder="الكمية"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label>سعر الوحدة</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="السعر"
                      value={product.unit_price}
                      onChange={(e) => handleProductChange(index, "unit_price", e.target.value)}
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
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={handleAddProduct} className="w-fit">
            إضافة منتج <Plus className="mr-2" />
          </Button>

          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" className="text-red-500" onClick={() => navigate(-1)}>
              إلغاء
            </Button>
            <Button type="submit" variant="green">
              حفظ
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
