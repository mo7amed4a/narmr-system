import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useUser } from "@/hooks/auth.context";

export default function User({
    link
}:{
    link: string
}) {
  const {logout} = useUser()
  return (
    <DropdownMenu dir="rtl">
    <DropdownMenuTrigger asChild>
      <Button className="h-12 px-1 md:px-2 flex items-center md:gap-2" variant={"ghost"}>
        <ChevronDown />
        <span>Mohamed</span>
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="" />
          <AvatarFallback>MO</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem >
      <Link to={link} className="flex gap-2 items-center">
     <svg className="size-4" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#121212" />
  <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill="#121212" />
</svg>


الصفحة الشخصية</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => {
          logout()
        }}
      >
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.8 2H14.2C11 2 9 4 9 7.2V11.25H15.25C15.66 11.25 16 11.59 16 12C16 12.41 15.66 12.75 15.25 12.75H9V16.8C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2Z" fill="#121212" />
            <path d="M4.55994 11.2498L6.62994 9.17984C6.77994 9.02984 6.84994 8.83984 6.84994 8.64984C6.84994 8.45984 6.77994 8.25984 6.62994 8.11984C6.33994 7.82984 5.85994 7.82984 5.56994 8.11984L2.21994 11.4698C1.92994 11.7598 1.92994 12.2398 2.21994 12.5298L5.56994 15.8798C5.85994 16.1698 6.33994 16.1698 6.62994 15.8798C6.91994 15.5898 6.91994 15.1098 6.62994 14.8198L4.55994 12.7498H8.99994V11.2498H4.55994Z" fill="#121212" />
        </svg>
        تسجيل الخروج
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
