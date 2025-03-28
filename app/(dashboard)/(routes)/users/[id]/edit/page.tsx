"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

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

export default function EditUserPage() {
  const { id: userId } = useParams();

  const router = useRouter();
  const [isActive, setIsActive] = React.useState<boolean>(true);

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    // Implementation for user deletion would go here
    console.log("Delete user:", userId);
  };

  const handleSave = () => {
    // Implementation for saving user changes would go here
    console.log("Save user:", userId);
  };

  React.useEffect(() => {
    if (!userId) {
      router.push("/users");
    }
  }, [userId, router]);

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button variant="outline" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Edit User: {userId}</h1>
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
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
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
            <ProfileTab />
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
