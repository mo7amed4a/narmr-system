import React from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

export default function DeleteDialog({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <p>هل انت متاكد من حذف هذا العنصر؟</p>
        <DialogFooter className="gap-2">
          <DialogClose>
            <Button variant="green">لا اريد</Button>
          </DialogClose>
          <DialogClose>
            <Button onClick={action} variant="ghost" className="text-red-500">
              حذف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
