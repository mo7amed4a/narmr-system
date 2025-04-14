

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
import { SupplierType } from "@/apps/accounting/suppliers/suppliers.page";

interface SupplierSelectProps {
  value: string;
  onValueChange: (value: string | SupplierType) => void;
  allData?: boolean;
}

export default function SuppliersSelect({ value, onValueChange, allData }: SupplierSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useFetch("/suppliers");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الموردين: {error.message}</div>;

  const suppliers = data?.data || [];

  const onValueChangeHandler = (selectedValue: string) => {
    if (allData) {
      onValueChange(
        suppliers.find((supplier: SupplierType) => supplier.supplier_id.toString() === selectedValue)
      );
    } else {
      onValueChange(selectedValue);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-full">
      <Label>اختر المورد</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? suppliers.find((supplier: SupplierType) => supplier.supplier_id.toString() === value)
                  ?.name
              : "اختر المورد..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن مورد..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على مورد.</CommandEmpty>
              <CommandGroup>
                {suppliers.map((supplier: SupplierType) => (
                  <CommandItem
                    key={supplier.supplier_id}
                    value={supplier.name} // Changed to supplier.name for search to work
                    onSelect={() => onValueChangeHandler(supplier.supplier_id.toString())}
                  >
                    {supplier.name}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === supplier.supplier_id.toString() ? "opacity-100 cmx-4" : "opacity-0 cmx-4"
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