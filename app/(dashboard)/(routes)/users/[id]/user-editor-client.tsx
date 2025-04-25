"use client";
import * as React from "react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/ui/wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileTab } from "./_components/profile-tab";
import { AccountsTab } from "./_components/accounts-tab";
import { DocumentationTab } from "./_components/documentation-tab";
import { DevicesTab } from "./_components/devices-tab";

import { ModalType } from "@/config/enums";
import { useModal } from "@/hooks/use-modal";

import { useGetUserByIdQuery } from "@/services/users/users-hook";
import { useGetDevicesById } from "@/services/devices/devices-hook";
import { useGetRolesQuery } from "@/services/roles/roles-hook";
import { useGetUserAccounts } from "@/services/accounts/accounts-hook";
import { Account } from "@/schemas/account";

export default function UserEditorClient({ id }: { id: string }) {
  const router = useRouter();

  const { onOpen } = useModal();
  const { data: user, isLoading: userIsLoading } = useGetUserByIdQuery(
    String(id)
  );
  const { data: devices, isLoading: devicesIsLoading } = useGetDevicesById(
    String(id)
  );
  const { data: roles, isLoading: rolesIsLoading } = useGetRolesQuery();
  const { data: accounts, isLoading: accountsIsLoading } = useGetUserAccounts(
    String(id)
  );
  const isLoading =
    userIsLoading || devicesIsLoading || rolesIsLoading || accountsIsLoading;

  const handleDelete = () => {
    onOpen(ModalType.DELETE_USER, { user: user?.data });
  };

  React.useEffect(() => {
    if (!id) {
      router.push("/users");
    }
  }, [id, router]);

  return (
    <Wrapper
      title="Edit User"
      description="Edit the user's profile"
      redirectTo="/users"
      isLoading={isLoading}
      actions={
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={id === "new"}
          size="sm"
        >
          <Trash className="w-4 h-4" />
          Delete
        </Button>
      }
    >
      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <ProfileTab
              user={user?.data ?? ({} as IUserObject)}
              roles={roles?.data ?? []}
            />
          </TabsContent>

          <TabsContent value="devices">
            <DevicesTab devices={devices?.data ?? []} />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountsTab
              accounts={accounts?.data ? (accounts.data as Account[]) : []}
            />
          </TabsContent>

          <TabsContent value="documentation">
            <DocumentationTab user={user?.data ?? ({} as IUserObject)} />
          </TabsContent>
        </div>
      </Tabs>
    </Wrapper>
  );
}
