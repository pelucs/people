"use server"

import { api } from "@/api/axios";
import { getUser } from "@/lib/auth";

export async function fetchUser() {
  const user = getUser();

  if(!user) {
    throw new Error("Unauthorized")
  }

  const response = await api.get(`/user/${user.id}`)

  return response.data;
} 