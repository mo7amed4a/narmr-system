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
              <Route path="/reservations/:id" element={<ShowReservationsDetailsPage />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </main>
  );
}

export default BookingLayout;
