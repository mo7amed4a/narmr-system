import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LoadingPage from "@/pages/LoadingPage";
import { AdminSidebar } from "@/components/sidebar/admin-sidebar";
import AdminHeader from "@/components/header/admin.header";
import OfficialsPage from "@/apps/admin/officials/officials.page";
import OfficialsAddPage from "@/apps/admin/officials/officialsAdd.page";
import ServicesPage from "@/apps/admin/services/services.page";
import ServicesAddPage from "@/apps/admin/services/servicesAdd.page";
import BranchesPage from "@/apps/admin/branches/branches.page";
import BranchesDetailsPage from "@/apps/admin/branches/branchesDetails.page";
import BranchesAddPage from "@/apps/admin/branches/branchesAdd.page";
import StaffEditPage from "@/apps/accounting/staff/staffEdit.page";
import BranchStaffDetailsPage from "@/apps/admin/branches/staff/BranchStaffDetails.page";
import ProfilePage from "@/apps/profile/profile";
import DoctorAddPage from "@/apps/booking/doctors/doctorAdd.page";
import DoctorEditPage from "@/apps/booking/doctors/doctorEdit.page";
import EditReservationPage from "@/apps/booking/reservations/EditReservation.page";
import ProductsPage from "@/apps/accounting/products/products.page";
import ProductsDetailsPage from "@/apps/accounting/products/products-details.page";
import ProductsAddPage from "@/apps/accounting/products/products-add.page";
import ProductsEditPage from "@/apps/accounting/products/products-edit.page";
import OfficialsEditPage from "@/apps/admin/officials/officialsEdit.page";
import OfficialsDetailsPage from "@/apps/admin/officials/officialsDetails.page";

const Home = lazy(() => import("../apps/admin/home/Home"));



// booking
const ClientsPage = lazy(() => import("@/apps/booking/clients/clients.page"));
const ShowClientPage = lazy(() => import("@/apps/booking/clients/ShowClient.page"));
const AddClientPage = lazy(() => import("@/apps/booking/clients/AddClient.page"));
const EditClientPage = lazy(() => import("@/apps/booking/clients/EditClient.page"));

const ReservationsPage = lazy(() => import("@/apps/booking/reservations/reservations.page"));
const ShowReservationsDetailsPage = lazy(() => import("@/apps/booking/reservations/ShowReservationsDetails.page"));
const AddReservationsPage = lazy(() => import("@/apps/booking/reservations/AddReservations.page"));

const DoctorsPage = lazy(() => import("@/apps/booking/doctors/doctors.page"));
const DoctorDetailsPage = lazy(() => import("@/apps/booking/doctors/doctorDetails.page"));
const AddAppointmentFormPage = lazy(() => import("@/apps/booking/doctors/AddAppointmentForm.page"));

const InvoicesPage = lazy(() => import("@/apps/booking/invoices/invoices.page"));
const InvoiceDetailsPage = lazy(() => import("@/apps/booking/invoices/invoicesDetails.page"));
const InvoicesEditPage = lazy(() => import("@/apps/booking/invoices/invoicesEdit.page"));
const InvoicesAddPage = lazy(() => import("@/apps/booking/invoices/invoicesAdd.page"));

// accounting

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
          <AdminSidebar />
          <div className="w-full">
            <AdminHeader pagination={true}>
              <SidebarTrigger />
            </AdminHeader>
            <main className="w-full p-2.5 md:p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                
                <Route path="/branches/*" >
                    <Route index element={<BranchesPage />} />
                    <Route path=":id" element={<BranchesDetailsPage />} />
                    <Route path="add" element={<BranchesAddPage />} />
                    <Route path="staff/*" >
                      <Route path=":id" element={<BranchStaffDetailsPage />} />
                    </Route>
                </Route>
                <Route path="/services/*" >
                    <Route index element={<ServicesPage />} />
                    <Route path="add" element={<ServicesAddPage />} />
                </Route>
                <Route path="/officials/*" >
                    <Route index element={<OfficialsPage />} />
                    <Route path="add" element={<OfficialsAddPage />} />
                    <Route path=":id" element={<OfficialsDetailsPage />} />
                    <Route path=":id/edit" element={<OfficialsEditPage />} />
                </Route>
                {/* Booking */}
                <Route path="/booking/*" >
                  <Route path="clients" element={<ClientsPage />} />
                  <Route path="clients/add" element={<AddClientPage />} />
                  <Route path="clients/:id" element={<ShowClientPage />} />
                  <Route path="clients/:id/edit" element={<EditClientPage />} />
                  <Route path="reservations" element={<ReservationsPage />} />
                  <Route path="reservations/add" element={<AddReservationsPage />} />
                  <Route path="reservations/:id" element={<ShowReservationsDetailsPage />} />
                  <Route path="reservations/:id/edit" element={<EditReservationPage />} />
                  <Route path="doctors" element={<DoctorsPage />} />
                  <Route path="doctors/add" element={<DoctorAddPage />} />
                  <Route path="doctors/:id" element={<DoctorDetailsPage />} />
                  <Route path="doctors/:id/edit" element={<DoctorEditPage />} />
                  <Route path="doctors/:id/booking" element={<AddAppointmentFormPage />} />
                  <Route path="invoices" element={<InvoicesPage />} />
                  <Route path="invoices/:id" element={<InvoiceDetailsPage />} />
                  <Route path="invoices/add" element={<InvoicesAddPage />} />
                  <Route path="invoices/:id/edit" element={<InvoicesEditPage />} />
                </Route>
                {/* accounting */}
                <Route path="/accounting/*" >
                  <Route path="suppliers" element={<SuppliersPage />} />
                  <Route path="suppliers/add" element={<SuppliersAddPage />} />
                  <Route path="suppliers/:id" element={<SuppliersDetailsPage />} />
                  <Route path="suppliers/:id/edit" element={<SuppliersEditPage />} />
                  <Route path="purchases" element={<PurchasesPage />} />
                  <Route path="purchases/add" element={<PurchasesAddPage />} />
                  <Route path="purchases/:id" element={<PurchasesDetailsPage />} />
                  <Route path="sales" element={<SalesPage />} />
                  <Route path="sales/add" element={<SalesAddPage />} />
                  <Route path="sales/:id" element={<SalesDetailsPage />} />
                  <Route path="staff" element={<StaffPage />} />
                  <Route path="staff/:id" element={<StaffDetails />} />
                  <Route path="staff/:id/edit" element={<StaffEditPage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/add" element={<ProductsAddPage />} />
                  <Route path="products/:id" element={<ProductsDetailsPage />} />
                  <Route path="products/:id/edit" element={<ProductsEditPage />} />
                  <Route path="accounts/*" >
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
