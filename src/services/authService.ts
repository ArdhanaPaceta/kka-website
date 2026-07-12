// src/services/authService.js
import { supabase } from '../lib/supabase'; // pastikan file ini ada

/**
 * @typedef {Object} AdminUser
 * @property {string} id
 * @property {string} nama
 * @property {"admin"|"superadmin"} role
 */

class AuthService {
  /**
   * Login
   * @param {string} email
   * @param {string} password
   * @returns {Promise<AdminUser>}
   */
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Login gagal, user tidak ditemukan.');

    // Cek di tabel admin
    const { data: admin, error: adminError } = await supabase
      .from('admin')
      .select('id, nama, role')
      .eq('id', data.user.id)
      .single();

    if (adminError || !admin) {
      // Logout otomatis jika bukan admin
      await supabase.auth.signOut();
      throw new Error('Akun ini bukan administrator.');
    }

    return admin;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  }

  /**
   * @returns {Promise<import('@supabase/supabase-js').User|null>}
   */
  async getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  async getSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  }

  /**
   * @returns {Promise<AdminUser|null>}
   */
  async getAdmin() {
    const user = await this.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('admin')
      .select('id, nama, role')
      .eq('id', user.id)
      .single();

    return data ?? null;
  }

  async isAuthenticated() {
    const session = await this.getSession();
    return !!session;
  }
}

export const authService = new AuthService();