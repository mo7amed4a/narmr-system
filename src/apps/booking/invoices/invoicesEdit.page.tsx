import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomerSelect from "@/components/selects/CustomerSelect";
import DoctorSelect from "@/components/selects/DoctorSelect";
import ServiceSelect from "@/components/selects/ServiceSelect";
import { Trash2 } from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@/hooks/auth.context";
import { useParams } from "react-router-dom";

interface ServiceItem {
  service_id: string;
  price: number; // للعرض فقط، مش هيترسل في الـ payload
}

export default function InvoicesEditPage() {
  const { id } = useParams(); // جلب الـ invoice_id من الـ URL
  const { user } = useUser();
  const { data: invoiceData, loading: invoiceLoading, error: invoiceError } = useFetch(`/invoice?invoice_id=${id}`);
  const { data: servicesData } = useFetch("/services"); // لجلب أسعار الخدمات للعرض

  const [formData, setFormData] = useState({
    customer_id: "",
    doctor_id: "",
    services: [] as ServiceItem[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = servicesData?.data || [];

  // تعبئة البيانات من الـ API لما تيجي
  useEffect(() => {
    if (invoiceData?.data) {
      const invoice = invoiceData.data; // افتراض أن الـ API بيرجع مصفوفة والفاتورة الأولى هي المطلوبة
      setFormData({
        customer_id: invoice.customer_id ? invoice.customer_id.toString() : "",
        doctor_id: invoice.doctor_id ? invoice.doctor_id.toString() : "",
        services: invoice.services.map((service: any) => ({
          service_id: service.service_id.toString(),
          price: service.price,
        })),
      });
    }
  }, [invoiceData]);

  const handleAddService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { service_id: "", price: 0 }],
    });
  };

  const handleServiceChange = (index: number, service_id: string) => {
    const selectedService = servicesList.find(
      (service: any) => service.id === parseInt(service_id)
    );
    const updatedServices = formData.services.map((item, i) =>
      i === index ? { service_id, price: selectedService?.price || 0 } : item
    );
    setFormData({ ...formData, services: updatedServices });
  };

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const totalAmount = formData.services.reduce(
    (sum, service) => sum + service.price,
    0
  );

  const handleSubmit = async () => {
    if (
      formData.customer_id ||
      formData.doctor_id ||
      formData.services.length > 0
    ) 
    setIsSubmitting(true);
    try {
      const payload = {
        invoice_id: parseInt(id || "0"),
        customer_id: parseInt(formData.customer_id),
        doctor_id: parseInt(formData.doctor_id),
        service_ids: formData.services.map((service) =>
          parseInt(service.service_id)
        ),
        user_id: user.user_id,
      };

      await api.post("/invoice/update", payload);
      toast.success("تم تعديل الفاتورة بنجاح");
    } catch (error) {
      console.error("Error updating invoice:", error);
      toast.error("حدث خطأ أثناء تعديل الفاتورة");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (invoiceLoading) return <div>جاري التحميل...</div>;
  if (invoiceError) return <div>خطأ: {invoiceError.message}</div>;

  return (
    <div className="space-y-4">
      <Card className="replaceAll">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>تعديل فاتورة - {invoiceData?.data?.invoice_code || "جاري التحميل"}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 py-0">
          <div className="grid md:grid-cols-2 gap-4 md:w-3/4">
            <CustomerSelect
              value={formData.customer_id}
              onValueChange={(value) =>
                setFormData({ ...formData, customer_id: value })
              }
            />
            <DoctorSelect
              value={formData.doctor_id}
              onValueChange={(value) =>
                setFormData({ ...formData, doctor_id: typeof value === "string" && value || ""})
              }
            />
          </div>
        </CardContent>
      </Card>
      <Card className="replaceAll">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>الخدمات</CardTitle>
        </CardHeader>
        <CardContent className="p-3 py-0 space-y-4">
          {formData.services.map((service, index) => (
            <div key={index} className="grid grid-cols-2 gap-4">
              <ServiceSelect
                value={service.service_id}
                onValueChange={(value) => handleServiceChange(index, value)}
              />
              <div className="space-y-2 w-full h-8">
                <label className="text-sm font-medium">سعر الخدمة</label>
                <div className="flex items-center gap-2">
                  <span className="border px-2 py-[0.33rem] rounded-md w-24">
                    {service.price} دينار عراقي
                  </span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="px-2"
                    onClick={() => handleRemoveService(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col py-5">
          <div className="flex justify-end py-4 ms-auto">
            <span className="">الإجمالي: {totalAmount} دينار عراقي</span>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <Button
                variant="green"
                className="bg-green-100 text-green-600 hover:text-white"
                onClick={handleAddService}
              >
                إضافة خدمة
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-red-800">
                استرجاع
              </Button>
              <Button
                variant="green"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري التأكيد..." : "تأكيد التعديل"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}