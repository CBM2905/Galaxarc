import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://srobpstbzvruabjmixvz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyb2Jwc3RienZydWFiam1peHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NzgyNTAsImV4cCI6MjA0NzA1NDI1MH0.H2JwpbPJ95BdZgDjtbhOynUR2ksYMlLiTtM9z9RmdJk');

async function uploadFile(fotoFile, id) {
    const { data, error } = await supabase
        .storage
        .from('imagenes_de_cuenta')
        .upload(String(id) + '.png', fotoFile)
    return data;
}


async function getFile(url) {
    const { data, error } = await supabase
        .storage
        .from('imagenes_de_cuenta')
        .download(url);
    return data;
}

async function getUrl(ruta) {
    const { data } = supabase
        .storage
        .from('imagenes_de_cuenta')
        .getPublicUrl(ruta)
    return data;
}



async function updateFile(id, fotoFile) {
    const { data, error } = await supabase
  .storage
  .from('imagenes_de_cuenta')
  .update(String(id) , fotoFile)
  return data;
}


async function deleteFile(ruta) {
    const { data, error } = await supabase
  .storage
  .from('imagenes_de_cuenta')
  .remove([ruta]);
  console.log(data);
}


export { uploadFile, getFile, getUrl, updateFile, deleteFile };