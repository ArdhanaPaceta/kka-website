// src/pages/api/data.js
import { supabase } from '../../lib/supabase';

export async function GET({ url }) {
  const type = url.searchParams.get('type');
  const kabupatenId = url.searchParams.get('kabupatenId');
  const kecamatanId = url.searchParams.get('kecamatanId');

  let data = [];
  let error = null;

  try {
    if (type === 'kabupaten') {
      const result = await supabase
        .from('kabupaten')
        .select('id, nama')
        .order('nama');
      data = result.data;
      error = result.error;
    } 
    else if (type === 'kecamatan' && kabupatenId) {
      const result = await supabase
        .from('kecamatan')
        .select('id, nama')
        .eq('kabupaten_id', kabupatenId)
        .order('nama');
      data = result.data;
      error = result.error;
    }
    else if (type === 'sekolah' && kecamatanId) {
      const result = await supabase
        .from('sekolah')
        .select(`
          id,
          nama,
          biaya_jenjang_id,
          biaya_jenjang:biaya_jenjang_id (jenjang, nominal)
        `)
        .eq('kecamatan_id', kecamatanId)
        .order('nama');
      data = result.data;
      error = result.error;
    }
    else if (type === 'jenjang') {
      const result = await supabase
        .from('biaya_jenjang')
        .select('id, jenjang, nominal')
        .order('jenjang');
      data = result.data;
      error = result.error;
    }
    else {
      return new Response(JSON.stringify({ error: 'Parameter tidak lengkap' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}