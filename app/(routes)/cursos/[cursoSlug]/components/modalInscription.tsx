"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormIncription } from "./formInscription";
import { Chapter, Course } from "@prisma/client";


export const ModalInscription = ({
     data,
      slug,
    }: {
      data: Course & { chapters: Chapter[] };
      slug: string;
}) => {
  return (
    <Dialog>
          <DialogTrigger asChild>
            <Button
            variant="outline"
            size="sm"
          >
            Inscribite ahora
          </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Inscribite ahora</DialogTitle>
              <DialogDescription>
                En brevedad nos pondremos en contacto contigo para conocer mas
                detalles del curso {data.title}
              </DialogDescription>
                <FormIncription  data={data} slug={slug} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
  );
};
