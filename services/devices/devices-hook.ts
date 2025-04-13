import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DevicesService } from "./devices-service";

export const useGetAllDevices = () => {
  return useQuery({
    queryKey: ["devices"],
    queryFn: () => DevicesService.getAll(),
  });
};

export const useGetDevicesById = (id: string) => {
  return useQuery({
    queryKey: ["device", id],
    queryFn: () => DevicesService.getAllById(id),
  });
};

export const useSetMainDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["set-main-device"],
    mutationFn: (id: string) => DevicesService.setMain(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};

export const useDeleteDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-device"],
    mutationFn: (id: string) => DevicesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};

export const useAcceptDevice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["accept-device"],
    mutationFn: (id: string) => DevicesService.accept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["devices"] });
    },
  });
};
