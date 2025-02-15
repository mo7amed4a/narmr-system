import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AccountingHeader from "@/components/header/accounting.header";
import { AccountingSidebar } from "@/components/sidebar/accounting-sidebar";
import LoadingPage from "@/pages/LoadingPage";
// import { AppSidebar } from "@/components/sidebar/app-sidebar";

const Home = lazy(() => import("../apps/accounting/home/Home"));
const SuppliersPage = lazy(() => import("../apps/accounting/suppliers/suppliers.page"));
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
                <Route path="/suppliers/:id" element={<SuppliersDetailsPage />} />
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
