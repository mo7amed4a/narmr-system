

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

interface CustomerSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function CustomerSelect({ value, onValueChange }: CustomerSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useFetch("/customers");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل العملاء: {error.message}</div>;

  const customers = data?.data || [];

  return (
    <div className="space-y-2 w-full">
      <Label>اختر العميل</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value && value !== "0"
              ? customers.find((customer: any) => customer.id.toString() === value)?.name
              : "اختر العميل..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن عميل..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على عميل.</CommandEmpty>
              <CommandGroup>
                {customers.map((customer: any) => (
                  <CommandItem
                    key={customer.id}
                    value={customer.name} // Changed to customer.name for search to work
                    onSelect={() => {
                      onValueChange(customer.id.toString());
                      setOpen(false);
                    }}
                  >
                    {customer.name}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === customer.id.toString() ? "opacity-100 cmx-4" : "opacity-0 cmx-4"
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