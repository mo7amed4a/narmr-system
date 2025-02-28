import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer } from "lucide-react";
import ButtonExcel from "@/components/buttons/ButtonExcel";
import ButtonPDF from "@/components/buttons/ButtonPDF";
import Expense from "./reports/Expense";
import Payroll from "./reports/Payroll";
import Sales from "./reports/Sales";
import Purchasing from "./reports/Purchasing";

export default function FinancialAccountingPage() {
  const [page, setPage] = useState<"Expense"|"Payroll"|"Sales"|"Purchasing">("Expense")

  return (
    <div className="space-y-4">
      
        <Card className=" border-none shadow-none">
          <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row gap-8 px-4">
            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
              <Button variant={"secondary"} className={`hover:bg-transparent rounded-none bg-transparent shadow-none ${page === "Expense" && "border-b-2 border-b-primary text-primary"}`} onClick={() => setPage("Expense")}>تقارير المصاريف</Button>
              <Button variant={"secondary"} className={`hover:bg-transparent rounded-none bg-transparent shadow-none ${page === "Payroll" && "border-b-2 border-b-primary text-primary"}`} onClick={() => setPage("Payroll")}>تقارير المرتبات</Button>
              <Button variant={"secondary"} className={`hover:bg-transparent rounded-none bg-transparent shadow-none ${page === "Sales" && "border-b-2 border-b-primary text-primary"}`} onClick={() => setPage("Sales")}>تقارير المبيعات</Button>
              <Button variant={"secondary"} className={`hover:bg-transparent rounded-none bg-transparent shadow-none ${page === "Purchasing" && "border-b-2 border-b-primary text-primary"}`} onClick={() => setPage("Purchasing")}>المشتريات</Button>
            </div>
            <div className="flex w-full gap-2 justify-end py-6">
              <Button variant={"outline"}>
                <span className="hidden md:block">طباعة الملف</span>
                <Printer />
              </Button>
              <ButtonExcel />
              <ButtonPDF />
            </div>
          </div>

          {
            page === "Expense" && <Expense />
          }
          {
            page === "Payroll" && <Payroll />
          }
          {
            page === "Sales" && <Sales />
          }
          {
            page === "Purchasing" && <Purchasing />
          }
         
        </Card>
    </div>
  );
}
