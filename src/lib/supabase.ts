import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definition for RSVP data
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  mealPreference: string;
  specialRequirements: string;
}

// Check if email already exists in the database
export async function checkEmailExists(email: string): Promise<boolean> {
  const { data, error, count } = await supabase
    .from('rsvp_guests')
    .select('email', { count: 'exact' })
    .eq('email', email);
  
  if (error) {
    console.error('Error checking email existence:', error);
    throw error;
  }
  
  return count !== null && count > 0;
}

// Functions for RSVP operations
export async function submitRSVP(guests: Guest[]) {
  const { data, error } = await supabase
    .from('rsvp_guests')
    .insert(guests);
  
  if (error) {
    console.error('Error submitting RSVP:', error);
    throw error;
  }
  
  return data;
}

export async function fetchRSVPs() {
  const { data, error } = await supabase
    .from('rsvp_guests')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching RSVPs:', error);
    throw error;
  }
  
  return data as Guest[];
}

export async function deleteRSVP(id: string) {
  const { error } = await supabase
    .from('rsvp_guests')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting RSVP:', error);
    throw error;
  }
  
  return true;
}