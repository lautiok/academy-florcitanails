"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LinkAccountsPage() {
  const params = useSearchParams();
  const email = params.get("email");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLinkAccounts = async () => {
    if (!email) {
      setError("Email no proporcionado");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Contraseña incorrecta");
    } else {
      // Vincular cuenta Google después de autenticar
      await signIn("google", { callbackUrl: "/" });
    }
  };

  if (!email) {
    return <div>Error: Email no proporcionado</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Vincular cuentas</h1>
      <p className="mb-4">
        El email <span className="font-semibold">{email}</span> ya está registrado.
        Ingresa tu contraseña para vincularlo con Google.
      </p>
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Tu contraseña"
        className="w-full p-2 mb-4 border rounded"
      />
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <button
        onClick={handleLinkAccounts}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Vincular y continuar
      </button>
    </div>
  );
}