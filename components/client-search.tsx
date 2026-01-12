"use client";

import { useState } from "react";
import Link from "next/link";
import DeleteClientButton from "@/components/delete-client-button";

type Client = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
};

export default function ClientSearch({ clients }: { clients: Client[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search clients by name, email, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredClients.length > 0 ? (
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
                {filteredClients.map((client) => (
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
                      <DeleteClientButton
                        clientId={client.id}
                        clientName={client.name}
                        className="text-red-600 hover:text-red-800"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No clients found.</p>
        </div>
      )}
    </>
  );
}
