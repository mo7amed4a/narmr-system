"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import useFetch from "@/hooks/use-fetch"
import LoadingSmall from "../api/loadingSmall"

interface BranchSelectProps {
  value: string
  onValueChange: (value: string) => void
  user_id?: number | string
}

export default function BranchSelect({ value, onValueChange, user_id }: BranchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const { data, loading, error } = useFetch(user_id ? `/branchess?user_id=${user_id}` : "/branches")

  if (loading) return <LoadingSmall />
  if (error) return <div>خطأ في تحميل العملاء: {error.message}</div>

  const branches = data?.data || []

  return (
    <div className="space-y-2 w-full">
      <Label>اختر الفرع</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="h-10" asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value ? branches.find((branch: any) => branch.id.toString() === value)?.name : "اختر الفرع..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="ابحث عن فرع..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على فرع.</CommandEmpty>
              <CommandGroup>
                {branches.map((branch: any) => (
                  <CommandItem
                    key={branch.id}
                    value={branch.name} // Changed to branch.name for search to work
                    onSelect={() => {
                      onValueChange(branch.id.toString())
                      setOpen(false)
                    }}
                  >
                    {branch.name}
                    <Check className={cn("ms-auto", value === branch.id.toString() ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
