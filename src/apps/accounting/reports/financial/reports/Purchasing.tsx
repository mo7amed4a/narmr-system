import InputLabel from "@/components/form/InputLabel";
import { SelectItem } from "@/components/ui/select";
import SelectCustom from "@/components/ui/selectCustom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Purchasing() {
  return (
    <>
         <CardHeader>
            <Card className="border shadow-none">
              <CardHeader className="p-4">
                <CardTitle className="py-2">تقارير المشتريات</CardTitle>
                <div className="grid md:grid-cols-3 gap-4 pt-4">
                  <SelectCustom label="اختر الحساب">
                    <SelectItem value="erj">حساب 1</SelectItem>
                    <SelectItem value="xyz">حساب 2</SelectItem>
                  </SelectCustom>
                  <div className="flex flex-wrap md:flex-nowrap gap-3 items-center w-full">
                    <InputLabel
                      type="date"
                      label="المدة الزمنية من"
                      className="w-full"
                      placeholder=" "
                      classNameInput="!h-9"
                    />
                    <span className="text-xs md:text-base">الى</span>
                    <InputLabel
                      type="date"
                      label="المدة الزمنية الى"
                      className="w-full"
                      placeholder=" "
                      classNameInput="!h-9"
                    />
                  </div>
                  <SelectCustom label="اختر الفرع">
                    <SelectItem value="erj">فرع 1</SelectItem>
                    <SelectItem value="xyz">فرع 2</SelectItem>
                  </SelectCustom>
                </div>
              </CardHeader>
            </Card>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
          
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow className="border [&>*]:border bg-[#F1F1F1]">
                  <TableCell className="text-right font-semibold text-gray-700">
                    الوقت والتاريخ
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    المنتج
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    المورد
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    الكمية المشتراة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    سعر الوحدة
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-700">
                    اجمالي المشتريات
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow
                    key={index}
                    className={
                      "border [&>*]:border " +
                      (index % 2 === 0 ? "bg-white" : "bg-gray-50/50")
                    }
                  >
                    <TableCell className="text-sm text-gray-600">
                      {transaction.date}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.product}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.supplier}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.count}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.price}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {transaction.purchasing_total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
    </>
  )
}




const transactions = [
    {
      date: "20 Dec, 2021, 02:21 AM",
      product: "كريم مرطب",
      supplier: "علي",
      count: 4,
      price: 400,
      purchasing_total: "-"
    },
  ];
  