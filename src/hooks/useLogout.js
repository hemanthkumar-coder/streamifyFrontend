import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api.js";
import { useNavigate } from "react-router";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout Successfull");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
    },
  });
  return { isPending, error, logoutMutation: mutate };
}
