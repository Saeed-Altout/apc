"use client";
import * as React from "react";
import { Plus, Trash2, Upload } from "lucide-react";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  state: z.string().min(1, {
    message: "State is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  telegramHandles: z.array(
    z.object({
      value: z.string().startsWith("@", {
        message: "Telegram handle must start with @",
      }),
    })
  ),
  addresses: z.array(
    z.object({
      value: z.string().min(5, {
        message: "Address must be at least 5 characters.",
      }),
    })
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  country: "",
  state: "",
  city: "",
  telegramHandles: [{ value: "@" }],
  addresses: [{ value: "" }],
};

export function ProfileTab() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = React.useState<string>(
    "/placeholder-avatar.jpg"
  );
  const [uploadingAvatar, setUploadingAvatar] = React.useState<boolean>(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const {
    fields: telegramFields,
    append: appendTelegram,
    remove: removeTelegram,
  } = useFieldArray({
    control: form.control,
    name: "telegramHandles",
  });

  const {
    fields: addressFields,
    append: appendAddress,
    remove: removeAddress,
  } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    // Here you would typically save the data to the backend
    console.log(data);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size exceeds 2MB limit");
      return;
    }

    // Check file type
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      toast.error("Only JPG, PNG, and GIF formats are allowed");
      return;
    }

    setUploadingAvatar(true);

    // Create a URL for the file
    const reader = new FileReader();
    reader.onload = (e) => {
      // In a real app, you would upload the file to your server/storage here
      // Simulate upload delay
      setTimeout(() => {
        setAvatarUrl(e.target?.result as string);
        setUploadingAvatar(false);
        toast.success("Avatar uploaded successfully");
      }, 1000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-x-4">
        <Avatar className="h-24 w-24 relative">
          {uploadingAvatar && (
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
              <Spinner variant="circle" size="sm" className="text-white" />
            </div>
          )}
          <AvatarImage src={avatarUrl} alt="User avatar" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleAvatarChange}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleAvatarClick}
            disabled={uploadingAvatar}
          >
            {uploadingAvatar ? (
              <>
                Uploading{" "}
                <Spinner variant="circle" size="sm" className="ml-2" />
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload avatar
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            JPG, GIF or PNG. Max size of 2MB.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update the user's basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="California" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Telegram Handles</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendTelegram({ value: "@" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Telegram
                  </Button>
                </div>
                {telegramFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-x-2">
                    <FormField
                      control={form.control}
                      name={`telegramHandles.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="@username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeTelegram(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FormLabel>Addresses</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendAddress({ value: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Address
                  </Button>
                </div>
                {addressFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-x-2">
                    <FormField
                      control={form.control}
                      name={`addresses.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                              placeholder="123 Main St, Apt 4B"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeAddress(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Save Changes {isLoading && <Spinner variant="circle" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
