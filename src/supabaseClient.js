import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rkjiqpubcfjhsoejsxyr.supabase.co/rest/v1/",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJramlxcHViY2ZqaHNvZWpzeHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4NDUyMjUsImV4cCI6MjA5NTQyMTIyNX0.pZYNgH_q3DfIaBid42vDQMcCotmsXJEq5G7ETSlONJg"
);