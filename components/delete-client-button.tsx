"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteClientButton({
  clientId,
  clientName,
}: {
  clientId: string;
  clientName: string;
}) {
  const router = useRouter();
  const supabase = createClient();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientId);

      if (error) throw error;

      router.push("/clients");
      router.refresh();
    } catch (err) {
      console.error("Error deleting client:", err);
      alert("Failed to delete client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)} className="">
        Delete
      </button>

      {showConfirm && (
        <div className="">
          <div className="">
            <h2 className="">Delete Client</h2>
            <p className="">
              Are you sure you want to delete <strong>{clientName}</strong>?
              This action cannot be undone.
            </p>
            <div className="">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className=""
              >
                Cancel
              </button>
              <button onClick={handleDelete} disabled={loading} className="">
                {loading ? "Deleting..." : "Delete Client"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
