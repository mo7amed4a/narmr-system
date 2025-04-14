

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
import { Doctor } from "@/apps/booking/doctors/doctors.page";

interface DoctorSelectProps {
  value: string;
  onValueChange: (value: string | Doctor) => void;
  allData?: boolean;
}

export default function DoctorSelect({ value, onValueChange, allData }: DoctorSelectProps) {
  const [open, setOpen] = React.useState(false);
  const { data, loading, error } = useFetch("/doctors");

  if (loading) return <LoadingSmall />;
  if (error) return <div>خطأ في تحميل الأطباء: {error.message}</div>;

  const doctors = data?.data || [];

  const onValueChangeHandler = (selectedValue: string) => {
    if (allData) {
      onValueChange(doctors.find((doctor: Doctor) => doctor.id.toString() === selectedValue));
    } else {
      onValueChange(selectedValue);
    }
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-full">
      <Label>اختر الطبيب</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? doctors.find((doctor: Doctor) => doctor.id.toString() === value)?.name
              : "اختر الطبيب..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن طبيب..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على طبيب.</CommandEmpty>
              <CommandGroup>
                {doctors.map((doctor: Doctor) => (
                  <CommandItem
                    key={doctor.id}
                    value={doctor.name} // Changed to doctor.name for search to work
                    onSelect={() => onValueChangeHandler(doctor.id.toString())}
                  >
                    {doctor.name}
                    <Check
                      className={cn(
                        "ms-auto",
                        value === doctor.id.toString() ? "opacity-100 cmx-4" : "opacity-0 cmx-4"
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