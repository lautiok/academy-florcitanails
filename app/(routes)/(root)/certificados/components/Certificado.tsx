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
    width: '1122px',
    height: '793px',
    overflow: 'hidden',
    fontFamily: 'sans-serif',
  }}
    >
      <div className="absolute top-[45%] left-0 w-full flex justify-center">
        <h2 className="text-[40px] font-semibold tracking-wide leading-none">
          {name}
        </h2>
      </div>
      <div className="absolute top-[55%] left-0 w-full flex justify-center">
        <p className="text-lg font-normal text-center tracking-wide max-w-[900px]">
          Ha realizado y completado con éxito su curso de uñas
          <span className="font-semibold"> {title}</span>.
        </p>
      </div>
      <div className="absolute top-[75%] left-0 w-full flex justify-center">
        <p className="text-lg">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
