import React from "react";
import Image from "next/image";
import { IdCard, ImageIcon } from "lucide-react";

import { cn, getImageUrl } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

export const DocumentationTab = ({ user }: { user: IUserObject }) => {
  const [idFaceLoaded, setIdFaceLoaded] = React.useState(false);
  const [idBackLoaded, setIdBackLoaded] = React.useState(false);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Customer ID</h2>
        <div className="flex items-center justify-start gap-6">
          <div className="flex items-center justify-start gap-3">
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl w-24 h-24 border-2 border-dashed border-primary overflow-hidden",
                user.user?.idCardFace?.link && "border-none"
              )}
            >
              {!user.user?.idCardFace?.link ? (
                <ImageIcon
                  className="h-12 w-12 text-primary/80"
                  strokeWidth={0.5}
                />
              ) : (
                <>
                  <Image
                    fill
                    src={getImageUrl(user.user.idCardFace.link)}
                    alt={`${user.firstname} ${user.lastname} ID Card`}
                    className={cn(
                      "object-cover w-full h-full",
                      !idFaceLoaded && "blur-sm"
                    )}
                    onLoadingComplete={() => setIdFaceLoaded(true)}
                  />
                  {!idFaceLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Spinner variant="circle" />
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="text-sm font-medium text-primary capitalize">
              Image of the first side
            </p>
          </div>
          <Separator orientation="vertical" className="!h-24 bg-primary" />
          <div className="flex items-center justify-start gap-3">
            <div
              className={cn(
                "relative flex items-center justify-center rounded-xl w-24 h-24 border-2 border-dashed border-primary overflow-hidden",
                user.user?.idCardBack?.link && "border-none"
              )}
            >
              {!user.user?.idCardBack?.link ? (
                <ImageIcon
                  className="h-12 w-12 text-primary/80"
                  strokeWidth={0.5}
                />
              ) : (
                <>
                  <Image
                    fill
                    src={getImageUrl(user.user.idCardBack.link)}
                    alt={`${user.firstname} ${user.lastname} ID Card`}
                    className={cn(
                      "object-cover w-full h-full",
                      !idBackLoaded && "blur-sm"
                    )}
                    onLoadingComplete={() => setIdBackLoaded(true)}
                  />
                  {!idBackLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Spinner variant="circle" />
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="text-sm font-medium text-primary capitalize">
              Image of the second side
            </p>
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Personal Information</h2>
        <div className="flex items-center justify-start gap-3">
          <IdCard className="h-12 w-12 text-primary" strokeWidth={0.5} />
          <p className="text-sm font-medium text-primary capitalize">
            {user.user?.address?.addressLine} {user.user?.address?.city},{" "}
            {user.user?.address?.state} {user.user?.address?.country}
          </p>
        </div>
      </div>
    </div>
  );
};
