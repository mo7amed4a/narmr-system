import ModalAddNote from "@/components/modals/ModalAddNote";
import CardPdfNote from "@/components/reservations/CardPdfNote";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";


export default function ShowReservationsDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState<any>([]);

  const handleAddNote = (note:any) => {
    setNotes((prevNotes:any) => [...prevNotes, note]);
  };

  const handleDeleteNote = (index:any) => {
    setNotes((prevNotes:any) => prevNotes.filter((_:any, i:number) => i !== index));
  };
  return (
    <div className="w-full p-4 grid lg:grid-cols-2 gap-4">
       <div className="flex flex-col gap-4">
        <Card className="w-full shadow-none border-none">
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
                <p className="font-semibold">#APP43 </p>
              </div>
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">الفرع</p>
                <p className="font-semibold">مركز بيوتي</p>
              </div >
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">الطبيب</p>
                <p className="font-semibold">د/ عبدالرحمن وجيه</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="border-s-2 ps-3">
                <p className="text-gray-500">نوع الحجز</p>
                <p className="font-semibold">كشف جديد</p>
              </div>
              <div className="border-s-2 ps-3">
                <p className="text-gray-500">نوع الخدمة</p>
                <p className="font-semibold">فحص بشرة</p>
              </div>
              <div className="w-full"></div>
            </div>
            <div>
              <div className="col-span-2 border-s-2 ps-3">
                <p className="text-gray-500">موعد الحجز</p>
                <p className="font-semibold">10 يناير 2024 الساعه 05:30 م</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full shadow-none border-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-right">
            <div className="border-s-2 ps-3">
              <p className="text-gray-500">الأسم بالكامل</p>
              <p className="font-semibold">
                <div className="lowercase line-clamp-1">
                  <span className="bg-blue-100 rounded-full p-2 text-blue-600">ريم فهم</span>
                </div>
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">رقم الجوال</p>
                <p className="font-semibold">+960500045656</p>
              </div>
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">تاريخ الميلاد</p>
                <p className="font-semibold">28 يونيو 1996 <span className="text-gray-500">(28 عام)</span></p>
              </div >
              <div className="border-s-2 ps-3 ">
                <p className="text-gray-500">النوع</p>
                <p className="font-semibold">انثى</p>
              </div>
            </div>
          </CardContent>
        </Card>
       </div>
      <Card className="shadow-none border-none">
      <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>ملاحظات الكشف</CardTitle>
          <Button onClick={() => setIsModalOpen(true)} className="bg-green-700 md:px-7 hover:bg-green-800">ملاحظة جديدة</Button>
        </CardHeader>
        <CardContent className="space-y-4">
        {notes.length > 0 ? (
            notes.map((note: {
              name: string;
              description: string
              file: File
            }, index: number) => (
              <CardPdfNote key={index} name={note.name} description={note.description} file={note.file} onDelete={() => handleDeleteNote(index)} />
            ))
          ) : (
            <div className="flex justify-center items-center lg:h-96">
              <p className="text-gray-500 font-bold">لا توجد ملاحظات</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ModalAddNote isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNote} />
    </div>
  )
}
