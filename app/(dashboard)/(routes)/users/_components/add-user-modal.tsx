"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useModal } from "@/hooks/use-modal";
import { ModalType, UserRole, UserStatus } from "@/config/enums";
import { userFormSchema, UserFormValues } from "@/schemas/user";
import { useUsersStore } from "@/services/users/users-store";

export const AddUserModal = () => {
  const { isOpen, type, onClose } = useModal();
  const [loading, setLoading] = React.useState(false);
  const { createUser } = useUsersStore();

  const isModalOpen = isOpen && type === ModalType.ADD_USER;

  // File inputs for ID cards and avatar
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [idCardFace, setIdCardFace] = React.useState<File | null>(null);
  const [idCardBack, setIdCardBack] = React.useState<File | null>(null);
  const [addressProof, setAddressProof] = React.useState<File | null>(null);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
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
    },
  });

  const onSubmit = async (values: UserFormValues) => {
    try {
      setLoading(true);

      // Prepare user data with files if available
      const userData: IAddUserCredentials = {
        ...values,
        avatar: avatar || undefined,
        idCardFace: idCardFace || undefined,
        idCardBack: idCardBack || undefined,
        addressProof: addressProof || undefined,
      };

      // Call createUser from store
      await createUser(userData);

      toast.success("User created successfully!");
      form.reset();

      // Reset file inputs
      setAvatar(null);
      setIdCardFace(null);
      setIdCardBack(null);
      setAddressProof(null);

      onClose();
    } catch (error) {
      toast.error("Failed to create user");
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // File input handlers
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  return (
    <Modal
      title="Add New User"
      description="Create a new user account"
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="John" {...field} />
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
                      <Input disabled={loading} placeholder="Doe" {...field} />
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
                    <Input
                      disabled={loading}
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
                      disabled={loading}
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
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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

            <FormField
              control={form.control}
              name="addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="123 Main St"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
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
                      <Input disabled={loading} placeholder="NY" {...field} />
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
                      <Input disabled={loading} placeholder="USA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>User Avatar</FormLabel>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setAvatar)}
                accept="image/*"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>ID Card (Face)</FormLabel>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setIdCardFace)}
                accept="image/*"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>ID Card (Back)</FormLabel>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setIdCardBack)}
                accept="image/*"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Address Proof</FormLabel>
              <Input
                type="file"
                onChange={(e) => handleFileChange(e, setAddressProof)}
                accept="image/*,application/pdf"
                disabled={loading}
              />
            </div>

            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant="outline"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
