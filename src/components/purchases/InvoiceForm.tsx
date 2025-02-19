import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SelectCustom from "@/components/ui/selectCustom"
import { SelectItem } from "@/components/ui/select"
import InputLabel from "../form/InputLabel";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const InvoiceForm = ({
  setStatus
}:{
  setStatus?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [items, setItems] = useState([
    { id: 1, product: "", quantity: 1, price: 100 },
  ]);

  const handleAddService = () => {
    setItems([
      ...items,
      { id: items.length + 1, product: "", quantity: 1, price: 100 },
    ]);
  };

  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const handleRemoveService = (index: number) => {
    const updatedItems = [...items];
    updatedItems.length != 1 && updatedItems.splice(index, 1);
    setItems(updatedItems);
  };


  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (setStatus) {
      setStatus(true)
    }
    console.log(items)
  }
  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader className="space-y-6 border-b">
        <CardTitle>الفاتورة</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSave} className="space-y-4 md:space-y-10">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col md:flex-row gap-3 md:items-center">
                <div className="grid md:grid-cols-3 gap-4 flex-1">
                  <SelectCustom
                    //  @ts-ignore 
                    className="h-12"
                    required
                    label="اختر المنتج"
                    onChange={(e: any) => handleChange(index, "product", e.target.value)}
                  >
                    <SelectItem value="1">منتج 1</SelectItem>
                    <SelectItem value="2">منتج 2</SelectItem>
                  </SelectCustom>
                  <InputLabel
                    label="اختر الكمية"
                    defaultValue={item.quantity}
                    type="number"
                    onChange={(e) => handleChange(index, "quantity", Number(e.target.value))}
                  />
                  <InputLabel
                    label="سعر الوحدة"
                    defaultValue={item.price}
                    type="number"
                    onChange={(e) => handleChange(index, "price", Number(e.target.value))}
                  />
                </div>
                <Button type="button" onClick={() => handleRemoveService(index)} size="icon" variant={"ghost"}>
                  <Trash2 className="text-red-800" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <span className="font-bold md:text-xl">
              الاجمالي {items.reduce((acc, item) => acc + item.quantity * item.price, 0)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <Button
              type="button"
              onClick={handleAddService}
              className="bg-[#2E7D321A] text-green-800 hover:bg-[#2E7D32] hover:text-white"
            >
              اضافة خدمة
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" className="text-red-800">
                استرجاع
              </Button>
              <Button type="submit" variant="green">
                تأكيد الفاتورة
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default InvoiceForm;
