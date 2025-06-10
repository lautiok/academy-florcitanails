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
import { useRef } from "react";
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
  const handleDownload = async () => {
    if (!certRef.current) {
      return;
    }

    const canvas = await html2canvas(certRef.current, {
      scale: 2, 
      backgroundColor: null,
      removeContainer: true,
      useCORS: true, 
      allowTaint: true,
      logging: true,
    });

    const link = document.createElement("a");
    link.download = `${title}_${name}_certificado.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          Descargar certificado
          <Download className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full !max-w-[1170px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Descarga certificado</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <Certificado name={name} title={title} cerRef={certRef} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownload}>
            Descargar certificado
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}