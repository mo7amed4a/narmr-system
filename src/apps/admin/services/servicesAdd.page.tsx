import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/lib/axios";
import { useUser } from "@/hooks/auth.context";

export default function ServicesAddPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    serviceName: Yup.string()
      .required("اسم الخدمة مطلوب")
      .min(2, "اسم الخدمة يجب أن يكون حرفين على الأقل"),
    price: Yup.number()
      .required("السعر مطلوب")
      .positive("يجب أن يكون السعر موجباً")
      .min(0, "السعر لا يمكن أن يكون أقل من صفر"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      serviceName: "",
      price: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await api.post("/add_service", {
          user_id: user.user_id,
          name: values.serviceName,
          price: values.price,
        });
        console.log("Branch added successfully:", response.data);
        resetForm();
        navigate(-1);
      } catch (error) {
        console.error("Error adding branch:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card className="w-full p-4 flex flex-col gap-4 shadow-none border-none">
      <form onSubmit={formik.handleSubmit}>
        <Card className="w-full shadow-none">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>اضافة خدمة</CardTitle>
            <div className="flex gap-3">
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="text-red-500"
                type="button"
              >
                الغاء
              </Button>
              <Button
                variant="green"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "جاري الحفظ..." : "حفظ"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-4">
            <div>
              <InputLabel
                label="اسم الخدمة"
                required
                placeholder="ادخل اسم الخدمة"
                name="serviceName"
                value={formik.values.serviceName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.serviceName && formik.errors.serviceName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.serviceName}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                label="السعر"
                required
                placeholder="سعر الخدمة"
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.price}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}
