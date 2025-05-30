import Link from "next/link";
import { Providers, SignInForm } from "./components";

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f1f2] px-4">
      <section className="bg-white p-6 rounded-2xl shadow-sm w-full max-w-md flex flex-col items-center gap-5">
        <h1 className="text-xl font-semibold text-[#d6b6b9]">
          Inicia sesión en tu cuenta
        </h1>
        <Providers />

        <p className="flex items-center w-full text-sm text-gray-500">
          <span className="flex-grow border-t border-gray-300"></span>
          <span className="px-3 whitespace-nowrap">
            o inicia sesión con tu correo
          </span>
          <span className="flex-grow border-t border-gray-300"></span>
        </p>

        <SignInForm />
        <p className="text-center text-sm text-gray-500">
          Si no tienes una cuenta,{" "}
          <Link className="text-[#76d8bb] hover:underline" href="/register">
            regístrate
          </Link>
        </p>
      </section>
    </main>
  );
}
