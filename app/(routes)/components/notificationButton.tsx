"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { pusherClient } from "@/utils/pusherClients";

type Notification = {
  id: string;
  title: string;
  body: string;
  createdAt?: Date;
};

export function NotificationButton({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const userChannel = pusherClient.subscribe(`user-${userId}`);
    const generalChannel = pusherClient.subscribe("notificaciones");

    userChannel.bind("new-notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    generalChannel.bind("new-notification", (data: Notification) => {
      console.log("Recibido notificación general:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
      pusherClient.unsubscribe("notificaciones");
    };
  }, [userId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              {notifications.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        {notifications.length === 0 ? (
          <DropdownMenuItem disabled>No hay notificaciones</DropdownMenuItem>
        ) : (
          notifications.map((n, idx) => (
            <DropdownMenuItem
              key={idx}
              className="flex flex-col items-start px-4 py-2 hover:bg-muted cursor-pointer"
            >
              <div className="text-sm font-medium text-foreground">
                {n.title}
              </div>
              <div className="text-xs text-muted-foreground">{n.body}</div>
              {n.createdAt && (
                <div className="text-[10px] text-muted-foreground mt-1">
                  {new Date(n.createdAt).toLocaleString("es-AR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
