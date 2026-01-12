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
    <div className="">
      <div className="">
        <div>
          <Link href="/clients" className="">
            ← Back to Clients
          </Link>
          <h1 className="">{client.name}</h1>
        </div>
        <div className="">
          <Link href={`/clients/${client.id}/edit`} className="">
            Edit Client
          </Link>
          <DeleteClientButton clientId={client.id} clientName={client.name} />
        </div>
      </div>

      <div className="">
        <div>
          <h3 className="">Email</h3>
          <a href={`mailto:${client.email}`} className="">
            {client.email}
          </a>
        </div>

        {client.company && (
          <div>
            <h3 className="">Company</h3>
            <p className="">{client.company}</p>
          </div>
        )}

        {client.phone && (
          <div>
            <h3 className="">Phone</h3>
            <a href={`tel:${client.phone}`} className="">
              {client.phone}
            </a>
          </div>
        )}

        {client.address && (
          <div>
            <h3 className="">Address</h3>
            <p className="">{client.address}</p>
          </div>
        )}

        <div className="">
          <h3 className="">Created</h3>
          <p className="">
            {new Date(client.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="">
        <h2 className="">Projects</h2>
        <div className="">
          No projects yet. Projects will be added on Day 3.
        </div>
      </div>
    </div>
  );
}
