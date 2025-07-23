"use client";
import { Ref } from "react";

export function Certificado({
  name,
  title,
  cerRef,
}: {
  name: string;
  title: string;
  cerRef: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={cerRef}
      id="certificado"
      className="relative bg-[url('/certificado.png')] bg-cover bg-center text-[#000] shadow-xl"
      style={{
        width: "100%",
        maxWidth: "1122px",
        aspectRatio: "1122/793",
        height: "auto",
        overflow: "hidden",
        fontFamily: "sans-serif",
        margin: "0 auto",
      }}
    >
      {/* Logo */}
      <div className="absolute top-[4%] md:top-[8%] left-0 w-full flex justify-center px-4">
        <img
          src="/logo-certificado.png"
          alt="logo"
          className="w-[150px] md:w-[180px]"
        />
      </div>

      {/* Texto: Otorga el certificado */}
      <div className="absolute top-[35%] md:top-[30%] left-0 w-full flex justify-center px-4">
        <h1 className="text-[20px] sm:text-4xl md:text-[36px] lg:text-[40px] tracking-wide leading-none text-center">
          Otorga el certificado a{" "}
        </h1>
      </div>

      {/* Nombre del alumno */}
      <div className="absolute top-[47%] md:top-[40%] left-0 w-full flex justify-center px-4">
        <h2 className="text-[15px] sm:text-4xl md:text-[36px] lg:text-[40px] font-semibold tracking-wide leading-none text-center">
          {name}
        </h2>
      </div>

      {/* Descripción del curso */}
      <div className="absolute top-[55%] md:top-[50%] left-0 w-full flex justify-center px-4">
        <p className="text-[10px] sm:text-base md:text-lg lg:text-xl font-normal text-center tracking-wide">
          Completó con éxito el curso de uñas{" "}
          <span className="font-semibold">{title}</span>.
        </p>
      </div>

      {/* Fecha */}
      <div className="absolute top-[70%] md:top-[68%] left-0 w-full flex justify-center">
        <p className="text-[10px] sm:text-base md:text-lg lg:text-xl">
          {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Firma */}
      <div className="absolute top-[85%] md:top-[75%] left-6 md:left-0 w-full flex flex-col justify-center px-4">
        <p className="text-[8px] sm:text-base md:text-lg lg:text-xl font-bold text-center tracking-wide max-w-[90%] sm:max-w-[900px]">
          Florencia Valles
        </p>
        <p className="text-[6px] sm:text-base md:text-lg lg:text-xl font-normal text-center tracking-wide max-w-[90%] sm:max-w-[900px]">
          Manicurista y fundadora de Florcitanails
        </p>
      </div>
    </div>
  );
}
