import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoanStatus } from "../backend";
import { useActor } from "./useActor";

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetAllApplications() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllApplications();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetApplicationCount() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint>({
    queryKey: ["applicationCount"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getApplicationCount();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitApplication() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      fullName,
      email,
      whatsApp,
      amount,
      term,
    }: {
      fullName: string;
      email: string;
      whatsApp: string;
      amount: bigint;
      term: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitApplication(fullName, email, whatsApp, amount, term);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["applicationCount"] });
    },
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: bigint; status: LoanStatus }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateApplicationStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
