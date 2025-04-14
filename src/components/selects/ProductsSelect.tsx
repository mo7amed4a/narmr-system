"use client";

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
import { ProductType } from "@/apps/accounting/products/products.page";

interface ProductsSelectProps {
  value: string;
  onValueChange: (value: string | ProductType) => void;
  allData?: boolean;
}

export default function ProductsSelect({ value, onValueChange, allData }: ProductsSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useFetch("/products");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل المنتجات: {error.message}</div>;

  const products = data?.data || [];

  const onValueChangeHandler = (selectedValue: string) => {
    if (allData) {
      onValueChange(
        products.find((product: ProductType) => product.product_id.toString() === selectedValue)
      );
    } else {
      onValueChange(selectedValue);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-full">
      <Label>اختر المنتج</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? products.find((product: ProductType) => product.product_id.toString() === value)?.name
              : "اختر المنتج..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن منتج..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على منتج.</CommandEmpty>
              <CommandGroup>
                {products.map((product: ProductType) => (
                  <CommandItem
                    key={product.product_id}
                    value={product.name} // Changed to product.name for search to work
                    onSelect={() => onValueChangeHandler(product.product_id.toString())}
                  >
                    {product.name}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === product.product_id.toString() ? "opacity-100 cmx-4" : "opacity-0 cmx-4"
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