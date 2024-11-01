import { supabase } from '../lib/createClient';

export const uploadImage = async (uri: string, bucket: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `${Date.now()}.jpg`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, blob);
      
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);
      
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};