import Link from "next/link";

export function Nav() {
    return (
        <div className="my-1 mx-8 border rounded-lg bg-white flex justify-center items-center md:justify-start">
            <nav className="p-4">
                <ul className="flex  gap-2">
                    <li>
                        <Link href="/teacher/presenciales">
                            Notificaciones
                        </Link>
                    </li>
                    <li>
                        <Link href="/teacher/presenciales/list">
                            Alumnos
                        </Link>
                    </li>
                </ul>
            </nav>
    </div>
    )
}