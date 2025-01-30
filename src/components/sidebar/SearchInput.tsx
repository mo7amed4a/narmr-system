import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export default function SearchInput({ label, className, ...props }: PasswordInputProps) {

  return (
    <div className="w-full">
      {label && <Label className="mb-1 block text-sm font-medium text-gray-700">{label}</Label>}
      <div className="relative">
        <Input
          className={cn("ps-10 bg-gray-50/80 border-gray-300 placeholder:text-gray-400", className)}
          {...props}
          type="text"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute start-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        >
          <Search className="text-gray-500"/>
        </Button>
      </div>
    </div>
  )
}
