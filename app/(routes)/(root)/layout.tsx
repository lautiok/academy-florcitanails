import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, Footer, NavBar } from "./components";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main >
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-1"> {children} </main>
          <Footer />
        </div>
      </SidebarProvider>
      <Toaster />
    </main>
  );
}
