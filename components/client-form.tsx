"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ClientFormProps = {
  client?: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    address: string | null;
  };
};

export default function ClientForm({ client }: ClientFormProps) {
  const router = useRouter();
  const supabase = createClient();

  const [formData, setFormData] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    company: client?.company || "",
    address: client?.address || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (client) {
        const { error } = await supabase
          .from("clients")
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            company: formData.company || null,
            address: formData.address || null,
          })
          .eq("id", client.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("clients").insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          address: formData.address || null,
        });

        if (error) throw error;
      }

      router.push("/clients");
      router.refresh();
    } catch (err) {
      console.error("Error saving client:", err);
      setError("Failed to save client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div>
        <label htmlFor="name" className="form-label-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="form-input-2"
        />
      </div>

      <div>
        <label htmlFor="email" className="form-label-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="form-input-2"
        />
      </div>

      <div>
        <label htmlFor="company" className="form-label-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          className="form-input-2"
        />
      </div>

      <div>
        <label htmlFor="phone" className="form-label-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="form-input-2"
        />
      </div>

      <div>
        <label htmlFor="address" className="form-label-2">
          Address
        </label>
        <textarea
          id="address"
          rows={3}
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="form-input-2"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : client ? "Update Client" : "Add Client"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/clients")}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
