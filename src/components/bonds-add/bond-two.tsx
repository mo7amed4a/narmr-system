import SelectCustom from "@/components/ui/selectCustom"
import InputLabel from "@/components/form/InputLabel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"

export default function BookingBondTwo() {
  return (
    <div>
       <div className="mb-8">
            <div className="grid gap-6 lg:grid-cols-5">
              <div className="col-span-2">
                <InputLabel label="الاسم" classNameInput="!h-10"/>
              </div>
              <div className="col-span-2">
                <InputLabel label="ملاحظات" classNameInput="!h-10"/>
              </div>
              <div>
              <InputLabel label="الخزينة" classNameInput="!h-10"/>
              </div>
            </div>
            <div className="py-4 grid lg:grid-cols-5 items-center gap-4">
              <div className="col-span-2">
                <InputLabel classNameInput="!h-10" label="تاريخ السند" placeholder="تاريخ السند" type="date"/>
              </div>
              <SelectCustom label="اختر الفرع">
                <SelectItem value="reem">ريم فهد</SelectItem>
              </SelectCustom>
              <div className="col-span-2">
                <SelectCustom label="طريقة التحويل">
                  <SelectItem value="reem">ريم فهد</SelectItem>
                </SelectCustom>
              </div>
            </div>
          </div>
          <CardTitle className="pb-4">اضافة سند صرف</CardTitle>
          <Table>
            <TableHeader>
              <TableRow className="border [&>*]:border bg-gray-100">
                <TableHead className="text-right">اختر الحساب</TableHead>
                <TableHead className="text-right">الخدمة</TableHead>
                <TableHead className="text-right">المبلغ</TableHead>
                <TableHead className="text-right">الاجمالي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="border [&>*]:border">
                  <TableCell>
                    <Select>
                      <SelectTrigger className="rounded-none border-none shadow-none px-0">
                        <SelectValue placeholder="اختر الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem  value={"p"}>wenfm</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="rounded-none border-none shadow-none px-0">
                        <SelectValue placeholder="اختر الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem  value={"p"}>wenfm</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    <Input className="rounded-none border-none shadow-none px-0" placeholder="0"/>
                  </TableCell>
                </TableRow>
              <TableRow className="border [&>*]:border">
                <TableCell colSpan={3} className="text-right font-bold p-0">
                  <Button variant="green" className="rounded-none">+ إضافة</Button>
                </TableCell>
                <TableCell className="text-right font-bold">{"300"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  )
}
