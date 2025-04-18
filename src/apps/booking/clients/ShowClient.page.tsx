import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/clients/table";
import { Link, useParams } from "react-router-dom";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import useFetch from "@/hooks/use-fetch";
import Loading from "@/components/api/loading";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ShowClientPage() {
  const params = useParams()
  const {data, loading} = useFetch(`/customer/${params.id}`)
  const client = data?.data
  return (
    <Card className="w-full replaceAll flex flex-col gap-4 shadow-none border-none">
      {data&& client && <>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>بيانات العميل</CardTitle>
            <Link to="edit"><Button variant="outline">تعديل</Button></Link>
          </CardHeader>
          <CardContent className="grid gap-4 text-right">
            <div className="border-s-2 ps-3">
              <p className="text-gray-500">الاسم بالكامل</p>
              <p className="font-semibold">{client.name}</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">تاريخ الميلاد</p>
                <p className="font-semibold">{client.birth_date}</p>
              </div>
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">رقم الموبايل</p>
                <p className="font-semibold">{client.phone}</p>
              </div >
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">النوع</p>
                <p className="font-semibold">{client.gender}</p>
              </div>
              <div className="col-span-2 border-s-2 ps-3">
                <p className="text-gray-500">العنوان</p>
                <p className="font-semibold">{`${client.country}, ${client.city}`}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-none">
          <CardContent>
            {client.visit_history.length < 0 ? <div className="flex justify-center">
              <p className="text-gray-500">لا توجد زيارات</p>
            </div> : <DataTable
              title="تاريخ الزيارات السابقة"
              columns={columnsUpcomingReservations}
              data={client.visit_history}
              searchKey={["name"]}
              textKey="الاسم"
            /> }
           
          </CardContent>
        </Card>
      </>}
      {
        loading && <Loading />
      }
    </Card>
  )
}


const columnsUpcomingReservations: ColumnDef<any>[] = [
  {
    accessorKey: "visit_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-current font-bold"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          التاريخ والوقت <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <>
        <div className="capitalize text-red-900">{row.getValue("visit_date")}</div>
      </>
    ),
  },
  {
    accessorKey: "doctor_name",
    header: "الطبيب المعالج",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("doctor_name")}</div>
      </>
    ),
  },
  {
    accessorKey: "service_type",
    header: "نوع الخدمة",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("service_type")}</div>
      </>
    ),
  },
  {
    accessorKey: "booking_price",
    header: "قيمة الحجز",
    cell: ({ row }) => (
      <>
        <div className="lowercase line-clamp-1">{row.getValue("booking_price")}</div>
      </>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: "الملاحظات",
    //   cell: ({ row }) => {
    cell: ({row}) => {
      // const payment = row.original;
      return (
        <Dialog>
          <DialogTrigger>
              <Button variant="ghost" size="icon">
              <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.2198 11.75H16.7998C16.3898 11.75 16.0498 11.41 16.0498 11V4.01C16.0498 3.27 16.3398 2.58 16.8598 2.06C17.3798 1.54 18.0698 1.25 18.8098 1.25H18.8198C20.0698 1.26 21.2498 1.75 22.1498 2.64C23.0498 3.55 23.5398 4.75 23.5398 6V8.42C23.5498 10.41 22.2098 11.75 20.2198 11.75ZM17.5498 10.25H20.2198C21.3798 10.25 22.0498 9.58 22.0498 8.42V6C22.0498 5.14 21.7098 4.32 21.0998 3.7C20.4898 3.1 19.6698 2.76 18.8198 2.75C18.8198 2.75 18.8198 2.75 18.8098 2.75C18.4798 2.75 18.1598 2.88 17.9198 3.12C17.6798 3.36 17.5498 3.67 17.5498 4.01V10.25Z" fill="#767676" />
                <path d="M9.7998 23.33C9.3298 23.33 8.8898 23.15 8.5598 22.81L6.8998 21.14C6.8098 21.05 6.6698 21.04 6.5698 21.12L4.8498 22.4C4.3198 22.8 3.6198 22.87 3.0198 22.57C2.4198 22.27 2.0498 21.67 2.0498 21V6C2.0498 2.98 3.7798 1.25 6.7998 1.25H18.7998C19.2098 1.25 19.5498 1.59 19.5498 2C19.5498 2.41 19.2098 2.75 18.7998 2.75C18.1098 2.75 17.5498 3.31 17.5498 4V21C17.5498 21.67 17.1798 22.27 16.5798 22.57C15.9798 22.87 15.2798 22.81 14.7498 22.41L13.0398 21.13C12.9398 21.05 12.7998 21.07 12.7198 21.15L11.0398 22.83C10.7098 23.15 10.2698 23.33 9.7998 23.33ZM6.7098 19.57C7.1698 19.57 7.6198 19.74 7.9598 20.09L9.6198 21.76C9.6798 21.82 9.7598 21.83 9.7998 21.83C9.8398 21.83 9.91981 21.82 9.9798 21.76L11.6598 20.08C12.2798 19.46 13.2598 19.4 13.9498 19.93L15.6498 21.2C15.7598 21.28 15.8598 21.25 15.9098 21.22C15.9598 21.19 16.0498 21.13 16.0498 21V4C16.0498 3.55 16.1598 3.12 16.3498 2.75H6.7998C4.5798 2.75 3.5498 3.78 3.5498 6V21C3.5498 21.14 3.6398 21.2 3.6898 21.23C3.7498 21.26 3.8498 21.28 3.9498 21.2L5.6598 19.92C5.9698 19.69 6.3398 19.57 6.7098 19.57Z" fill="#767676" />
                <path d="M12.7998 13.7598H9.7998C9.3898 13.7598 9.0498 13.4198 9.0498 13.0098C9.0498 12.5998 9.3898 12.2598 9.7998 12.2598H12.7998C13.2098 12.2598 13.5498 12.5998 13.5498 13.0098C13.5498 13.4198 13.2098 13.7598 12.7998 13.7598Z" fill="#121212" fillOpacity="0.56" />
                <path d="M12.7998 9.75977H9.7998C9.3898 9.75977 9.0498 9.41977 9.0498 9.00977C9.0498 8.59977 9.3898 8.25977 9.7998 8.25977H12.7998C13.2098 8.25977 13.5498 8.59977 13.5498 9.00977C13.5498 9.41977 13.2098 9.75977 12.7998 9.75977Z" fill="#121212" fillOpacity="0.56" />
                <path d="M6.76953 10.0098C6.21953 10.0098 5.76953 9.55977 5.76953 9.00977C5.76953 8.45977 6.21953 8.00977 6.76953 8.00977C7.31953 8.00977 7.76953 8.45977 7.76953 9.00977C7.76953 9.55977 7.31953 10.0098 6.76953 10.0098Z" fill="#121212" fillOpacity="0.56" />
                <path d="M6.76953 14.0098C6.21953 14.0098 5.76953 13.5598 5.76953 13.0098C5.76953 12.4598 6.21953 12.0098 6.76953 12.0098C7.31953 12.0098 7.76953 12.4598 7.76953 13.0098C7.76953 13.5598 7.31953 14.0098 6.76953 14.0098Z" fill="#121212" fillOpacity="0.56" />
              </svg>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="lowercase line-clamp-1">{row.original.notes}</div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];