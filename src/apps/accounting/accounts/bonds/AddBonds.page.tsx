
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import BookingBondOne from "@/components/bonds-add/bond-one"
import React from "react"
import BookingBondTwo from "@/components/bonds-add/bond-two"
import BookingBondThree from "@/components/bonds-add/bond-three"

export default function AddBondsAccountingPage() {
  const [bondValue, setBondValue] = React.useState("three")
  return (
    <div className="space-y-4">
      <Card className="w-full border-none shadow-none" dir="rtl">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold">اضافة سند</h2>
          <div className="gap-x-2">
            <Button variant="green">حفظ السند</Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <h3 className="mb-4 text-lg font-semibold">اضافة سند</h3>
          <div className="mb-8 space-y-6">
            <div className="gap-4 flex items-center ">
              <Label>نوع السند</Label>
              <RadioGroup defaultValue={bondValue} className="flex gap-4"
               onValueChange={(value) =>
                setBondValue(value)
              }
              >
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="one" id="one" />
                  <Label htmlFor="one">سند قبض</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="two" id="two" />
                  <Label htmlFor="two">سند صرف</Label>
                </div>
                <div className="flex items-center gap-x-2">
                  <RadioGroupItem value="three" id="three" />
                  <Label htmlFor="three">سند قيد</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {bondValue === "one" && <BookingBondOne />}
          {bondValue === "two" && <BookingBondTwo />}
          {bondValue === "three" && <BookingBondThree />}
          
        </CardContent>
      </Card>
    </div>
  )
}

