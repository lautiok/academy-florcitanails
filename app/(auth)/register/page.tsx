import Link from "next/link";
import { SingUp } from "./components";

export default function Register() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1f2] px-4">
      <section className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-md flex flex-col items-center gap-5">
        <h1 className="text-xl font-semibold text-[#d6b6b9]">
            Regístrate
        </h1>
        <SingUp />
        <p className="text-center text-sm text-gray-500">
          Si ya tienes una cuenta,{" "}
          <Link className="text-[#76d8bb] hover:underline" href="/login">
            inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}