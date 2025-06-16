import { TitleBlock } from "@/components/Shared";
import { ProfileForm } from "./profile-form";
import { auth } from "@/lib/auth";
import { User } from "lucide-react";

export async function ProfilePageContent() {
        const session = await auth()
    
        if (!session) {
            return <div>No tienes sesión</div>
        }
        const user =  session.user
    return <div className="p-6 bg-white rounded-md border border-slate-200">
            <TitleBlock title="Perfil" icon={User}/>
            <ProfileForm user={user} />
        </div>
}