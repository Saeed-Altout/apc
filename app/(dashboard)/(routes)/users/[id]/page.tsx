"use client";
import * as React from "react";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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

export default function EditUserPage() {
  const router = useRouter();
  const { id: userId } = useParams();

  const { onOpen } = useModal();
  const { data: user, isLoading: userIsLoading } = useGetUserByIdQuery(
    String(userId)
  );
  const { data: devices, isLoading: devicesIsLoading } = useGetDevicesById(
    String(userId)
  );
  const { data: roles, isLoading: rolesIsLoading } = useGetRolesQuery();
  const { data: accounts, isLoading: accountsIsLoading } = useGetUserAccounts(
    String(userId)
  );
  const isLoading =
    userIsLoading || devicesIsLoading || rolesIsLoading || accountsIsLoading;

  const handleDelete = () => {
    onOpen(ModalType.DELETE_USER, { user: user?.data });
  };

  React.useEffect(() => {
    if (!userId) {
      router.push("/users");
    }
  }, [userId, router]);

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
          disabled={userId === "new"}
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
            <AccountsTab accounts={accounts} />
          </TabsContent>

          <TabsContent value="documentation">
            <DocumentationTab user={user?.data ?? ({} as IUserObject)} />
          </TabsContent>
        </div>
      </Tabs>
    </Wrapper>
  );
}
