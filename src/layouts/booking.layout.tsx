import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookingSidebar } from "@/components/sidebar/booking-sidebar";
import BookingHeader from "@/components/header/booking.header";
import LoadingPage from "@/pages/LoadingPage";
import ProfilePage from "@/apps/profile/profile";
import DoctorAddPage from "@/apps/booking/doctors/doctorAdd.page";
import DoctorEditPage from "@/apps/booking/doctors/doctorEdit.page";
import EditReservationPage from "@/apps/booking/reservations/EditReservation.page";
import ProfileEditPage from "@/apps/profile/profileEdit.page";
import BandsAccountingPage from "@/apps/accounting/accounts/bonds/bonds.page";
import AddBondsAccountingPage from "@/apps/accounting/accounts/bonds/AddBonds.page";
import BondsDetailsAccountingPage from "@/apps/accounting/accounts/bonds/bondsDetails.page";
import StatementAccountingPage from "@/apps/accounting/accounts/statement/statement.page";
import TreasuryAccountingPage from "@/apps/accounting/accounts/treasury/treasury.page";
import BondsAddAccountingPage from "@/apps/accounting/accounts/bonds/BondsAdd.page";

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

// const BondsPage = lazy(() => import("@/apps/booking/accounts/bonds/bonds.page"));
// const AddBondsPage = lazy(() => import("@/apps/booking/accounts/bonds/AddBonds.page"));
// const BondsDetailsPage = lazy(() => import("@/apps/booking/accounts/bonds/bondsDetails.page"));

// const StatementPage = lazy(() => import("@/apps/booking/accounts/statement/statement.page"));
// const TreasuryPage = lazy(() => import("@/apps/booking/accounts/treasury/treasury.page"));

const BookingHome = lazy(() => import("@/apps/booking/home/Home"));

function BookingLayout() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <main className="bg-[#EEEEEE]">
        <SidebarProvider>
          <BookingSidebar />
          <div className="w-full">
            <BookingHeader pagination={true}>
              <SidebarTrigger />
            </BookingHeader>
            <main className="w-full p-4">
              <Routes>
                <Route path="/" element={<BookingHome />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/edit" element={<ProfileEditPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/add" element={<AddClientPage />} />
                <Route path="/clients/:id" element={<ShowClientPage />} />
                <Route path="/clients/:id/edit" element={<EditClientPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/reservations/add" element={<AddReservationsPage />} />
                <Route path="/reservations/:id" element={<ShowReservationsDetailsPage />} />
                {/* جديدة */}
                <Route path="/reservations/:id/edit" element={<EditReservationPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/add" element={<DoctorAddPage />} />
                <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
                {/* جديدة */}
                <Route path="/doctors/:id/edit" element={<DoctorEditPage />} />
                <Route path="/doctors/:id/booking" element={<AddAppointmentFormPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
                <Route path="/invoices/add" element={<InvoicesAddPage />} />
                <Route path="/invoices/:id/edit" element={<InvoicesEditPage />} />
                {/* <Route path="/accounts/*" >
                    <Route index element={<BondsPage />} />
                    <Route path="bonds" element={<BondsPage />} />
                    <Route path="bonds/add" element={<AddBondsPage />} />
                    <Route path="bonds/:id" element={<BondsDetailsPage />} />
                    <Route path="statement" element={<StatementPage />} />
                    <Route path="treasury" element={<TreasuryPage />} />
                </Route> */}
                 <Route path="/accounts/*" >
                      <Route index element={<BandsAccountingPage />} />
                      <Route path="bonds" element={<BandsAccountingPage />} />
                      
                      <Route path="bonds/add" element={<BondsAddAccountingPage />} />
                      <Route path="bonds/add2" element={<AddBondsAccountingPage />} />
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

export default BookingLayout;
