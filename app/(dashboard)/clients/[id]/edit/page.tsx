import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import ClientForm from "@/components/client-form";

export default async function EditClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { id } = await params;

  const { data: client, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !client) {
    notFound();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link
        href={`/clients/${client.id}`}
        className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
      >
        ← Back to Clients
      </Link>
      <h1 className="text-3xl font-bold mb-6">Edit Client</h1>
      <ClientForm client={client} />
    </div>
  );
}
