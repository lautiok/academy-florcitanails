"use client"

import { useSession, signOut } from "next-auth/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const UserButton = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session?.user) return null

  const { name, email, image } = session.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-9 h-9 cursor-pointer">
          <AvatarImage src={image ?? ""} alt={name ?? "User"} />
          <AvatarFallback>{name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-4">
        <div className="flex flex-col items-center text-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarImage src={image ?? ""} alt={name ?? "User"} />
            <AvatarFallback>{name?.[0]}</AvatarFallback>
          </Avatar>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full justify-center"
            onClick={() => router.push("/profile")}
          >
            Ir a mi perfil
          </Button>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            className="w-full justify-center"
            onClick={() => signOut()}
          >
            Cerrar sesión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
