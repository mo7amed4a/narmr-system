import Loading from "@/components/api/loading";
import ModalAddNote from "@/components/modals/ModalAddNote";
import CardPdfNote from "@/components/reservations/CardPdfNote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import NotFoundPage from "@/pages/NotFoundPage";
import { useState } from "react";
import { useParams } from "react-router-dom";

export interface Note {
  note_id: number
  description: string
  note_text: string
  file_name: string
  attached_file: string
  created_at: string
}

export default function ShowReservationsDetailsPage() {
  const {id} = useParams()
  const [refresh, setRefresh] = useState(false);
  const { data, loading } = useFetch(`/reservation/details?reservation_code=${id}`, refresh);
  const { data:customer, loading:customerLoading } = useFetch(`/customer/details?reservation_code=${id}`, refresh);
  const { data:notesRes, loading:notesLoading } = useFetch(`/reservation/notes?reservation_code=${id}`, refresh);
  const myData = data?.data
  const customerData = customer?.data
  const notes = notesRes?.data

  const [isModalOpen, setIsModalOpen] = useState(false);

  return myData ? (
    <>
      {<div className="w-full p-4 grid lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {loading ? <Loading /> : myData && <Card className="w-full shadow-none border-none">
            <CardHeader className="flex justify-between flex-row items-center">
              <CardTitle>معلومات الحجز</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-right">
              <div className="border-s-2 ps-3">
                <p className="text-gray-500">حالة الحجز</p>
                <p className="font-semibold">
                  <div className="lowercase line-clamp-1">
                    <span className="bg-blue-100 rounded-full p-2 text-blue-600">قيد الانتظار</span>
                  </div>
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="border-s-2 ps-3 ">
                  <p className="text-gray-500">كود الحجز</p>
                  <p className="font-semibold">{myData.reservation_code}</p>
                </div>
                <div className="border-s-2 ps-3 ">
                  <p className="text-gray-500">الفرع</p>
                  <p className="font-semibold">{myData.branch_name}</p>
                </div >
                <div className="border-s-2 ps-3 ">
                  <p className="text-gray-500">الطبيب</p>
                  <p className="font-semibold">{myData.doctor_name}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="border-s-2 ps-3">
                  <p className="text-gray-500">نوع الحجز</p>
                  <p className="font-semibold">{myData.reservation_type}</p>
                </div>
                <div className="border-s-2 ps-3">
                  <p className="text-gray-500">نوع الخدمة</p>
                  <p className="font-semibold">{myData.service_type}</p>
                </div>
                <div className="w-full"></div>
              </div>
              <div>
                <div className="col-span-2 border-s-2 ps-3">
                  <p className="text-gray-500">موعد الحجز</p>
                  <p className="font-semibold">{myData.reservation_date}</p>
                </div>
              </div>
            </CardContent>
          </Card>}
          {customerLoading ? <Loading /> : customerData && <Card className="w-full shadow-none border-none">
            <CardHeader className="flex justify-between flex-row items-center">
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-right">
              <div className="border-s-2 ps-3">
                <p className="text-gray-500">الأسم بالكامل</p>
                <p className="font-semibold">
                  <div className="lowercase line-clamp-1">
                    {/* <Link to={`${user.user_category === "admin" ? `/admin/booking/clients/${myData.user_id}` : `/booking/clients/${myData.user_id}`}`} className="bg-blue-100 rounded-full p-2 text-blue-600">{myData.customer_name}</Link> */}
                    <span className="bg-blue-100 rounded-full p-2 text-blue-600">{customerData.full_name}</span>
                  </div>
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-between">
                <div className="border-s-2 ps-3 ">
                  <p className="text-gray-500">رقم الجوال</p>
                  <p className="font-semibold">{customerData.phone_number}</p>
                </div>
                <div className="border-s-2 ps-3 ">
                  <p className="text-gray-500">تاريخ الميلاد</p>
                  <p className="font-semibold"><span className="text-gray-500">{customerData.birth_date}</span></p>
                </div >
                <div className="border-s-2 ps-3 ">
                  <p className="text-gray-500">النوع</p>
                  <p className="font-semibold">{customerData.gender}</p>
                </div>
              </div>
            </CardContent>
          </Card>}
        </div>
        <Card className="shadow-none border-none">
        <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>ملاحظات الكشف</CardTitle>
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-700 md:px-7 hover:bg-green-800">ملاحظة جديدة</Button>
          </CardHeader>
          <CardContent className="space-y-4">
          {notesLoading ? <Loading /> : notes.length > 0 ? (
              notes.map((note: Note, index: number) => (
                <CardPdfNote key={index} note={note} setRefresh={setRefresh} />
              ))
            ) : (
              <div className="flex justify-center items-center lg:h-96">
                <p className="text-gray-500 font-bold">لا توجد ملاحظات</p>
              </div>
            )}
          </CardContent>
        </Card>
        {myData && <ModalAddNote reservationCode={myData.reservation_code} setRefresh={setRefresh} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </div>}
    </>
  ) : <NotFoundPage title="عذرًا، لا يمكننا العثور على  هذا الحجز" description="" btn={false} />
  
}
