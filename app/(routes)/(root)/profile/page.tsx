import { auth } from "@/lib/auth"
import { ProfileForm } from "./components"
import { TitleBlock } from "@/components/Shared"
import { User } from "lucide-react"

export default async function ProfilePage() {
    const session = await auth()

    if (!session) {
        return <div>No tienes sesión</div>
    }
    const user =  session.user
    
  return (
    <div className="m-6">
        <div className="p-6 bg-white rounded-md border border-slate-200">
            <TitleBlock title="Perfil" icon={User}/>
            <ProfileForm user={user} />
        </div>
    </div>
  )
}