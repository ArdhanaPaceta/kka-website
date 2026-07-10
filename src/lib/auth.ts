import { supabase } from "./supabase";

export async function login(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function logout() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return {
    session,
    error,
  };
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return {
    user,
    error,
  };
}