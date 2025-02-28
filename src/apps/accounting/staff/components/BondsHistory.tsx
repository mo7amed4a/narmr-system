import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  
export default function BondsHistory() {
  return (
    <Card className="border mt-5">
        <CardHeader>
            <CardTitle>تاريخ السندات</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
                    <TableHead>نوع السند</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead className="text-right">تاريخ السند</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>سند قبض</TableCell>
                        <TableCell>500$</TableCell>
                        <TableCell className="text-right">20 Dec, 2021, 02:21 AM</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}
