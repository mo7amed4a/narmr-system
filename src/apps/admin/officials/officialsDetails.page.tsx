import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import CardBorderStart from "@/components/global/CardBorderStart";

export default function OfficialsDetailsPage() {
  const { id } = useParams(); // Assuming the route param is 'id'
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    user_id: "",
    name: "",
    phone: "",
    user_category: "",
  });
  const [loading, setLoading] = useState(true);

  // Map user_category values to Arabic labels
  const userCategoryMap: { [key: string]: string } = {
    admin: "مسؤول عام",
    accounting_employee: "موظف حسابات",
    transformer_employee: "موظف حجوزات",
  };

  // Fetch admin data when component mounts
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get(`/user_info/${id}`); // Adjust if it should be /user_info/${id}
        const data = response.data.data;
        setAdminData({
          user_id: data.user_id.toString(),
          name: data.name || "",
          phone: data.phone || "",
          user_category: userCategoryMap[data.user_category] || data.user_category, // Fallback to raw value if not mapped
        });
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("حدث خطأ أثناء جلب بيانات المسؤول");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAdminData();
  }, [id]);

  const handleEditClick = () => {
    navigate(`/admin/edit/${id}`); // Adjust the route to match your app's structure
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <Card className="w-full" dir="rtl">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-lg md:text-xl font-bold">تفاصيل المسؤول</CardTitle>
       <Link to={"edit"}>
        <Button
            onClick={handleEditClick}
            variant={"outline"}
          >
            تعديل
          </Button>
       </Link>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CardBorderStart title="الاسم بالكامل" value={adminData.name}/>
            <CardBorderStart title="رقم الجوال" value={adminData.phone}/>
            <CardBorderStart title="فئة المستخدم" value={adminData.user_category}/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}