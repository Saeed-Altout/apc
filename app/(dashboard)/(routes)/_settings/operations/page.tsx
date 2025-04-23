"use client";

import * as React from "react";
import { useState } from "react";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function OperationsPage() {
  // Finance section settings
  const [depositEnabled, setDepositEnabled] = useState(true);
  const [depositApprovalRequired, setDepositApprovalRequired] = useState(true);
  const [withdrawalEnabled, setWithdrawalEnabled] = useState(false);
  const [withdrawalApprovalRequired, setWithdrawalApprovalRequired] =
    useState(true);

  // Clients section settings
  const [kycEnabled, setKycEnabled] = useState(true);
  const [kycApprovalRequired, setKycApprovalRequired] = useState(true);
  const [personalInfoEnabled, setPersonalInfoEnabled] = useState(false);
  const [personalInfoApprovalRequired, setPersonalInfoApprovalRequired] =
    useState(true);
  const [nameOfOperationsEnabled, setNameOfOperationsEnabled] = useState(false);
  const [
    nameOfOperationsApprovalRequired,
    setNameOfOperationsApprovalRequired,
  ] = useState(true);

  // Accounts section settings
  const [newAccountEnabled, setNewAccountEnabled] = useState(true);
  const [newAccountApprovalRequired, setNewAccountApprovalRequired] =
    useState(true);
  const [newWalletEnabled, setNewWalletEnabled] = useState(false);
  const [newWalletApprovalRequired, setNewWalletApprovalRequired] =
    useState(true);
  const [linkAccountEnabled, setLinkAccountEnabled] = useState(true);
  const [linkAccountApprovalRequired, setLinkAccountApprovalRequired] =
    useState(true);
  const [chargeRequestEnabled, setChargeRequestEnabled] = useState(false);
  const [chargeRequestApprovalRequired, setChargeRequestApprovalRequired] =
    useState(true);

  const handleSave = () => {
    const settings = {
      finance: {
        deposit: {
          enabled: depositEnabled,
          approvalRequired: depositApprovalRequired,
        },
        withdrawal: {
          enabled: withdrawalEnabled,
          approvalRequired: withdrawalApprovalRequired,
        },
      },
      clients: {
        kyc: { enabled: kycEnabled, approvalRequired: kycApprovalRequired },
        personalInfo: {
          enabled: personalInfoEnabled,
          approvalRequired: personalInfoApprovalRequired,
        },
        nameOfOperations: {
          enabled: nameOfOperationsEnabled,
          approvalRequired: nameOfOperationsApprovalRequired,
        },
      },
      accounts: {
        newAccount: {
          enabled: newAccountEnabled,
          approvalRequired: newAccountApprovalRequired,
        },
        newWallet: {
          enabled: newWalletEnabled,
          approvalRequired: newWalletApprovalRequired,
        },
        linkAccount: {
          enabled: linkAccountEnabled,
          approvalRequired: linkAccountApprovalRequired,
        },
        chargeRequest: {
          enabled: chargeRequestEnabled,
          approvalRequired: chargeRequestApprovalRequired,
        },
      },
    };

    console.log("Saving operations settings:", settings);
    // In a real app, this would be an API call to save the settings
  };

  return (
    <div className="space-y-8">
      {/* Finance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Finance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Deposit</CardTitle>
                    <Switch
                      checked={depositEnabled}
                      onCheckedChange={setDepositEnabled}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mt-2">
                    <Label htmlFor="deposit-approval" className="text-sm">
                      Need approval
                    </Label>
                    <Switch
                      id="deposit-approval"
                      checked={depositApprovalRequired}
                      onCheckedChange={setDepositApprovalRequired}
                      disabled={!depositEnabled}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Withdrawal</CardTitle>
                    <Switch
                      checked={withdrawalEnabled}
                      onCheckedChange={setWithdrawalEnabled}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center justify-between mt-2">
                    <Label htmlFor="withdrawal-approval" className="text-sm">
                      Need approval
                    </Label>
                    <Switch
                      id="withdrawal-approval"
                      checked={withdrawalApprovalRequired}
                      onCheckedChange={setWithdrawalApprovalRequired}
                      disabled={!withdrawalEnabled}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clients Section */}
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">KYC</CardTitle>
                  <Switch
                    checked={kycEnabled}
                    onCheckedChange={setKycEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="kyc-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="kyc-approval"
                    checked={kycApprovalRequired}
                    onCheckedChange={setKycApprovalRequired}
                    disabled={!kycEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Personal Info</CardTitle>
                  <Switch
                    checked={personalInfoEnabled}
                    onCheckedChange={setPersonalInfoEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="personal-info-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="personal-info-approval"
                    checked={personalInfoApprovalRequired}
                    onCheckedChange={setPersonalInfoApprovalRequired}
                    disabled={!personalInfoEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Name of Operations
                  </CardTitle>
                  <Switch
                    checked={nameOfOperationsEnabled}
                    onCheckedChange={setNameOfOperationsEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="name-operations-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="name-operations-approval"
                    checked={nameOfOperationsApprovalRequired}
                    onCheckedChange={setNameOfOperationsApprovalRequired}
                    disabled={!nameOfOperationsEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">New Account</CardTitle>
                  <Switch
                    checked={newAccountEnabled}
                    onCheckedChange={setNewAccountEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="new-account-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="new-account-approval"
                    checked={newAccountApprovalRequired}
                    onCheckedChange={setNewAccountApprovalRequired}
                    disabled={!newAccountEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">New Wallet</CardTitle>
                  <Switch
                    checked={newWalletEnabled}
                    onCheckedChange={setNewWalletEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="new-wallet-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="new-wallet-approval"
                    checked={newWalletApprovalRequired}
                    onCheckedChange={setNewWalletApprovalRequired}
                    disabled={!newWalletEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Link Wallet</CardTitle>
                  <Switch
                    checked={linkAccountEnabled}
                    onCheckedChange={setLinkAccountEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="link-wallet-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="link-wallet-approval"
                    checked={linkAccountApprovalRequired}
                    onCheckedChange={setLinkAccountApprovalRequired}
                    disabled={!linkAccountEnabled}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Charge Request</CardTitle>
                  <Switch
                    checked={chargeRequestEnabled}
                    onCheckedChange={setChargeRequestEnabled}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="charge-request-approval" className="text-sm">
                    Need approval
                  </Label>
                  <Switch
                    id="charge-request-approval"
                    checked={chargeRequestApprovalRequired}
                    onCheckedChange={setChargeRequestApprovalRequired}
                    disabled={!chargeRequestEnabled}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
