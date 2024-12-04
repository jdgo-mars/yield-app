import { AppSidebar } from "@/components/app-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { AppBreadcrumb } from "@/components/app-breadcumb";

export function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AppBreadcrumb />
          </div>
        </header>
        <ScrollArea>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div>{children}</div>
            <div className="grid auto-rows-min gap-4"></div>
          </div>
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
