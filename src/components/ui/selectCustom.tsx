import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { forwardRef } from "react";

const SelectCustom = forwardRef<
  HTMLButtonElement, // نوع العنصر الذي سيتم تمرير `ref` إليه (زر التحديد)
  { label: string } & React.ComponentProps<typeof Select> // دمج `label` مع جميع `props` المتاحة لـ Select
>(({ children, label, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <Select {...props}>
        <SelectTrigger
          ref={ref}
          className="w-full bg-white border-gray-200 text-right pt-2 text-xs text-gray-600"
          {...props} // تمرير جميع `props` بما في ذلك `onChange` و `disabled` وغيره
        >
          <SelectValue className="!text-gray-400" placeholder={label || ""} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      <span className="absolute start-2 -top-2 px-2 bg-white text-gray-500 text-xs">
        {props.required ? label &&  <span>
          {label}
          <span className="text-red-500">   *</span>
        </span>: label}
      </span>
    </div>
  );
});

SelectCustom.displayName = "SelectCustom"; // مهم عند استخدام forwardRef

export default SelectCustom;
