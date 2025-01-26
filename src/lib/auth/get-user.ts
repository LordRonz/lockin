import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = await createClient()
  const user = await supabase.auth.getUser();

  if (!user.data.user?.id || user.error) {
    throw new Error('User not found');
  }
  return user.data;
}