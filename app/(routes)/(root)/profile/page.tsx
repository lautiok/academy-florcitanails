import { auth } from "@/lib/auth"
import { ProfileForm } from "./components"

export default async function ProfilePage() {
    const session = await auth()

    if (!session) {
        return <div>No tienes sesión</div>
    }
    const user =  session.user
    
  return (
    <div className="m-6">
        <div className="p-6 bg-white rounded-md border border-slate-200">
            <h2 className="text-base font-semibold text-slate-800 mb-4">
                Perfil
            </h2>
            <ProfileForm user={user} />
        </div>
    </div>
  )
}