import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

export default function ToggleStatus({
    children,
    action
}:{
    children: React.ReactNode,
    action?: () => void
}) {
  return (
    <Dialog>
        <DialogTrigger>
            {children}
        </DialogTrigger>
        <DialogContent>
            <p>هل انت متاكد من حذف هذا العنصر؟</p>
            <button onClick={action} className="text-red-500 text-sm">حذف</button>
        </DialogContent>
    </Dialog>
  )
}
