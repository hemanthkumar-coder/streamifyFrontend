import { useMutation, useQueryClient } from "@tanstack/react-query"
import { login } from "../lib/api.js"
import toast from "react-hot-toast"


export default function useLogin(){
const queryClient = useQueryClient()
  const {mutate,isPending,error}=useMutation({
    mutationFn:login,
    onSuccess:()=>{
      toast.success("Login Successfull")
      queryClient.invalidateQueries({queryKey:["authUser"]})
    }
  })
  return {isPending,error,loginMutation:mutate}
}
