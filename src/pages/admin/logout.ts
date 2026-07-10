import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const GET: APIRoute = async () => {
  await supabase.auth.signOut();

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
};