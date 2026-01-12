import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import DeleteClientButton from "@/components/delete-client-button";

export default async function ClientDetailPage({
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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Link
            href="/clients"
            className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block"
          >
            ← Back to Clients
          </Link>
          <h1 className="text-3xl font-bold">{client.name}</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/clients/${client.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Client
          </Link>
          <DeleteClientButton clientId={client.id} clientName={client.name} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
          <a
            href={`mailto:${client.email}`}
            className="text-blue-600 hover:text-blue-800"
          >
            {client.email}
          </a>
        </div>

        {client.company && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Company</h3>
            <p className="text-gray-900">{client.company}</p>
          </div>
        )}

        {client.phone && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Phone</h3>
            <a
              href={`tel:${client.phone}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {client.phone}
            </a>
          </div>
        )}

        {client.address && (
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Address</h3>
            <p className="text-gray-900 whitespace-pre-wrap">
              {client.address}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
          <p className="text-gray-900">
            {new Date(client.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No projects yet. Projects will be added on Day 3.
        </div>
      </div>
    </div>
  );
}
