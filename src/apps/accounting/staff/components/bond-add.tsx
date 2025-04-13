import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  SelectItem,
} from "@/components/ui/select";
import InputLabel from "@/components/form/InputLabel";
import SelectCustom from "@/components/ui/selectCustom";
interface VoucherFormDialogProps {
  open: boolean;
}

export default function BondAddInStaff({ open }: VoucherFormDialogProps) {
  const [voucherType, setVoucherType] = useState("receipt");
  return (
    open && (
      <div>
        <div className="p-6 space-y-6">
          <div className="!flex flex-wrap md:flex-nowrap flex-row items-center gap-3">
            <span className="text-sm md:text-lg font-medium">نوع السند</span>
            <RadioGroup
              defaultValue="receipt"
              className="flex gap-6"
              value={voucherType}
              onValueChange={setVoucherType}
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="receipt" id="receipt" />
                <Label htmlFor="receipt" className="mr-2">
                  سند قبض
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="payment" id="payment" />
                <Label htmlFor="payment" className="mr-2">
                  سند صرف
                </Label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value="deferred" id="deferred" />
                <Label htmlFor="deferred" className="mr-2">
                  سند آجل
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectCustom label="من (المرسل)">
              <SelectItem value="sender1">المرسل 1</SelectItem>
              <SelectItem value="sender2">المرسل 2</SelectItem>
              <SelectItem value="sender3">المرسل 3</SelectItem>
            </SelectCustom>
            <InputLabel
            classNameInput="h-9"
              label="المبلغ بالدينار العراقي"
              required
              value="150"
              placeholder="ادخل المبلغ بالدينار العراقي"
            />
          </div>
        </div>
      </div>
    )
  );
}
