

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import useFetch from "@/hooks/use-fetch";
import LoadingSmall from "../api/loadingSmall";

interface CashboxSelectProps {
  value: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
}

export default function CashboxesSelect({ value, disabled, onValueChange }: CashboxSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useFetch("/cashboxes");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الخزينة: {error.message}</div>;

  const cashboxes = data?.records || [];

  return (
    <div className="space-y-2 w-full">
      <Label>اختر الخزنة</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            {value
              ? cashboxes.find((cashbox: any) => cashbox.id.toString() === value)?.name
              : "اختر الخزنة..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن خزنة..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على خزنة.</CommandEmpty>
              <CommandGroup>
                {cashboxes.map((cashbox: any) => (
                  <CommandItem
                    key={cashbox.id}
                    value={cashbox.name} // Changed to cashbox.name for search to work
                    onSelect={() => {
                      onValueChange(cashbox.id.toString());
                      setOpen(false);
                    }}
                  >
                    {cashbox.name}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === cashbox.id.toString() ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}