import { cn } from "@/lib/utils";
import React from "react";
import { NavLink } from "react-router-dom";

export default function LinkActive({
    children,
    href,
    className
}:{
    children: React.ReactNode,
    href: string
    className?: string
}) {  
    const style = cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm", className)
    const firstLink = href.split("/")[1];
  return (
    <NavLink
      to={href}
      end={href === `/${firstLink}`}
      className={({isActive}) =>{        
        return  isActive
          ? `bg-primary text-white font-bold ${style}` 
          : `text-gray-700 ${style}`
      }
      }
    >
      {children}
    </NavLink>
  )
}
