import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ModalAddNote({ isOpen, onClose, onSubmit }:{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState<any>(null); // لتخزين رابط الصورة المؤقت

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      // توليد رابط الصورة المؤقت
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (name && description && file) {
      onSubmit({ name, description, file});
      onClose();
    }
  };

  return isOpen ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
          <DialogDescription>
            من فضلك املأ التفاصيل المطلوبة للملاحظة الجديدة
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label>الاسم</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>الوصف</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>رفع الملف</label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={handleFileChange}
            />
          </div>

          {/* عرض الصورة إذا تم اختيارها */}
          {imageUrl && (
            <div className="mt-4">
              <p className="font-semibold">الصورة المحددة:</p>
              <img src={imageUrl} alt="Selected file" className="w-32 h-32 object-cover mt-2" />
            </div>
          )}

          <div className="flex justify-between gap-4 mt-4">
            <Button onClick={onClose} className="bg-gray-500">إغلاق</Button>
            <Button onClick={handleSubmit} className="bg-green-700">إضافة</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ) : null;
}
