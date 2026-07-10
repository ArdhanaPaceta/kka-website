import { supabase } from "./supabase";

export async function getCurrentAdmin() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: admin, error } = await supabase
    .from("admin")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return null;
  }

  return admin;
}

export async function isAuthenticated() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return !!session;
}

export async function isSuperAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    return false;
  }

  return admin.role === "superadmin";
}