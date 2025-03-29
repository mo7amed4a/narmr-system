import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Expense from "./reports/Expense";
import Payroll from "./reports/Payroll";
import Sales from "./reports/Sales";
import Purchasing from "./reports/Purchasing";

export default function FinancialAccountingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const availablePages = ["Expense", "Payroll", "Sales", "Purchasing"] as const;
  type PageType = (typeof availablePages)[number];

  const defaultPage: PageType = "Expense";
  const tabFromUrl = searchParams.get("tab") as PageType;
  const [page, setPage] = useState<PageType>(
    availablePages.includes(tabFromUrl) ? tabFromUrl : defaultPage
  );

  useEffect(() => {
    if (tabFromUrl && availablePages.includes(tabFromUrl)) {
      setPage(tabFromUrl);
    }
  }, [tabFromUrl]);

  const changePage = (newPage: PageType) => {
    setPage(newPage);
    setSearchParams({ tab: newPage });
  };

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-none">
        <div className="flex justify-between items-start lg:items-center flex-col lg:flex-row gap-8 px-4">
          <div className="flex gap-2 flex-wrap lg:flex-nowrap py-3">
            {availablePages.map((tab) => (
              <Button
                key={tab}
                variant="secondary"
                className={`hover:bg-transparent rounded-none bg-transparent shadow-none ${
                  page === tab ? "border-b-2 border-b-primary text-primary" : ""
                }`}
                onClick={() => changePage(tab)}
              >
                {tab === "Expense" && "تقارير المصاريف"}
                {tab === "Payroll" && "تقارير المرتبات"}
                {tab === "Sales" && "تقارير المبيعات"}
                {tab === "Purchasing" && "المشتريات"}
              </Button>
            ))}
          </div>
        </div>

        {page === "Expense" && <Expense />}
        {page === "Payroll" && <Payroll />}
        {page === "Sales" && <Sales />}
        {page === "Purchasing" && <Purchasing />}
      </Card>
    </div>
  );
}
