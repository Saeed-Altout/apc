"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function SettingsTab() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    inApp: true,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "UTC",
    currency: "USD",
    theme: "system",
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    activityTracking: true,
    dataSharing: false,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      <Alert variant="tertiary">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          Changes to these settings will be applied immediately and may affect
          the user's experience.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Configure how and when the user receives notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={() => handleNotificationChange("email")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on mobile devices
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={notifications.push}
                onCheckedChange={() => handleNotificationChange("push")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive important alerts via SMS
                </p>
              </div>
              <Switch
                id="sms-notifications"
                checked={notifications.sms}
                onCheckedChange={() => handleNotificationChange("sms")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="in-app-notifications">
                  In-App Notifications
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show notifications in the application
                </p>
              </div>
              <Switch
                id="in-app-notifications"
                checked={notifications.inApp}
                onCheckedChange={() => handleNotificationChange("inApp")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize the user's application experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, timezone: value }))
                }
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                  <SelectItem value="CST">Central Time (CST)</SelectItem>
                  <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                  <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={preferences.currency}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, currency: value }))
                }
              >
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">US Dollar ($)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                  <SelectItem value="CNY">Chinese Yuan (¥)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) =>
                  setPreferences((prev) => ({ ...prev, theme: value }))
                }
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System Default</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy & Data</CardTitle>
          <CardDescription>
            Manage privacy settings and data preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <Select
                value={privacy.profileVisibility}
                onValueChange={(value) =>
                  setPrivacy((prev) => ({ ...prev, profileVisibility: value }))
                }
              >
                <SelectTrigger id="profile-visibility">
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="contacts">Contacts Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-x-2">
                  <Label htmlFor="activity-tracking">Activity Tracking</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tracks user activity to improve personalization</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow tracking of user activity for better experience
                </p>
              </div>
              <Switch
                id="activity-tracking"
                checked={privacy.activityTracking}
                onCheckedChange={() =>
                  setPrivacy((prev) => ({
                    ...prev,
                    activityTracking: !prev.activityTracking,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-x-2">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share anonymized data with partners</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow sharing of anonymized usage data with partners
                </p>
              </div>
              <Switch
                id="data-sharing"
                checked={privacy.dataSharing}
                onCheckedChange={() =>
                  setPrivacy((prev) => ({
                    ...prev,
                    dataSharing: !prev.dataSharing,
                  }))
                }
              />
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="data-management">
              <AccordionTrigger>Data Management Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <Button variant="outline" size="sm">
                    Export User Data
                  </Button>
                  <Button variant="outline" size="sm" className="ml-2">
                    Delete All Data
                  </Button>
                  <p className="text-sm text-muted-foreground pt-2">
                    Data deletion is permanent and cannot be undone. All user
                    data will be removed from our systems.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
