import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormCreateCourse } from "./formCreatecourse";


export const TeacherHeader = () => {
  
  return (
    <header className="my-4 mx-6 border rounded-lg bg-white">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold md:text-2xl">Modo Profesor</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" >
                <Plus />
                crear curso
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>crea tu curso</DialogTitle>
                <FormCreateCourse />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
