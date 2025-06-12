import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar, Footer, NavBar } from "./components";
import { auth } from "@/lib/auth";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const users = await auth()

  if (!users) {
    return <div>No hay usuarios</div>
  }
  return (
    <main >
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex flex-col min-h-screen">
          <NavBar userId={users.user.id} />
          <main className="flex-1"> {children} </main>
          <Footer />
        </div>
      </SidebarProvider>
    </main>
  );
}
