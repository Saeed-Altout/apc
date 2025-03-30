"use client";

import * as React from "react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useModal } from "@/hooks/use-modal";
import { ModalType } from "@/config/enums";
import { useAddUser } from "@/services/users/users-hook";

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
  avatar: z.instanceof(File).nullable(),
  idCardFace: z.instanceof(File).nullable(),
  idCardBack: z.instanceof(File).nullable(),
  addressProof: z.instanceof(File).nullable(),
});

export const AddUserModal = () => {
  const { isOpen, type, onClose } = useModal();
  const isModalOpen = isOpen && type === ModalType.ADD_USER;

  const { mutateAsync: addUser, isPending } = useAddUser();

  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [idCardFace, setIdCardFace] = React.useState<File | null>(null);
  const [idCardBack, setIdCardBack] = React.useState<File | null>(null);
  const [addressProof, setAddressProof] = React.useState<File | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      roleId: "",
      addressLine: "",
      city: "",
      country: "",
      state: "",
      avatar: null,
      idCardFace: null,
      idCardBack: null,
      addressProof: null,
    },
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();

    formData.append("phonenumber", values.phonenumber);
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("roleId", values.roleId);
    formData.append("addressLine", values.addressLine);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("state", values.state);

    if (avatar) formData.append("avatar", avatar);
    if (idCardFace) formData.append("idCardFace", idCardFace);
    if (idCardBack) formData.append("idCardBack", idCardBack);
    if (addressProof) formData.append("addressProof", addressProof);

    // Check if all required files are present
    if (!avatar || !idCardFace || !idCardBack || !addressProof) {
      toast.error("All document uploads are required");
      return;
    }

    await addUser(formData);
  };

  return (
    <Modal
      title="Add New User"
      description="Create a new user account"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>User Avatar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, setAvatar)}
                    accept="image/*"
                    disabled={isPending}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>ID Card (Face)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, setIdCardFace)}
                    accept="image/*"
                    disabled={isPending}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>ID Card (Back)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, setIdCardBack)}
                    accept="image/*"
                    disabled={isPending}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Address Proof</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => handleFileChange(e, setAddressProof)}
                    accept="image/*,application/pdf"
                    disabled={isPending}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="John"
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
                        disabled={isPending}
                        placeholder="Doe"
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
                        disabled={isPending}
                        placeholder="john@example.com"
                        type="email"
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
                      <Input
                        disabled={isPending}
                        placeholder="+1234567890"
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
                        disabled={isPending}
                        placeholder="USA"
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
                        disabled={isPending}
                        placeholder="New York"
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
                      <Input disabled={isPending} placeholder="NY" {...field} />
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
                        disabled={isPending}
                        placeholder="123 Main St"
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
                  <FormItem className="col-span-2">
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Admin</SelectItem>
                        <SelectItem value="2">User</SelectItem>
                        <SelectItem value="3">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={isPending}
                variant="outline"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
