import { useId } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // استيراد مكونات shadcn

export default function SelectLabel({ label, onChange, options = [], className = "", error, value, ...props }:{
    label: string,
    onChange?: (value: string) => void,
    options: string[],
    className?: string,
    error?: any,
    value: string,
    [key: string]: any
}) {
    const generatedId = useId();
    const selectId = generatedId;
    
    return (
      <div className={`relative ${className}`}>
        <Select onValueChange={onChange} value={value} {...props}>
          <SelectTrigger 
            id={selectId} 
            className="block w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
          >
            <SelectValue placeholder=" " />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <label 
          htmlFor={selectId} 
          className={`absolute text-sm text-gray-800 font-bold dark:text-gray-400 duration-300 transform ${props.placeholder ? "-translate-y-4 scale-75 top-2 -start-2" : "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"} z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-0 peer-focus:-start-2  start-1`}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>

        {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
      </div>
    )
}
