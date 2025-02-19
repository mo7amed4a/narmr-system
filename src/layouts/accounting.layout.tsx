import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AccountingHeader from "@/components/header/accounting.header";
import { AccountingSidebar } from "@/components/sidebar/accounting-sidebar";
import LoadingPage from "@/pages/LoadingPage";
import PurchasesPage from "@/apps/accounting/purchases/purchases.page";
import PurchasesDetailsPage from "@/apps/accounting/purchases/purchasesDetails.page";
import PurchasesAddPage from "@/apps/accounting/purchases/purchasesAdd.page";
import SalesPage from "@/apps/accounting/sales/sales.page";
import SalesAddPage from "@/apps/accounting/sales/salesAdd.page";
import SalesDetailsPage from "@/apps/accounting/sales/salesDetails.page";
import StaffPage from "@/apps/accounting/staff/staff.page";
import StaffDetails from "@/apps/accounting/staff/staffDetails";
import BandsAccountingPage from "@/apps/accounting/accounts/bonds/bonds.page";
import AddBondsAccountingPage from "@/apps/accounting/accounts/bonds/AddBonds.page";
import BondsDetailsAccountingPage from "@/apps/accounting/accounts/bonds/bondsDetails.page";
import StatementAccountingPage from "@/apps/accounting/accounts/statement/statement.page";
import TreasuryAccountingPage from "@/apps/accounting/accounts/treasury/treasury.page";
// import { AppSidebar } from "@/components/sidebar/app-sidebar";

const Home = lazy(() => import("../apps/accounting/home/Home"));
const SuppliersPage = lazy(() => import("../apps/accounting/suppliers/suppliers.page"));
const SuppliersAddPage = lazy(() => import("../apps/accounting/suppliers/suppliersAdd.page"));
const SuppliersEditPage = lazy(() => import("../apps/accounting/suppliers/suppliersEdit.page"));
const SuppliersDetailsPage = lazy(() => import("../apps/accounting/suppliers/suppliersDetails.page"));

function AccountingLayout() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="bg-[#EEEEEE]">
        <SidebarProvider>
          <AccountingSidebar />
          <div className="w-full">
            <AccountingHeader pagination={true}>
              <SidebarTrigger />
            </AccountingHeader>
            <main className="w-full p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/suppliers" element={<SuppliersPage />} />
                <Route path="/suppliers/add" element={<SuppliersAddPage />} />
                <Route path="/suppliers/:id" element={<SuppliersDetailsPage />} />
                <Route path="/suppliers/:id/edit" element={<SuppliersEditPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/purchases/add" element={<PurchasesAddPage />} />
                <Route path="/purchases/:id" element={<PurchasesDetailsPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/sales/add" element={<SalesAddPage />} />
                <Route path="/sales/:id" element={<SalesDetailsPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/staff/:id" element={<StaffDetails />} />
                <Route path="/accounts/*" >
                    <Route index element={<BandsAccountingPage />} />
                    <Route path="bonds" element={<BandsAccountingPage />} />
                    <Route path="bonds/add" element={<AddBondsAccountingPage />} />
                    <Route path="bonds/:id" element={<BondsDetailsAccountingPage />} />
                    <Route path="statement" element={<StatementAccountingPage />} />
                    <Route path="treasury" element={<TreasuryAccountingPage />} />
                </Route>
                <Route path="/*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </main>
    </Suspense>
  );
}

export default AccountingLayout;
