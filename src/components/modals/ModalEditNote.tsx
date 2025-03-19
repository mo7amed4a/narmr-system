import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { Note } from "@/apps/booking/reservations/ShowReservationsDetails.page";

export default function ModalEditNote({ 
  isOpen, 
  onClose, 
  setRefresh,
  note 
}: {
  isOpen: boolean;
  onClose: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  note: Note;
}) {
  const [description, setDescription] = useState("");
  const [noteText, setNoteText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with existing note data when component mounts or note changes
  useEffect(() => {
    if (note && isOpen) {
      setDescription(note.description || "");
      setNoteText(note.note_text || "");
      // If there's an existing file, you might want to handle it differently
      // For now, we'll reset file-related states
      setFile(null);
      setImageUrl(null);
    }
  }, [note, isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async () => {
    if (!noteText) {
      toast.error("نص الملاحظة مطلوب");
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
        note_id: note.note_id,
        description: description || "No description provided",
        note_text: noteText,
        ...(file && {
          attached_file: base64File,
          file_name: file.name
        })
      };

      await api.post("/reservation/note/update", payload);
      toast.success("تم تحديث الملاحظة بنجاح");
      
      // Trigger refresh of parent component
      setRefresh((prev) => !prev);
      
      // Reset form
      setDescription("");
      setNoteText("");
      setFile(null);
      setImageUrl(null);
      onClose();
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("حدث خطأ أثناء تحديث الملاحظة");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <DialogTitle>تعديل الملاحظة</DialogTitle>
          <DialogDescription>
            قم بتعديل تفاصيل الملاحظة الحالية
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">كود الملاحظة</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              value={note.note_id}
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
            <label className="block mb-1">رفع ملف جديد (اختياري)</label>
            <input
              type="file"
              className="w-full p-2 border rounded-md"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            {note.attached_file && !file && (
              <p className="text-sm text-gray-500 mt-1">
                الملف الحالي: {note.file_name}
              </p>
            )}
          </div>

          {imageUrl && (
            <div className="mt-4">
              <p className="font-semibold">الملف الجديد المحدد:</p>
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
              {isSubmitting ? "جاري التحديث..." : "تحديث"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}