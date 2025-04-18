import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function ModalAddNote({ 
  isOpen, 
  onClose, 
  setRefresh,
  reservationCode 
}: {
  isOpen: boolean;
  onClose: () => void;
  setRefresh:React.Dispatch<React.SetStateAction<boolean>>
  reservationCode: string;
}) {
  const [description, setDescription] = useState("");
  const [noteText, setNoteText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!noteText || !reservationCode) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert file to base64 if it exists
      let base64File = "";
      if (file) {
        base64File = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        // Remove the data URL prefix
        base64File = base64File.split(',')[1];
      }

      const payload = {
        reservation_code: reservationCode,
        description: description || "No description provided",
        note_text: noteText,
        ...(file && {
          attached_file: base64File,
          file_name: file.name
        })
      };

      await api.post("/reservation/note/add", payload);
      toast.success("تم إضافة الملاحظة بنجاح");
      // Reset form
      setRefresh((prev) => !prev);
      setDescription("");
      setNoteText("");
      setFile(null);
      setImageUrl(null);
      onClose();
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("حدث خطأ أثناء إضافة الملاحظة");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when dialog is closed
  const handleClose = () => {
    setDescription("");
    setNoteText("");
    setFile(null);
    setImageUrl(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
          <DialogDescription>
            من فضلك املأ التفاصيل المطلوبة للملاحظة الجديدة
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">كود الحجز</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={reservationCode}
              disabled
            />
          </div>
          <div>
            <label className="block mb-1">الوصف (اختياري)</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="أدخل وصف الملاحظة..."
            />
          </div>
          <div>
            <label className="block mb-1">نص الملاحظة *</label>
            <textarea
              className="w-full p-2 border rounded-md"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="أدخل نص الملاحظة..."
              required
            />
          </div>
          <div>
            <label className="block mb-1">رفع الملف (اختياري)</label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>

          {imageUrl && (
            <div className="mt-4">
              <p className="font-semibold">الملف المحدد:</p>
              {file?.type.startsWith('image/') ? (
                <img 
                  src={imageUrl} 
                  alt="Selected file" 
                  className="w-32 h-32 object-cover mt-2" 
                />
              ) : (
                <p className="mt-2">{file?.name}</p>
              )}
            </div>
          )}

          <div className="flex justify-between gap-4 mt-4">
            <Button 
              onClick={handleClose} 
              className="bg-gray-500" 
              disabled={isSubmitting}
            >
              إغلاق
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الإضافة..." : "إضافة"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}