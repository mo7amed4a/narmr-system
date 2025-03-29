import { CardTitle, CardContent, CardHeader, Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/use-fetch";
import Loading from "../api/loading";

export default function SuppliersTable() {
  const { data, loading } = useFetch("/suppliers/summary");
  const suppliers = data?.data as any
  return (
    <Card className="lg:col-span-2 h-96 border lg:h-full overflow-y-auto custom-scrollbar">
      <CardHeader>
        <CardTitle className="text-sm font-bold">الموردين</CardTitle>
      </CardHeader>
      <CardContent>
       {loading ? <Loading /> : <Table className="mt-6 !h-40 !overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="!text-gray-800 !font-bold">
                اسم المورد
              </TableHead>
              <TableHead className="!text-gray-800 !font-bold">
                رقم الجوال
              </TableHead>
              <TableHead className="!text-gray-800 !font-bold">
                اجمالي المبيعات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((item:any, index:number) => (
              <TableRow key={index} className="[&>*]:border-t">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.total_transactions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>}
      </CardContent>
    </Card>
  );
}
