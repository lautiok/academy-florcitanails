import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormChangePassword } from "./formChangePassword";

export const ChangePassword = () => {
  
  return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" type="button" >
                Cambiar contraseña
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cambiar contraseña</DialogTitle>
                <FormChangePassword />
            </DialogHeader>
          </DialogContent>
        </Dialog>
  );
};
