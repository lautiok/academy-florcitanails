'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type AuthErrorCode = 
  | 'Configuration'
  | 'AccessDenied' 
  | 'Verification'
  | 'OAuthAccountNotLinked'
  | 'EmailSignIn'
  | 'CredentialsSignin'
  | 'SessionRequired'
  | 'Default'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as AuthErrorCode | null
  
  return (
    <div className="error-page">
      <h1>Error de autenticación</h1>
      {error && <p className="error-message">{getErrorDescription(error)}</p>}
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ErrorContent />
    </Suspense>
  )
}

function getErrorDescription(errorCode: AuthErrorCode): string {
  const errors: Record<AuthErrorCode, string> = {
    Configuration: "Hay un problema con la configuración del servidor",
    AccessDenied: "No tienes permiso para acceder",
    Verification: "El token de verificación ha expirado o es inválido",
    OAuthAccountNotLinked: "Esta cuenta no está vinculada a un usuario existente",
    EmailSignIn: "Falló el envío del correo de verificación",
    CredentialsSignin: "Credenciales inválidas",
    SessionRequired: "Debes iniciar sesión para acceder a esta página",
    Default: "Ocurrió un error inesperado"
  }
  
  return errors[errorCode] || errors.Default
}