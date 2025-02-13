import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";

export default function SelectCustom({
    children,
    label,
    ...props
}:{
    children: React.ReactNode,
    label: string
}) {
  return (
    <div className="relative w-full">
        <Select {...props}>
          <SelectTrigger className="w-full bg-white border-gray-200 h- text-right pt-2">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent>
            {children}
          </SelectContent>
        </Select>
        <span className="absolute start-2 -top-2 px-2 bg-white text-gray-500 text-xs">{label}</span>
      </div>
  )
}
