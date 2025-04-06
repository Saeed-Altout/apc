import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationKey: ["set-main-device"],
    mutationFn: (id: string) => DevicesService.setMain(id),
  });
};

export const useDeleteDevice = () => {
  return useMutation({
    mutationKey: ["delete-device"],
    mutationFn: (id: string) => DevicesService.delete(id),
  });
};

export const useAcceptDevice = () => {
  return useMutation({
    mutationKey: ["accept-device"],
    mutationFn: (id: string) => DevicesService.accept(id),
  });
};
