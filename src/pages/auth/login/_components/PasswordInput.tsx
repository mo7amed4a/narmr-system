import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
}

export default function PasswordInput({ label, className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <div className="w-full">
      {label && <Label className="mb-1 block text-sm font-medium text-gray-700">{label}</Label>}
      <div className="relative">
        <Input
          className={cn("pe-10 bg-gray-50/80 border-gray-200 placeholder:text-gray-400", className)}
          {...props}
          type={showPassword ? "text" : "password"} 
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute end-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility} 
        >
          {showPassword ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
    </div>
  )
}
