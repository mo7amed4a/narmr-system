import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import LogoAndInfo from "@/components/global/LogoAndInfo"

export default function InvoiceDetailsPage() {
  return (
    <div className="space-y-5">
      <Card className="w-full border-none shadow-none">
        <CardHeader className="space-y-6 border-b">
          <div className="flex justify-between items-center md:p-8 bg-[#F9FAFC] rounded-xl">
            <div className="text-sm text-right space-y-1">
              <h2 className="text-xl font-bold">مها عبدالرحمن</h2>
              <p>يناير ٢، ٢٠٢٤ الساعة ١:٣٥ م</p>
              <p dir="ltr">+960025425256</p>
              <p>address City, Country - 00000</p>
            </div>
            <LogoAndInfo />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">كود الفاتورة</TableHead>
                <TableHead className="text-right">العميل</TableHead>
                <TableHead className="text-right">الطبيب</TableHead>
                <TableHead className="text-right">أنشئت بواسطة</TableHead>
                <TableHead className="text-right">تاريخ الاضافة</TableHead>
                <TableHead className="text-right">قيمة الفاتورة</TableHead>
                <TableHead className="text-right">حالة الفاتورة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>S0000030</TableCell>
                <TableCell>مها عبد الرحمن</TableCell>
                <TableCell>د/ عبد الرحمن وجيه</TableCell>
                <TableCell>Administrator</TableCell>
                <TableCell dir="ltr">20 Dec, 2021, 9:21 AM</TableCell>
                <TableCell>$240</TableCell>
                <TableCell>
                  <Badge variant="green">مؤكدة</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-full border-none shadow-none">
        <CardHeader className="space-y-6 border-b">
         <CardTitle>الخدمات</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">نوع الخدمة</TableHead>
                <TableHead className="text-right">التكلفة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>فحص بشرة</TableCell>
                <TableCell>750$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>فحص بشرة</TableCell>
                <TableCell>750$</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end py-4">
            <span className="">الاجمالي 1500</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

