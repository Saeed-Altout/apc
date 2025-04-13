"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ImagePlus } from "lucide-react";
import { PhoneInput } from "react-international-phone";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { cn } from "@/lib/utils";
import { useAddUserMutation } from "@/services/users/users-hook";
import { Wrapper } from "@/components/ui/wrapper";

const FormSchema = z.object({
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
  avatar: z.instanceof(File).nullable(),
  idCardFace: z.instanceof(File).nullable(),
  idCardBack: z.instanceof(File).nullable(),
  addressProof: z.instanceof(File).nullable(),
});

export default function NewUserPage() {
  const router = useRouter();
  const { mutateAsync: addUser, isPending } = useAddUserMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      state: "",
      country: "",
      city: "",
      addressLine: "",
      email: "",
      phonenumber: "",
      roleId: "",
      avatar: null,
      idCardFace: null,
      idCardBack: null,
      addressProof: null,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      await addUser(values);
      form.reset();
      router.push("/users");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper
      title="New User"
      description="Create a new user"
      redirectTo="/users"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      {value ? (
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="image"
                          fill
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
                      {value ? (
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="image"
                          fill
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
                        accept="image/*,application/pdf"
                        disabled={isPending}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
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
                      {value ? (
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="image"
                          fill
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
                        accept="image/*,application/pdf"
                        disabled={isPending}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
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
                      {value ? (
                        <Image
                          src={URL.createObjectURL(value)}
                          alt="image"
                          fill
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
                        accept="image/*,application/pdf"
                        disabled={isPending}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          onChange(file);
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
                    <Input placeholder="John" disabled={isPending} {...field} />
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
                    <Input placeholder="Doe" disabled={isPending} {...field} />
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Admin</SelectItem>
                      <SelectItem value="2">User</SelectItem>
                      <SelectItem value="3">Manager</SelectItem>
                      <SelectItem value="4">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Create
              {isPending && <Spinner variant="circle" className="ml-2" />}
            </Button>
          </div>
        </form>
      </Form>
    </Wrapper>
  );
}
