import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { BookingSidebar } from "@/components/sidebar/booking-sidebar";

const BookingHome = lazy(() => import('@/apps/booking/home/Home'));

function BookingLayout() {
  return (
    <main className="bg-[#EEEEEE]">
        <SidebarProvider>
              <BookingSidebar />
              <SidebarTrigger />
              <Routes>
                  <Route path="/" element={<BookingHome />}/>
                  <Route path="/*" element={<NotFoundPage />}/>
              </Routes>  
          </SidebarProvider>
    </main>
  )
}

export default BookingLayout