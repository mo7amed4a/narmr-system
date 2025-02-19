import { useId, useRef, useState } from "react";

export default function InputLabel({ label, onChange, type = "text", className = "",classNameInput = "", error, ...props }:{
    label: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    className?: string,
    classNameInput?: string,
    error?: any,
    [key: string]: any
}) {
    const generatedId = useId();
    const inputId = generatedId.split(":").join(Math.floor(Math.random() * 10000).toString());
    const ref = useRef<HTMLInputElement>(null);
    const [closeInput, setCloseInput] = useState(false);
    const handleBlur = () => {
      if (ref.current) {
        ref.current.value ? setCloseInput(true) : setCloseInput(false);
      }
    };
    return (
        
      <div className={`relative ${className}`}>
        <input 
          type={type} 
          id={inputId} 
          onChange={onChange} 
          dir="rtl"
          className={`block px-2.5 pb-2.5 pt-4 w-full text-sm 
          text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none
           dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer ${classNameInput}`}
          placeholder=" "
          defaultValue={{...props}.value}
          value={props.value}
          ref={ref}
          onBlur={handleBlur}
          {...props}
        />
        <label 
          htmlFor={inputId} 
          className={`absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform ${props.placeholder || props.defaultValue || closeInput ? "-translate-y-4 scale-75 top-2 -start-4" : "peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"} z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-0 peer-focus:-start-4 start-1`}
        >
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        {error && <p className="text-xs text-red-500 pt-1">{error}</p>}
      </div>
    )
  }