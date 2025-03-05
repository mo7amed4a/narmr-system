import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AccountingHeader from "@/components/header/accounting.header";
import { AccountingSidebar } from "@/components/sidebar/accounting-sidebar";
import LoadingPage from "@/pages/LoadingPage";
import ProfilePage from "@/apps/profile/profile";

const Home = lazy(() => import("../apps/accounting/home/Home"));
const SuppliersPage = lazy(() => import("../apps/accounting/suppliers/suppliers.page"));
const SuppliersAddPage = lazy(() => import("../apps/accounting/suppliers/suppliersAdd.page"));
const SuppliersEditPage = lazy(() => import("../apps/accounting/suppliers/suppliersEdit.page"));
const SuppliersDetailsPage = lazy(() => import("../apps/accounting/suppliers/suppliersDetails.page"));

const PurchasesPage = lazy(() => import("@/apps/accounting/purchases/purchases.page"));
const PurchasesDetailsPage = lazy(() => import("@/apps/accounting/purchases/purchasesDetails.page"));
const PurchasesAddPage = lazy(() => import("@/apps/accounting/purchases/purchasesAdd.page"));

const SalesPage = lazy(() => import("@/apps/accounting/sales/sales.page"));
const SalesAddPage = lazy(() => import("@/apps/accounting/sales/salesAdd.page"));
const SalesDetailsPage = lazy(() => import("@/apps/accounting/sales/salesDetails.page"));

const StaffPage = lazy(() => import("@/apps/accounting/staff/staff.page"));
const StaffDetails = lazy(() => import("@/apps/accounting/staff/staffDetails"));

const BandsAccountingPage = lazy(() => import("@/apps/accounting/accounts/bonds/bonds.page"));
const AddBondsAccountingPage = lazy(() => import("@/apps/accounting/accounts/bonds/AddBonds.page"));
const BondsDetailsAccountingPage = lazy(() => import("@/apps/accounting/accounts/bonds/bondsDetails.page"));

const StatementAccountingPage = lazy(() => import("@/apps/accounting/accounts/statement/statement.page"));
const TreasuryAccountingPage = lazy(() => import("@/apps/accounting/accounts/treasury/treasury.page"));

const ReservationsAccountingPage = lazy(() => import("@/apps/accounting/reports/reservations/reservations.page"));
const FinancialAccountingPage = lazy(() => import("@/apps/accounting/reports/financial/financial.page"));
const DoctorsAccountingPage = lazy(() => import("@/apps/accounting/reports/doctors/doctors.page"));


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
                <Route path="/profile" element={<ProfilePage />} />
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
                <Route path="reports/*" >
                      <Route index element={<ReservationsAccountingPage />} />
                      <Route path="reservations" element={<ReservationsAccountingPage />} />
                      <Route path="financial" element={<FinancialAccountingPage />} />
                      <Route path="doctors" element={<DoctorsAccountingPage />} />
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
