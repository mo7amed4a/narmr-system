import InputLabel from "@/components/form/InputLabel"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button"

export default function BookingBondThree() {
  return (
    <div>
        <div className="mb-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <InputLabel label="حساب المدين" classNameInput="!h-10"/>
              </div> 
              <div>
                <InputLabel label="المبلغ بالدولار" classNameInput="!h-10"/>
              </div>
              <div>
                <InputLabel label="حساب الدائن" classNameInput="!h-10"/>
              </div>
              <div>
                <InputLabel label="المبلغ بالدولار" classNameInput="!h-10"/>
              </div>
            </div>
          </div>
          <CardTitle className="pb-4">اضافة سند قبض</CardTitle>
          <Table>
            <TableHeader>
              <TableRow className="border [&>*]:border bg-gray-100">
                <TableHead className="text-right">اختر الخدمة</TableHead>
                <TableHead className="text-right">حساب المدين</TableHead>
                <TableHead className="text-right">حساب الدائن</TableHead>
                <TableHead className="text-right">مبلغ المدين</TableHead>
                <TableHead className="text-right">مبلغ الدائن</TableHead>
                <TableHead className="text-right">ملاحظات</TableHead>
                <TableHead className="text-right">الاجمالي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="border [&>*]:border">
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
                  <TableCell>
                    <Select>
                      <SelectTrigger className="rounded-none border-none shadow-none px-0">
                        <SelectValue placeholder="حساب المدين" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem  value={"p"}>wenfm</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select>
                      <SelectTrigger className="rounded-none border-none shadow-none px-0">
                        <SelectValue placeholder="حساب الدائن" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem  value={"p"}>wenfm</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input className="rounded-none border-none shadow-none px-0" placeholder="0"/>
                  </TableCell>
                  <TableCell>
                    <Input className="rounded-none border-none shadow-none px-0" placeholder="0"/>
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    <Input className="rounded-none border-none shadow-none px-0 font-normal" placeholder="ملاحظات"/>
                  </TableCell>
                </TableRow>
              <TableRow className="border [&>*]:border">
                <TableCell colSpan={7} className="text-right font-bold p-0">
                  <Button variant="green" className="rounded-none">+ إضافة</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  )
}
