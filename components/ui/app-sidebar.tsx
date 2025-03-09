import * as React from "react";
import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/config/constants";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="bg-primary flex items-center justify-center">
        <Image src="/logo.svg" alt="logo" width={100} height={40} />
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-primary text-primary-foreground">
        {ROUTES.map((item) => {
          const hasChildren = item.items && item.items.length > 0;

          if (hasChildren) {
            return (
              <Collapsible
                key={item.title}
                title={item.title}
                defaultOpen
                className="group/collapsible"
              >
                <SidebarGroup>
                  <SidebarGroupLabel
                    asChild
                    className="group/label text-sm text-primary-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <CollapsibleTrigger>
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      {item.title}{" "}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu className="pl-6">
                        {item.items.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild isActive={false}>
                              <Link href={`${item.url}${subItem.url}`}>
                                {subItem.title}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          } else {
            return (
              <SidebarGroup key={item.title}>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={false}>
                      <Link href={item.url} className="flex items-center">
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            );
          }
        })}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="bg-primary text-primary-foreground border-t border-[#ADAEB538]">
        <Button variant="ghost" className="justify-start">
          <LogOut />
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
