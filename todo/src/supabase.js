import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://ptmdotckpecfnavrcgdu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0bWRvdGNrcGVjZm5hdnJjZ2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMTM4MjksImV4cCI6MjA2Mzg4OTgyOX0.R4yFfJspMkUm4ctyWoM4p2fsOfoYM9j077kqRY_QT8w';
export const supabase = createClient(supabaseUrl, supabaseKey);