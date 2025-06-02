import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="py-2 px-6 border-y-2 border-[#f4dfe2] bg-white">
        <div className="flex justify-between items-center text-sm text-slate-800">
            <p>2025© FlorcitaNails</p>
            <div className="flex gap-2 items-center">
            <Link href="/privacidad">
                <p className="text-sm text-slate-800">Privacidad</p>
            </Link>
            <Link href="/terminos">
                <p className="text-sm text-slate-800">Términos de uso</p>
            </Link>
        </div>
        </div>
    </footer>
  );
};