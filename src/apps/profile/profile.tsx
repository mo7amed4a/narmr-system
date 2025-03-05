import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Mail, Phone, User, UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <Card>
        <CardHeader className="flex justify-between flex-row">
            <CardTitle>
                الصفحة الشخصية
            </CardTitle>
            <Button variant={"outline"}>تعديل</Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-2">
            <Avatar className="size-40">
                <AvatarImage src="/placeholder.svg" alt="" />
                <AvatarFallback className="text-3xl bg-[#BDBDBD] text-gray-100">Mo</AvatarFallback>
            </Avatar>
            <h1 className="text-lg text-gray-700">Mohamed</h1>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 divide-y [&>*]:pt-3 [&>*]:flex-col [&>*]:gap-3 [&>*]:md:!flex-row">
            <div className="flex justify-between w-full text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <User className="text-gray-400 size-5"/>
                    <span>الاسم</span>
                </div>
                <div>
                    Mohamed
                </div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <UserCircle className="text-gray-400 size-5"/>
                    <span>الدور</span>
                </div>
                <div>
                    مسؤول عام
                </div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <Phone className="text-gray-400 size-5"/>
                    <span>رقم الهاتف</span>
                </div>
                <div>
                    415-157-155
                </div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <Mail className="text-gray-400 size-5"/>
                    <span>البريد الالكتروني</span>
                </div>
                <div>
                    cristinagroves@example.com
                </div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <CalendarDays className="text-gray-400 size-5"/>
                    <span>تاريخ الميلاد</span>
                </div>
                <div>
                03 March 1996
                </div>
            </div>
        </CardFooter>
    </Card>
  )
}
