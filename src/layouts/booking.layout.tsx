import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookingSidebar } from "@/components/sidebar/booking-sidebar";
import BookingHeader from "@/components/header/booking.header";
import ClientsPage from "@/apps/booking/clients/clients.page";
import ShowClientPage from "@/apps/booking/clients/ShowClient.page";
import AddClientPage from "@/apps/booking/clients/AddClient.page";
import EditClientPage from "@/apps/booking/clients/EditClient.page";
import ReservationsPage from "@/apps/booking/reservations/reservations.page";
import ShowReservationsDetailsPage from "@/apps/booking/reservations/ShowReservationsDetails.page";
import AddReservationsPage from "@/apps/booking/reservations/AddReservations.page";
import DoctorsPage from "@/apps/booking/doctors/doctors.page";
import DoctorDetailsPage from "@/apps/booking/doctors/doctorDetails.page";
import AddAppointmentFormPage from "@/apps/booking/doctors/AddAppointmentForm.page";
import InvoicesPage from "@/apps/booking/invoices/invoices.page";
import InvoiceDetailsPage from "@/apps/booking/invoices/invoicesDetails.page";
import InvoicesEditPage from "@/apps/booking/invoices/invoicesEdit.page";
import InvoicesAddPage from "@/apps/booking/invoices/invoicesAdd.page";

const BookingHome = lazy(() => import("@/apps/booking/home/Home"));

function BookingLayout() {
  return (
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
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </main>
  );
}

export default BookingLayout;
