"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { ChangePassword } from "./changePassword";

export function ProfileForm({ user }: { user: any }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await axios.put("/api/users", {
        name,
        email,
      });

      toast.success("Perfil actualizado correctamente 🎉");
    } catch (error) {
      toast.error("Error al actualizar el perfil");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md border border-slate-200 mt-6">
      <div className="flex items-center gap-4 mb-6 mt-4">
        <img src={user.image} alt="avatar" className="h-12 w-12 rounded-full" />
        <div>
          <p className="text-sm text-slate-600">Rol:</p>
          <p className="text-sm font-semibold text-slate-800 capitalize">
            {user.role}
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            disabled
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="flex mt-6 gap-2">
          <Button variant="outline" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </form>
      <div className="mt-6">
        <ChangePassword />
      </div>
    </div>
  );
}
