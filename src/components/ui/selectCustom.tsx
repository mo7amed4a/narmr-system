import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";
import { forwardRef, ChangeEvent } from "react";
import { cn } from "@/lib/utils"; // Assuming this is available; if not, use the manual merge method

const SelectCustom = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    className?: string;
    required?: boolean;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void; // Added proper typing for onChange
  } & React.ComponentProps<typeof Select> // Merge with Select props
>(({ children, label, className, onChange, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <Select
        {...props}
        onValueChange={(value) => {
          if (onChange) {
            // Simulate a ChangeEvent for compatibility with onChange
            const syntheticEvent = {
              target: { value },
            } as ChangeEvent<HTMLSelectElement>;
            onChange(syntheticEvent);
          }
        }}
      >
        <SelectTrigger
          ref={ref}
          className={cn(
            "w-full bg-white border-gray-200 text-right pt-2 text-xs text-gray-600",
            className // Merge custom className (e.g., "h-12")
          )}
          {...props} // Pass other props like required, disabled, etc.
        >
          <SelectValue className="!text-gray-400" placeholder={label || ""} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
      <span className="absolute start-2 -top-2 px-2 bg-white text-gray-500 text-xs">
        {props.required ? (
          label && (
            <span>
              {label}
              <span className="text-red-500"> *</span>
            </span>
          )
        ) : (
          label
        )}
      </span>
    </div>
  );
});

SelectCustom.displayName = "SelectCustom";

export default SelectCustom;