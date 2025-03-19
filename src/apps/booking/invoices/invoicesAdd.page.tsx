import { useState } from "react";
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

interface ServiceItem {
  service_id: string;
  price: number; // للعرض فقط، مش هيترسل في الـ payload
}

export default function InvoicesAddPage() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    customer_id: "",
    doctor_id: "",
    services: [] as ServiceItem[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: servicesData } = useFetch("/services"); // لجلب أسعار الخدمات للعرض

  const servicesList = servicesData?.data || [];

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
      !formData.customer_id ||
      !formData.doctor_id ||
      formData.services.length === 0
    ) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customer_id: parseInt(formData.customer_id),
        doctor_id: parseInt(formData.doctor_id),
        service_ids: formData.services.map((service) =>
          parseInt(service.service_id)
        ),
        user_id: user.user_id,
      };

      await api.post("/invoice/add", payload);
      toast.success("تم إضافة الفاتورة بنجاح");
      setFormData({
        customer_id: "",
        doctor_id: "",
        services: [],
      });
    } catch (error) {
      console.error("Error adding invoice:", error);
      toast.error("حدث خطأ أثناء إضافة الفاتورة");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle>فاتورة جديدة</CardTitle>
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
                setFormData({ ...formData, doctor_id: value })
              }
            />
          </div>
        </CardContent>
      </Card>
      <Card className="p-4">
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
                    {service.price} جنيه
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
            <span className="">الإجمالي: {totalAmount} جنيه</span>
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
                {isSubmitting ? "جاري التأكيد..." : "تأكيد الفاتورة"}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
