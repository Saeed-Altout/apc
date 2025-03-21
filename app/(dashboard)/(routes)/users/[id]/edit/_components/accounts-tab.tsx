"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CircleCheck, CircleX, ExternalLink, Plus, Wallet } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface LinkedAccount {
  id: string;
  provider: string;
  email: string;
  connected: boolean;
  lastUsed: string;
}

interface WalletInfo {
  address: string;
  balance: string;
  network: string;
  status: "active" | "pending" | "inactive";
}

export function AccountsTab() {
  const [linkedAccounts, setLinkedAccounts] = React.useState<LinkedAccount[]>([
    {
      id: "1",
      provider: "Google",
      email: "john.doe@gmail.com",
      connected: true,
      lastUsed: "2 days ago",
    },
    {
      id: "2",
      provider: "Github",
      email: "johndoe",
      connected: true,
      lastUsed: "1 week ago",
    },
    {
      id: "3",
      provider: "Microsoft",
      email: "john.doe@outlook.com",
      connected: false,
      lastUsed: "Never",
    },
  ]);

  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [isLoadingWallet, setIsLoadingWallet] = React.useState(false);
  const [walletInfo, setWalletInfo] = React.useState<WalletInfo>({
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    balance: "0.0425 ETH",
    network: "Ethereum Mainnet",
    status: "active",
  });

  const toggleAccountConnection = (id: string) => {
    setLinkedAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === id
          ? { ...account, connected: !account.connected }
          : account
      )
    );
  };

  const refreshWalletInfo = () => {
    setIsLoadingWallet(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoadingWallet(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
          <CardDescription>
            Manage your connected third-party accounts and services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {linkedAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-2 rounded-lg border"
              >
                <div className="flex items-center gap-x-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100">
                    {account.provider.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{account.provider}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <Badge variant={account.connected ? "success" : "secondary"}>
                    {account.connected ? "Connected" : "Disconnected"}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Last used: {account.lastUsed}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleAccountConnection(account.id)}
                  >
                    {account.connected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Connect new account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
          <CardDescription>
            Manage your account security settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="two-factor">Two-factor authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              id="two-factor"
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive security alerts and notifications via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Recent login activity</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm p-2 rounded-lg border">
                <div>
                  <p className="font-medium">Windows PC - Chrome</p>
                  <p className="text-xs text-muted-foreground">
                    New York, USA - 192.168.1.1
                  </p>
                </div>
                <div className="flex items-center">
                  <CircleCheck className="h-4 w-4 text-success mr-2" />
                  <span>Just now</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm p-2 rounded-lg border">
                <div>
                  <p className="font-medium">iPhone 13 - Safari</p>
                  <p className="text-xs text-muted-foreground">
                    Los Angeles, USA - 192.168.2.2
                  </p>
                </div>
                <div className="flex items-center">
                  <CircleCheck className="h-4 w-4 text-success mr-2" />
                  <span>Yesterday</span>
                </div>
              </div>

              <Button variant="link" size="sm" className="mt-2 px-0">
                View all login activity
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wallet Information</CardTitle>
          <CardDescription>
            Manage your connected blockchain wallet and transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-x-3">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-x-2">
                    <p className="font-medium">Ethereum Wallet</p>
                    <Badge
                      variant={
                        walletInfo.status === "active" ? "success" : "secondary"
                      }
                    >
                      {walletInfo.status === "active"
                        ? "Active"
                        : walletInfo.status === "pending"
                        ? "Pending"
                        : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[300px]">
                    {walletInfo.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-medium">{walletInfo.balance}</p>
                <p className="text-xs text-muted-foreground">
                  {walletInfo.network}
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={refreshWalletInfo}
                disabled={isLoadingWallet}
              >
                {isLoadingWallet ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Refreshing...
                  </>
                ) : (
                  "Refresh Balance"
                )}
              </Button>
              <Button variant="outline" size="sm">
                View Transactions
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
