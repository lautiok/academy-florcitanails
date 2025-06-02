"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar"
import { router, routerProfessor } from "@/data/sidebar.data"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
 
export function AppSidebar() {
  const {state} = useSidebar()
  const { data: session } = useSession()
  return (
    <Sidebar collapsible="icon" className={`${state === "expanded" ? "w-64" : "w-full"} border-none`}>
      <SidebarContent className="bg-white border-r-2 border-[#f4dfe2]  ">
        <SidebarHeader >
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Image src="/logo.jpg" alt="Logo" width={35} height={35} className="rounded-md" />
            {state === "expanded" && <span className="text-xl font-semibold">FlorcitaNailss</span>}
          </Link>
        </SidebarHeader>
        <SidebarGroup className="p-0.5">
          {state === "expanded" && <SidebarGroupLabel>Plataforma</SidebarGroupLabel>}
          <SidebarMenu className="space-y-2">
            {router.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link href={item.href} className="flex items-center">
                    <div className={`p-1 rounded-lg text-white bg-violet-400 ${
                      state === "collapsed" ? "mx-auto" : "mr-1"
                    }`}>
                      <item.icon className="h-4 w-4" />
                    </div>
                    {state === "expanded" && <span className="text-sm">{item.name}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {session?.user?.role === "admin" && (
             <SidebarMenu className="mt-4">
            {state === "expanded" && <SidebarGroupLabel>Profesor</SidebarGroupLabel>}
            <SidebarMenuItem>
              <SidebarMenuSub>
                {routerProfessor.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.href} className="flex items-center">
                        <div className={`p-1 rounded-lg text-white bg-[#76d8bb] ${
                          state === "collapsed" ? "mx-auto" : "mr-1"
                        }`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        {state === "expanded" && <span className="text-sm">{item.name}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}