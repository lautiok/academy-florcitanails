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
        width: '100%',
        maxWidth: '1122px',
        aspectRatio: '1122/793', 
        height: 'auto',
        overflow: 'hidden',
        fontFamily: 'sans-serif',
        margin: '0 auto', 
      }}
    >
      <div className="absolute top-[45%] sm:top-[45%] left-0 w-full flex justify-center px-4">
        <h2 className="text-lg sm:text-4xl md:text-[40px] font-semibold tracking-wide leading-none text-center">
          {name}
        </h2>
      </div>
      <div className="absolute top-[55%] sm:top-[56%] left-0 w-full flex justify-center px-4">
        <p className="text-sm sm:text-base md:text-lg font-normal text-center tracking-wide max-w-[90%] sm:max-w-[900px]">
          Ha realizado y completado con éxito su curso de uñas
          <span className="font-semibold"> {title}</span>.
        </p>
      </div>
      <div className="absolute top-[70%] sm:top-[75%] left-0 w-full flex justify-center">
        <p className="text-sm sm:text-base md:text-lg">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}