import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPERBASE_URL 
const supabaseKey = process.env.REACT_APP_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)


async function registerUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error('Error registering user:', error.message);
      return { error };
    } else {
      console.log('User registered successfully:', data);
      return { data };
    }
  }
  
async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  
    if (error) {
      console.error('Error logging in user:', error.message);
      return { error };
    } else {
      console.log('User logged in successfully:', data);
      return { data };
    }
}

async function logoutUser() {
    const { error } = await supabase.auth.signOut();
  
    if (error) {
      console.error('Error logging out user:', error.message);
      return { error };
    } else {
      console.log('User logged out successfully');
      return { success: true };
    }
  }
  
  async function getUserId() {
    const response = await supabase.auth.getUser();

    // Destrukturierung der Antwort
    const { data, error } = response;

    if (error) {
        console.error('Fehler beim Abrufen des Benutzers:', error);
        return;
    }

    // Zugriff auf das user-Objekt
    const { user } = data;

    // Zugriff auf die id des Benutzers
    const userId = user.id;
    
    return userId
}
  
export {loginUser, registerUser, logoutUser, getUserId}

export default supabase