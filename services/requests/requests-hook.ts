import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useModal } from "@/hooks/use-modal";
import { RequestsService, IParams } from "./requests-service";
import { RequestFormValues } from "@/schemas/request";

export const useGetRequestsQuery = ({ params }: { params: IParams }) => {
  return useQuery({
    queryKey: ["requests", params],
    queryFn: () => RequestsService.getRequests({ params }),
  });
};

export const useGetRequestById = (id: string) => {
  return useQuery({
    queryKey: ["request", id],
    queryFn: () => RequestsService.getRequestById(id),
    enabled: !!id,
  });
};

export const useAddRequestMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();

  return useMutation({
    mutationKey: ["add-request"],
    mutationFn: (data: RequestFormValues) => RequestsService.addRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      onClose();
      toast.success("Request added successfully");
    },
    onError: () => {
      toast.error("Failed to add request");
    },
  });
};

export const useUpdateRequestMutation = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();

  return useMutation({
    mutationKey: ["update-request"],
    mutationFn: (data: RequestFormValues) =>
      RequestsService.updateRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      onClose();
      toast.success("Request updated successfully");
    },
    onError: () => {
      toast.error("Failed to update request");
    },
  });
};

export const useApproveRequestMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();

  return useMutation({
    mutationKey: ["approve-request"],
    mutationFn: (id: string) => RequestsService.approveRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      onClose();
      toast.success("Request approved successfully");
    },
    onError: () => {
      toast.error("Failed to approve request");
    },
  });
};

export const useRejectRequestMutation = () => {
  const queryClient = useQueryClient();
  const { onClose } = useModal();

  return useMutation({
    mutationKey: ["reject-request"],
    mutationFn: ({
      id,
      rejectionReason,
    }: {
      id: string;
      rejectionReason: string;
    }) => RequestsService.rejectRequest(id, rejectionReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      onClose();
      toast.success("Request rejected successfully");
    },
    onError: () => {
      toast.error("Failed to reject request");
    },
  });
};
