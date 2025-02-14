import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookingSidebar } from "@/components/sidebar/booking-sidebar";
import BookingHeader from "@/components/header/booking.header";
import LoadingPage from "@/pages/LoadingPage";

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

const BondsPage = lazy(() => import("@/apps/booking/accounts/bonds/bonds.page"));
const AddBondsPage = lazy(() => import("@/apps/booking/accounts/bonds/AddBonds.page"));
const BondsDetailsPage = lazy(() => import("@/apps/booking/accounts/bonds/bondsDetails.page"));

const StatementPage = lazy(() => import("@/apps/booking/accounts/statement/statement.page"));
const TreasuryPage = lazy(() => import("@/apps/booking/accounts/treasury/treasury.page"));

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
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/add" element={<AddClientPage />} />
                <Route path="/clients/:id" element={<ShowClientPage />} />
                <Route path="/clients/:id/edit" element={<EditClientPage />} />
                <Route path="/reservations" element={<ReservationsPage />} />
                <Route path="/reservations/add" element={<AddReservationsPage />} />
                <Route path="/reservations/:id" element={<ShowReservationsDetailsPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
                <Route path="/doctors/:id/booking" element={<AddAppointmentFormPage />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />
                <Route path="/invoices/add" element={<InvoicesAddPage />} />
                <Route path="/invoices/:id/edit" element={<InvoicesEditPage />} />
                <Route path="/accounts/*" >
                    <Route index element={<BondsPage />} />
                    <Route path="bonds" element={<BondsPage />} />
                    <Route path="bonds/add" element={<AddBondsPage />} />
                    <Route path="bonds/:id" element={<BondsDetailsPage />} />
                    <Route path="statement" element={<StatementPage />} />
                    <Route path="treasury" element={<TreasuryPage />} />
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
