"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileTab } from "./_components/profile-tab";
import { AccountsTab } from "./_components/accounts-tab";
import { DocumentsTab } from "./_components/documents-tab";
import { SettingsTab } from "./_components/settings-tab";
import { DevicesTab } from "./_components/devices-tab";
import { useDeleteUser, useGetUserById } from "@/services/users/users-hook";
import { EUserStatus } from "@/enums/user-status";

export default function EditUserPage() {
  const { id: userId } = useParams();
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { data: user, isLoading, isSuccess } = useGetUserById(String(userId));

  const router = useRouter();
  const [isActive, setIsActive] = React.useState<boolean>(
    user?.data.user.status === EUserStatus.ACTIVE
  );

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    deleteUser(String(userId));
  };

  const handleSave = () => {
    console.log("Save user:", userId);
  };

  React.useEffect(() => {
    if (!userId) {
      router.push("/users");
    }
  }, [userId, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>User not found</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">
            Edit User{" "}
            <Badge variant="outline" className="ml-2">
              {user.data.user.status}
            </Badge>
          </h1>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-4 mr-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="user-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="user-active">Account status:</Label>
            </div>
            <Badge variant={isActive ? "success" : "destructive"}>
              {isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={userId === "new"}
          >
            Delete
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="profile">
            <ProfileTab user={user.data} />
          </TabsContent>

          <TabsContent value="devices">
            <DevicesTab />
          </TabsContent>

          <TabsContent value="accounts">
            <AccountsTab />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
