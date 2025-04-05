"use client";
import * as React from "react";
import Image from "next/image";

import { useParams, useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";
import { PhoneInput } from "react-international-phone";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Spinner } from "@/components/ui/spinner";

import { ROLES } from "@/config/constants";
import { useUpdateUserMutation } from "@/services/users/users-hook";
import { cn, getImageUrl, getRoleId, getRoleName } from "@/lib/utils";

export const FormSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phonenumber: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters" }),
  roleId: z.string({ required_error: "Role is required" }),
  addressLine: z
    .string()
    .min(5, { message: "Address line must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  avatar: z.any().nullable(),
  idCardFace: z.any().nullable(),
  idCardBack: z.any().nullable(),
  addressProof: z.any().nullable(),
});

export function ProfileTab({ user }: { user: IUserObject }) {
  const { id: userId } = useParams();
  const router = useRouter();
  const { mutateAsync: updateUser, isPending } = useUpdateUserMutation({
    id: String(userId),
  });

  // Store the initial form values for comparison
  const initialValues = React.useMemo(
    () => ({
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      state: user.user.address.state || "",
      country: user.user.address.country || "",
      city: user.user.address.city || "",
      addressLine: user.user.address.addressLine || "",
      email: user.email || "",
      phonenumber: user.user.phoneNumber || "",
      roleId: getRoleId(user.user.role) || "",
      avatar: user.avatar || "",
      idCardFace: user.user.idCardFace.link || "",
      idCardBack: user.user.idCardBack.link || "",
      addressProof: user.user.address.addressProof.link || "",
    }),
    [user]
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  const formValues = form.watch();

  React.useEffect(() => {
    const changedFields = Object.keys(formValues).filter((key) => {
      if (
        ["avatar", "idCardFace", "idCardBack", "addressProof"].includes(key)
      ) {
        return false;
      }
      return (
        formValues[key as keyof typeof formValues] !==
        initialValues[key as keyof typeof initialValues]
      );
    });

    if (changedFields.length > 0) {
      const changes = changedFields.reduce((acc, key) => {
        acc[key] = {
          from: initialValues[key as keyof typeof initialValues],
          to: formValues[key as keyof typeof formValues],
        };
        return acc;
      }, {} as Record<string, { from: any; to: any }>);

      console.log("Form changes:", changes);
    }
  }, [formValues, initialValues]);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const changedValues = Object.keys(values).reduce((acc, key) => {
      const k = key as keyof typeof values;

      if (
        ["avatar", "idCardFace", "idCardBack", "addressProof"].includes(key)
      ) {
        if (values[k] && values[k] instanceof File) {
          acc[k] = values[k];
        }
      } else if (values[k] !== initialValues[k as keyof typeof initialValues]) {
        acc[k] = values[k];
      }

      return acc;
    }, {} as Record<string, any>);

    const formData = {
      ...changedValues,
      roleId: changedValues.roleId
        ? getRoleId(changedValues.roleId)
        : undefined,
      ...(userId !== "new" && { id: userId }),
    };

    try {
      // Remove any undefined values from the formData object
      const cleanedFormData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== undefined)
      );
      await updateUser(cleanedFormData);
      form.reset();
      router.push("/users");
    } catch (error) {}
  }

  return (
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="avatar"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "relative h-40 border-2 border-dashed rounded-md overflow-hidden flex items-center justify-center hover:border-solid hover:border-primary transition-colors cursor-pointer",
                          value && "!border-none"
                        )}
                      >
                        {value && getImageUrl(value) ? (
                          <Image
                            src={getImageUrl(value)}
                            alt="image"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                            <ImagePlus className="w-6 h-6" />
                            <span className="text-xs">Upload Image</span>
                          </div>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isPending}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                            if (file) {
                              console.log("File changed:", {
                                field: "avatar",
                                from: initialValues.avatar,
                                to: "New file uploaded",
                              });
                            }
                          }}
                          className="sr-only"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idCardFace"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "relative h-40 border-2 border-dashed rounded-md overflow-hidden flex items-center justify-center hover:border-solid hover:border-primary transition-colors cursor-pointer",
                          value && "!border-none"
                        )}
                      >
                        {value && getImageUrl(value) ? (
                          <Image
                            src={getImageUrl(value)}
                            alt="image"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                            <ImagePlus className="w-6 h-6" />
                            <span className="text-xs">ID Card (face)</span>
                          </div>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isPending}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                            if (file) {
                              console.log("File changed:", {
                                field: "idCardFace",
                                from: initialValues.idCardFace,
                                to: "New file uploaded",
                              });
                            }
                          }}
                          className="sr-only"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idCardBack"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "relative h-40 border-2 border-dashed rounded-md overflow-hidden flex items-center justify-center hover:border-solid hover:border-primary transition-colors cursor-pointer",
                          value && "!border-none"
                        )}
                      >
                        {value && getImageUrl(value) ? (
                          <Image
                            src={getImageUrl(value)}
                            alt="image"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                            <ImagePlus className="w-6 h-6" />
                            <span className="text-xs">ID Card (back)</span>
                          </div>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isPending}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                            if (file) {
                              console.log("File changed:", {
                                field: "idCardBack",
                                from: initialValues.idCardBack,
                                to: "New file uploaded",
                              });
                            }
                          }}
                          className="sr-only"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="addressProof"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "relative h-40 border-2 border-dashed rounded-md overflow-hidden flex items-center justify-center hover:border-solid hover:border-primary transition-colors cursor-pointer",
                          value && "!border-none"
                        )}
                      >
                        {value && getImageUrl(value) ? (
                          <Image
                            src={getImageUrl(value)}
                            alt="image"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-muted-foreground gap-2">
                            <ImagePlus className="w-6 h-6" />
                            <span className="text-xs">Address Proof</span>
                          </div>
                        )}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          disabled={isPending}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            onChange(file);
                            if (file) {
                              console.log("File changed:", {
                                field: "addressProof",
                                from: initialValues.addressProof,
                                to: "New file uploaded",
                              });
                            }
                          }}
                          className="sr-only"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        className="react-international-phone-input-container"
                        defaultCountry="ae"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="United States"
                        disabled={isPending}
                        {...field}
                      />
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
                      <Input
                        placeholder="California"
                        disabled={isPending}
                        {...field}
                      />
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
                      <Input
                        placeholder="San Francisco"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, Apt 4B"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (value !== initialValues.roleId) {
                          console.log("Role changed:", {
                            from: getRoleName(initialValues.roleId),
                            to: getRoleName(value),
                          });
                        }
                      }}
                      defaultValue={field.value}
                      value={field.value}
                      disabled={isPending}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role">
                            {field.value
                              ? getRoleName(field.value)
                              : "Select a role"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {userId === "new" ? "Create" : "Save Changes"}
            {isPending && <Spinner variant="circle" className="ml-2" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
