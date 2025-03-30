"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Laptop, Smartphone, Tablet, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data for devices
const mockDevices = [
  {
    id: "device-1",
    name: "iPhone 13 Pro",
    type: "mobile",
    lastActive: "2023-03-15T14:30:00",
    ipAddress: "192.168.1.101",
    location: "New York, USA",
    browser: "Safari",
    os: "iOS 15.4",
    isMain: true,
  },
  {
    id: "device-2",
    name: "MacBook Pro",
    type: "desktop",
    lastActive: "2023-03-20T09:45:00",
    ipAddress: "192.168.1.102",
    location: "New York, USA",
    browser: "Chrome",
    os: "macOS 12.3",
    isMain: false,
  },
  {
    id: "device-3",
    name: "iPad Air",
    type: "tablet",
    lastActive: "2023-03-10T18:20:00",
    ipAddress: "192.168.1.103",
    location: "Boston, USA",
    browser: "Safari",
    os: "iPadOS 15.3",
    isMain: false,
  },
];

export function DevicesTab() {
  const [devices, setDevices] = useState(mockDevices);
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "mobile",
    ipAddress: "",
  });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      case "desktop":
      default:
        return <Laptop className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDeleteDevice = (deviceId: string) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setDevices(devices.filter((device) => device.id !== deviceId));
      setDeleteConfirmOpen(null);
      setLoading(false);
      toast.success("Device removed successfully");
    }, 1000);
  };

  const handleSetMainDevice = (deviceId: string) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setDevices(
        devices.map((device) => ({
          ...device,
          isMain: device.id === deviceId,
        }))
      );
      setLoading(false);
      toast.success("Main device updated");
    }, 1000);
  };

  const handleAddDevice = () => {
    setLoading(true);

    // Simple validation
    if (!newDevice.name || !newDevice.type || !newDevice.ipAddress) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newDeviceData = {
        id: `device-${Date.now()}`,
        name: newDevice.name,
        type: newDevice.type,
        lastActive: new Date().toISOString(),
        ipAddress: newDevice.ipAddress,
        location: "Unknown",
        browser: "Unknown",
        os: "Unknown",
        isMain: devices.length === 0 ? true : false,
      };

      setDevices([...devices, newDeviceData]);
      setIsAddDeviceOpen(false);
      setNewDevice({
        name: "",
        type: "mobile",
        ipAddress: "",
      });
      setLoading(false);
      toast.success("Device added successfully");
    }, 1000);
  };

  const mainDevice = devices.find((device) => device.isMain);
  const otherDevices = devices.filter((device) => !device.isMain);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Devices</h3>
        <Dialog open={isAddDeviceOpen} onOpenChange={setIsAddDeviceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Device</DialogTitle>
              <DialogDescription>
                Add a new device to this user account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Device Name</Label>
                <Input
                  id="name"
                  placeholder="iPhone 14"
                  value={newDevice.name}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Device Type</Label>
                <Select
                  value={newDevice.type}
                  onValueChange={(value) =>
                    setNewDevice({ ...newDevice, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile">Mobile</SelectItem>
                    <SelectItem value="tablet">Tablet</SelectItem>
                    <SelectItem value="desktop">Desktop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ipAddress">IP Address</Label>
                <Input
                  id="ipAddress"
                  placeholder="192.168.1.1"
                  value={newDevice.ipAddress}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, ipAddress: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDeviceOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddDevice} disabled={loading}>
                {loading ? "Adding..." : "Add Device"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {mainDevice && (
        <div>
          <h4 className="text-sm font-medium mb-2">Main Device</h4>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getDeviceIcon(mainDevice.type)}
                  <CardTitle className="text-base">{mainDevice.name}</CardTitle>
                </div>
                <Badge variant="success">Main</Badge>
              </div>
              <CardDescription>
                Last active: {formatDate(mainDevice.lastActive)}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">IP Address:</span>{" "}
                  {mainDevice.ipAddress}
                </div>
                <div>
                  <span className="text-muted-foreground">Location:</span>{" "}
                  {mainDevice.location}
                </div>
                <div>
                  <span className="text-muted-foreground">Browser:</span>{" "}
                  {mainDevice.browser}
                </div>
                <div>
                  <span className="text-muted-foreground">OS:</span>{" "}
                  {mainDevice.os}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog
                open={deleteConfirmOpen === mainDevice.id}
                onOpenChange={(open) => !open && setDeleteConfirmOpen(null)}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto"
                    onClick={() => setDeleteConfirmOpen(mainDevice.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Remove Main Device</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove the main device? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setDeleteConfirmOpen(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteDevice(mainDevice.id)}
                      disabled={loading}
                    >
                      {loading ? "Removing..." : "Remove"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>
      )}

      {otherDevices.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Other Devices</h4>
          <div className="space-y-3">
            {otherDevices.map((device) => (
              <Card key={device.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getDeviceIcon(device.type)}
                      <CardTitle className="text-base">{device.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription>
                    Last active: {formatDate(device.lastActive)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">IP Address:</span>{" "}
                      {device.ipAddress}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Location:</span>{" "}
                      {device.location}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Browser:</span>{" "}
                      {device.browser}
                    </div>
                    <div>
                      <span className="text-muted-foreground">OS:</span>{" "}
                      {device.os}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSetMainDevice(device.id)}
                    disabled={loading}
                  >
                    Set as Main
                  </Button>
                  <Dialog
                    open={deleteConfirmOpen === device.id}
                    onOpenChange={(open) => !open && setDeleteConfirmOpen(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="ml-2"
                        onClick={() => setDeleteConfirmOpen(device.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Remove Device</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to remove this device? This
                          action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setDeleteConfirmOpen(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteDevice(device.id)}
                          disabled={loading}
                        >
                          {loading ? "Removing..." : "Remove"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {devices.length === 0 && (
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Laptop className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No Devices</h3>
          <p className="mb-4 mt-2 text-center text-sm text-muted-foreground">
            This user doesn't have any registered devices yet.
          </p>
          <Button onClick={() => setIsAddDeviceOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Device
          </Button>
        </Card>
      )}
    </div>
  );
}
