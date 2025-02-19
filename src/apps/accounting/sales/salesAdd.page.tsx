import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import SelectCustom from "@/components/ui/selectCustom"
import { SelectItem } from "@/components/ui/select"
import InvoiceForm from "@/components/purchases/InvoiceForm"

export default function SalesAddPage() {
  return (
    <div className="space-y-5">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="pt-6 space-y-10">
          <CardTitle>فاتورة جديدة</CardTitle>
          <SelectCustom
            //  @ts-ignore 
            className="h-12 w-60"
            required
            label="اختر المورد"
          >
            <SelectItem value="1">مورد 1</SelectItem>
            <SelectItem value="2">مورد 2</SelectItem>
          </SelectCustom>
        </CardHeader>
      </Card>
      <InvoiceForm />
    </div>
  )
}

