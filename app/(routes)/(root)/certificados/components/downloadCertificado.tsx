"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import { Certificado } from "./Certificado";

export function DownloadCertificado({
  name,
  title,
}: {
  name: string;
  title: string;
}) {
  const certRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleDownload = async () => {
    if (!certRef.current) return;

    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      backgroundColor: null,
      removeContainer: true,
      useCORS: true,
      allowTaint: true,
    });

    const link = document.createElement("a");
    link.download = `${title}_${name}_certificado.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      handleDownload();
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <Button variant="outline" onClick={handleClick}>
        Descargar certificado
        <Download className="h-4 w-4 ml-2" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="w-full !max-w-[1180px] overflow-x-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Descarga certificado</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="w-full flex justify-center overflow-x-auto">
                <div className="min-w-[1122px]">
                  <Certificado name={name} title={title} cerRef={certRef} />
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDownload}>
              Descargar certificado
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
