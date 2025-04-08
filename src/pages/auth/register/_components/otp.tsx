import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/axios";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Define props interface
interface OtpFormProps {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  page?: boolean;
}

// Define form values interface
interface FormValues {
  phone: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\+964[0-9]{9}$/, "رقم الموبايل يجب أن يبدأ بـ +964 ويكون 12 رقم")
    .required("رقم الموبايل مطلوب"),
});

export default function OtpForm({ setSteps, page = false }: OtpFormProps) {
  const initialValues: FormValues = {
    phone: "",
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const response = await api.post("/send_otp", {
              phone: values.phone.split("+").join(""),
            });
            
            if (response.status === 200) {
              toast.success("تم ارسال رمز التحقق");
              localStorage.setItem("otp_phone", values.phone);
              setSteps(2);
            } else {
              console.error(response);
              toast.error("فشل في إرسال رمز التحقق");
            }
          } catch (error) {
            console.error(error);
            toast.error("حدث خطأ أثناء إرسال رمز التحقق");
          } finally {
            setSubmitting(false);
          }
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ isSubmitting, errors, touched, setFieldValue }) => (
          <Form className={`space-y-4 ${page && "flex w-full justify-between items-end gap-4"}`}>
            <div className={`space-y-2 ${page && "w-full"}`}>
              <Label htmlFor="phone" className="text-right block">
                رقم الموبايل :
              </Label>
              <Field
                as={Input}
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                className="text-right"
                placeholder="+964xxxxxxxxxx"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value.replace(/[^0-9+]/g, "");
                  // Ensure the number starts with +966
                  if (!value.startsWith("+964")) {
                    setFieldValue("phone", "+964" + value.replace(/^\+964/, ""));
                  } else {
                    setFieldValue("phone", value);
                  }
                }}
                maxLength={13} // +966 and 9 digits
              />
              {touched.phone && errors.phone && (
                <div className="text-red-500 text-sm text-right">{errors.phone}</div>
              )}
            </div>

            <Button
              type="submit"
              className={`bg-[#8B2635] hover:bg-[#7A2230] ${page ? "h-9" : "w-full"}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإرسال..." : "رمز التحقق"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}