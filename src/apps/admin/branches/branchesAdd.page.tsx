import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import InputLabel from "@/components/form/InputLabel";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "@/lib/axios";
import { useUser } from "@/hooks/auth.context";

export default function BranchesAddPage() {
  const navigate = useNavigate();
  const {user} = useUser()  

  // Validation schema using Yup
  const validationSchema = Yup.object({
    clinicName: Yup.string()
      .required("اسم العيادة مطلوب")
      .min(2, "اسم العيادة يجب أن يكون حرفين على الأقل"),
    staffNumber: Yup.number()
      .required("عدد الموظفين مطلوب")
      .positive("يجب أن يكون الرقم موجب")
      .integer("يجب أن يكون الرقم صحيحاً")
      .min(1, "يجب أن يكون هناك موظف واحد على الأقل"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      clinicName: "",
      staffNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await api.post("/add_branch", {
          user_id: user.user_id,
          name: values.clinicName,
          employee_count: values.staffNumber,
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
            <CardTitle>اضافة عيادة جديدة</CardTitle>
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
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div>
              <InputLabel
                label="اسم العيادة"
                required
                placeholder="ادخل اسم العيادة"
                name="clinicName"
                value={formik.values.clinicName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.clinicName && formik.errors.clinicName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.clinicName}
                </p>
              )}
            </div>
            <div>
              <InputLabel
                label="عدد الموظفين"
                type="number"
                required
                placeholder="ادخل عدد الموظفين"
                name="staffNumber"
                value={formik.values.staffNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.staffNumber && formik.errors.staffNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.staffNumber}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </Card>
  );
}
