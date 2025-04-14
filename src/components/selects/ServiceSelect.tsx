

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

interface ServiceSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function ServiceSelect({ value, onValueChange }: ServiceSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useFetch("/services");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الخدمات: {error.message}</div>;

  const services = data?.data || [];

  const handleChange = (serviceId: string) => {
    services.find((service: any) => service.id === parseInt(serviceId));
    onValueChange(serviceId);
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-full">
      <Label>اختر الخدمة</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value && value !== "0"
              ? services.find((service: any) => service.id.toString() === value)?.name
              : "اختر الخدمة..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن خدمة..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على خدمة.</CommandEmpty>
              <CommandGroup>
                {services.map((service: any) => (
                  <CommandItem
                    key={service.id}
                    value={service.name} // Changed to service.name for search to work
                    onSelect={() => handleChange(service.id.toString())}
                  >
                    {service.name}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === service.id.toString() ? "opacity-100 cmx-4" : "opacity-0 cmx-4"
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