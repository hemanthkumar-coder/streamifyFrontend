import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api.js";


export default function useSignUp(){
    const queryClient = useQueryClient()
    const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {isPending,error,signUpMutation:mutate}
}