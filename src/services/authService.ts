import { supabase } from "../lib/supabase";

export interface AdminUser {
  id: string;
  nama: string;
  role: "admin" | "superadmin";
}

class AuthService {
  /**
   * Login menggunakan Supabase Auth
   */
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("User tidak ditemukan.");
    }

    // Pastikan user ada pada tabel admin
    const { data: admin, error: adminError } = await supabase
      .from("admin")
      .select("id, nama, role")
      .eq("id", data.user.id)
      .single();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      throw new Error("Akun ini bukan administrator.");
    }

    return admin as AdminUser;
  }

  /**
   * Logout
   */
  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Mengambil user login
   */
  async getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  }

  /**
   * Mengambil session
   */
  async getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  }

  /**
   * Mengambil data admin
   */
  async getAdmin(): Promise<AdminUser | null> {
    const user = await this.getUser();

    if (!user) return null;

    const { data } = await supabase
      .from("admin")
      .select("id, nama, role")
      .eq("id", user.id)
      .single();

    return data as AdminUser | null;
  }

  /**
   * Mengecek apakah user sudah login
   */
  async isAuthenticated() {
    const session = await this.getSession();
    return session !== null;
  }
}

export const authService = new AuthService();