import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormIncriptionPurchase } from "./formPurchase";
import { getCourses } from "@/actions/getCourses";
import { getUsers } from "@/actions/getUsers";


export const PresencialesHeader = async () => {
  const curses = await getCourses();

  if (!curses) {
    return <div>No hay cursos</div>;
  }


  const users = await getUsers();

  if (!users) {
    return <div>No hay usuarios</div>;
  }
  
  return (
    <header className="my-4 mx-1 border rounded-lg bg-white">
      <div className="flex justify-between items-center py-4 px-4">
        <h1 className="text-lg font-bold md:text-2xl">Presenciales</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" >
                Registrar Compra
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar Compra</DialogTitle>
                <FormIncriptionPurchase users={users} curses={curses} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};
