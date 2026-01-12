import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClientForm from "@/components/client-form";

export default async function NewClientPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Client</h1>
      <ClientForm />
    </div>
  );
}
