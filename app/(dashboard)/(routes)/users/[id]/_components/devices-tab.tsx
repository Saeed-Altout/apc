"use client";

import {
  Laptop,
  Smartphone,
  Tablet,
  Plus,
  Trash,
  ArrowUpRight,
} from "lucide-react";
import { format } from "date-fns";

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

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { SetMainDeviceModal } from "./set-main-device-modal";
import { DeleteDeviceModal } from "./delete-device-modal";

export function DevicesTab({ devices }: { devices: IDevice[] }) {
  const { onOpen } = useModal();

  const mainDevice = devices?.find((device) => device.is_main);
  const otherDevices = devices?.filter((device) => !device.is_main);

  return (
    <>
      <div className="space-y-6">
        {mainDevice && (
          <div>
            <h4 className="text-sm font-medium mb-2">Main Device</h4>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getDeviceIcon("mobile")}
                    <CardTitle className="text-base">
                      {mainDevice.deviceName}
                    </CardTitle>
                  </div>
                  <Badge variant="success">Main</Badge>
                </div>
                <CardDescription>
                  Last active: {format(mainDevice.timeUpdated, "MMM dd, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">ID:</span>{" "}
                    {mainDevice.deviceId}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    onOpen(ModalType.DELETE_DEVICE, { device: mainDevice })
                  }
                >
                  <Trash /> Delete
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {otherDevices && otherDevices.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Other Devices</h4>
            <div className="space-y-3">
              {otherDevices.map((device) => (
                <Card key={device.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon("mobile")}
                        <CardTitle className="text-base">
                          {device.deviceName}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription>
                      Last active: {format(device.timeUpdated, "MMM dd, yyyy")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">ID:</span>{" "}
                        {device.deviceId}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onOpen(ModalType.SET_MAIN_DEVICE, { device })
                      }
                    >
                      <ArrowUpRight /> Set as Main
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        onOpen(ModalType.DELETE_DEVICE, { device })
                      }
                    >
                      <Trash /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {devices && devices.length === 0 && (
          <Card className="flex flex-col items-center justify-center p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Laptop className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No Devices</h3>
            <p className="mb-4 mt-2 text-center text-sm text-muted-foreground">
              This user doesn't have any registered devices yet.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Device
            </Button>
          </Card>
        )}
      </div>
      <DeleteDeviceModal />
      <SetMainDeviceModal />
    </>
  );
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "mobile":
      return <Smartphone className="h-5 w-5" />;
    case "tablet":
      return <Tablet className="h-5 w-5" />;
    case "desktop":
      return <Laptop className="h-5 w-5" />;
    default:
      return <Smartphone className="h-5 w-5" />;
  }
};
