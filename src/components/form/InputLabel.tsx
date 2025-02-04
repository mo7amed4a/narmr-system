import { useId } from "react";

export default function InputLabel({ label, onChange, type = "text", className = "", error, ...props }:{
    label: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    className?: string,
    error?: any,
    [key: string]: any
}) {
    const generatedId = useId();
    const inputId = generatedId;
    return (
        
      <div className={`relative ${className}`}>
        <input 
          type={type} 
          id={inputId} 
          onChange={onChange} 
          dir="rtl"
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm 
          text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none
           dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" 
          placeholder=" "
          defaultValue={{...props}.value}
          value={props.value}
          {...props} 
        />
        <label 
          htmlFor={inputId} 
          className={`absolute text-sm text-gray-800 font-bold dark:text-gray-400 duration-300 transform ${props.placeholder ? "-translate-y-4 scale-75 top-2 -start-2" : "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"} z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-0 peer-focus:-start-2  start-1`}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
      </div>
    )
  }