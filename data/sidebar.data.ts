import { Book, BookOpen, ChartArea, GraduationCap, Home, User } from "lucide-react";

export const router = [
    {
        name: "Inicio",
        href: "/",
        icon: Home,
    },
    {
        name: "Cursos",
        href: "/cursos",
        icon: Book,
    },
    {
        name: "Mis cursos",
        href: "/miscursos",
        icon: BookOpen,
    },
    {
        name: "Perfil",
        href: "/profile",
        icon: User,
    }
];

export const routerProfessor = [
    {
        name: "Cursos",
        href: "/teacher",
        icon: GraduationCap,
    },
    {
        name: "Analiticas",
        href: "/teacher/analytics",
        icon: ChartArea,
    },
];