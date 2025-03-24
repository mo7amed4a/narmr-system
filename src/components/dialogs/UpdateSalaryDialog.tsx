import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { DollarSign } from "lucide-react";

interface UpdateSalaryDialogProps {
  employeeId: number;
  currentSalary: number;
  onSalaryUpdated?: () => void; // Callback to refresh data after update
}

export default function UpdateSalaryDialog({
  employeeId,
  currentSalary,
  onSalaryUpdated,
}: UpdateSalaryDialogProps) {
  const [open, setOpen] = useState(false);
  const [salary, setSalary] = useState<number | string>(currentSalary);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salary || Number(salary) < 0) {
      toast.error("يرجى إدخال راتب صحيح");
      return;
    }

    const payload = {
      employee_id: employeeId,
      salary: Number(salary),
    };

    try {
      const response = await api.post("/employee/update_salary", payload);

      if (response.status === 200) {
        toast.success("تم تحديث الراتب بنجاح");
        setOpen(false);
        if (onSalaryUpdated) onSalaryUpdated(); // Trigger refresh
      } else {
        toast.error("فشل في تحديث الراتب");
      }
    } catch (err) {
      console.error("Error updating salary:", err);
      toast.error("حدث خطأ أثناء تحديث الراتب");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
            <span>
                <DollarSign />
            </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-right">
        <DialogHeader>
          <DialogTitle>تعديل راتب الموظف</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="salary">الراتب الجديد</Label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="ادخل الراتب الجديد"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit" variant="green">
              حفظ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}