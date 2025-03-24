import Loading from "@/components/api/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/use-fetch";
import Cookies from "js-cookie";
import { CalendarDays, Mail, Phone, User, UserCircle } from "lucide-react";

export default function ProfilePage() {
  const t = JSON.parse(Cookies.get("user") || "{}");
  const { data, loading } = useFetch(`/user_info/${t.user_id}`, true);
  const profile = data?.data
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <CardTitle>الصفحة الشخصية</CardTitle>
        <Button variant={"outline"}>تعديل</Button>
      </CardHeader>
     {loading ? <Loading /> : <>
        <CardContent className="flex flex-col items-center space-y-2">
        <Avatar className="size-40">
          <AvatarImage src={profile?.photo} alt="" />
          <AvatarFallback className="text-3xl bg-[#BDBDBD] text-gray-100 capitalize">
            {profile?.name?.slice(0,2)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-lg text-gray-700">{profile?.name}</h1>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 divide-y [&>*]:pt-3 [&>*]:flex-col [&>*]:gap-3 [&>*]:md:!flex-row">
            <div className="flex justify-between w-full text-gray-700 text-sm">
            <div className="flex items-center gap-2">
                <User className="text-gray-400 size-5" />
                <span>الاسم</span>
            </div>
            <div>{profile?.name}</div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
            <div className="flex items-center gap-2">
                <UserCircle className="text-gray-400 size-5" />
                <span>الدور</span>
            </div>
            <div>{profile?.user_category}</div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
            <div className="flex items-center gap-2">
                <Phone className="text-gray-400 size-5" />
                <span>رقم الهاتف</span>
            </div>
            <div>{profile?.phone}</div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
            <div className="flex items-center gap-2">
                <Mail className="text-gray-400 size-5" />
                <span>البريد الالكتروني</span>
            </div>
            <div>{profile?.email}</div>
            </div>
            <div className="flex justify-between w-full text-gray-700 text-sm">
            <div className="flex items-center gap-2">
                <CalendarDays className="text-gray-400 size-5" />
                <span>تاريخ الميلاد</span>
            </div>
            <div>{profile?.birthday}</div>
            </div>
        </CardFooter>
     </>}
    </Card>
  );
}
