"use client";

import * as React from "react";
import { useState } from "react";
import { Search, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for admin settings
const initialAdminSettings = {
  adminType: {
    superAdmin: true,
  },
  logging: {
    personalActivity: true,
    allActivity: false,
  },
  clients: {
    clientsManagement: true,
    clientsAccess: false,
  },
  operations: {
    financeOperation: true,
    accountsOperation: true,
    clientsOperation: true,
    createUserOperation: false,
  },
};

export default function AdminsPage() {
  const [adminSettings, setAdminSettings] = useState(initialAdminSettings);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSaveSettings = () => {
    console.log("Saving admin settings:", adminSettings);
    // In a real app, this would be an API call to save the settings
  };

  const handleCheckboxChange = (
    section: keyof typeof adminSettings,
    key: string,
    checked: boolean
  ) => {
    setAdminSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: checked,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={handleSaveSettings}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admin Type */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Admin Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="super-admin"
                  checked={adminSettings.adminType.superAdmin}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "adminType",
                      "superAdmin",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="super-admin">Super admin</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logging */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Logging</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="personal-activity"
                  checked={adminSettings.logging.personalActivity}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "logging",
                      "personalActivity",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="personal-activity">Personal Activity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="all-activity"
                  checked={adminSettings.logging.allActivity}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "logging",
                      "allActivity",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="all-activity">All Activity</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clients */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="clients-management"
                  checked={adminSettings.clients.clientsManagement}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "clients",
                      "clientsManagement",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="clients-management">Clients management</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="clients-access"
                  checked={adminSettings.clients.clientsAccess}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "clients",
                      "clientsAccess",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="clients-access">Clients access</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operations */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="finance-operation"
                  checked={adminSettings.operations.financeOperation}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "operations",
                      "financeOperation",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="finance-operation">Finance operation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="accounts-operation"
                  checked={adminSettings.operations.accountsOperation}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "operations",
                      "accountsOperation",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="accounts-operation">Accounts operation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="clients-operation"
                  checked={adminSettings.operations.clientsOperation}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "operations",
                      "clientsOperation",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="clients-operation">Clients operation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="create-user-operation"
                  checked={adminSettings.operations.createUserOperation}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(
                      "operations",
                      "createUserOperation",
                      checked as boolean
                    )
                  }
                />
                <Label htmlFor="create-user-operation">
                  Create user operation
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
