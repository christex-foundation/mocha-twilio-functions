//@ts-check
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://snhsqmymgjdfvkncssjr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaHNxbXltZ2pkZnZrbmNzc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5NDUxODUsImV4cCI6MjAxMjUyMTE4NX0.FnHIB4YVO9NbRViW0kqyE1hFwDYcIN_rAdROjXTCbb8')

export function createSupabaseClient() {
    // if(process.env.SUPABASE_URL !== undefined && process.env.SUPABASE_KEY !== undefined) {
        
    //     const supabase =  createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
    //     return supabase;
    // }

    const supabase = createClient('https://snhsqmymgjdfvkncssjr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuaHNxbXltZ2pkZnZrbmNzc2pyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5NDUxODUsImV4cCI6MjAxMjUyMTE4NX0.FnHIB4YVO9NbRViW0kqyE1hFwDYcIN_rAdROjXTCbb8')
    return supabase;
}
