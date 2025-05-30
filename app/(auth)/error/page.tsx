"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");
  const email = params.get("email");
  const router = useRouter();

  useEffect(() => {
    if (error === "AccountExistsNeedLinking" && email) {
      router.push(`/auth/link-accounts?email=${encodeURIComponent(email)}`);
    } else {
      router.push("/login?error=unknown");
    }
  }, [error, email]);

  return <div>Redirigiendo...</div>;
}