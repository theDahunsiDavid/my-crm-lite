import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching clients:", error);
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Link
          href="/clients/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Client
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search clients..."
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {clients && clients.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-head">Name</th>
                  <th className="table-head">Email</th>
                  <th className="table-head">Company</th>
                  <th className="table-head">Phone</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="table-col">
                      <Link
                        href={`/clients/${client.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {client.name}
                      </Link>
                    </td>
                    <td className="table-col text-gray-500">{client.email}</td>
                    <td className="table-col text-gray-500">
                      {client.company || "-"}
                    </td>
                    <td className="table-col text-gray-500">
                      {client.phone || "-"}
                    </td>
                    <td className="table-col text-sm">
                      <Link
                        href={`/clients/${client.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">
            No clients yet. Add your first client to get started!
          </p>
          <Link
            href="/clients/new"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Client
          </Link>
        </div>
      )}
    </div>
  );
}
