import { supabase } from "../lib/supabase";

export interface Keunggulan {
  id: string;
  gambar_url: string | null;
  judul: string;
  deskripsi: string;
  urutan: number;
}

class KeunggulanService {
  async list(): Promise<Keunggulan[]> {
    const { data, error } = await supabase
      .from("keunggulan")
      .select("*")
      .order("urutan", { ascending: true });

    if (error) throw new Error(error.message);
    return data as Keunggulan[];
  }

  async create(payload: Omit<Keunggulan, "id">): Promise<Keunggulan> {
    const { data, error } = await supabase
      .from("keunggulan")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Keunggulan;
  }

  async update(id: string, payload: Partial<Keunggulan>): Promise<Keunggulan> {
    const { data, error } = await supabase
      .from("keunggulan")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Keunggulan;
  }

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from("keunggulan").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
}

export const keunggulanService = new KeunggulanService();