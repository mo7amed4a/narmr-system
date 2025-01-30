import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import NotFoundPage from "@/pages/NotFoundPage";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";


const Home = lazy(() => import('./../pages/Home'));

function AppLayout() {
  return (
    <main className="bg-[#EEEEEE]">
        <SidebarProvider>
            <AppSidebar />
                <SidebarTrigger />
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/*" element={<NotFoundPage />}/>
              </Routes>  
          </SidebarProvider>
    </main>
  )
}

export default AppLayout