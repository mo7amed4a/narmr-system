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

interface AccountSelectProps {
  value: string
  onValueChange: (value: string) => void
}

export default function AccountsSelect({ value, onValueChange }: AccountSelectProps) {
  const [open, setOpen] = React.useState(false)
  const { data, loading, error } = useFetch("/accounts")

  if (loading) return <LoadingSmall />
  if (error) return <div>خطأ في تحميل الخزينة: {error.message}</div>

  const accounts = data?.accounts || []

  // Find the selected account for display
  const selectedAccount = accounts.find((account: any) => account.account_id.toString() === value)

  return (
    <div className="space-y-2">
      <Label>اختر الحساب</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedAccount ? selectedAccount.account_name : "اختر الحساب..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command shouldFilter={true}>
            <CommandInput placeholder="ابحث عن حساب..." />
            <CommandList>
              <CommandEmpty>لم يتم العثور على حساب.</CommandEmpty>
              <CommandGroup>
                {accounts.map((account: any) => (
                  <CommandItem
                    key={account.account_id}
                    value={account.account_name} // Changed to account_name for search to work
                    onSelect={() => {
                      onValueChange(account.account_id.toString())
                      setOpen(false)
                    }}
                  >
                    {account.account_name}
                    <Check
                      className={cn("ms-auto", value === account.account_id.toString() ? "opacity-100" : "opacity-0")}
                    />
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
