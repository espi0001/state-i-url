import { getSubById, updateSubscriber, deleteSubscriber } from "@/lib/supabase";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const subscriber = await getSubById(params.id);
  // const { id } = await params; // Hent subscriber med id fra params

  async function handleUpdate(formData) {
    ("use server"); // Marker funktionen som en serverfunktion
    const updatedData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await updateSubscriber(params.id, updatedData); // Opdater subscriber med PATCH-funktionen
    revalidatePath("/"); // Genindlæs siden med alle subscribers
    redirect("/"); // Send brugeren tilbage til forsiden
  }
  async function handleDelete() {
    "use server";
    await deleteSubscriber(params.id); // Slet subscriber
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div>
      <h1>Update Subscriber</h1>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            defaultValue={subscriber.name} // Sæt defaultValue til subscriberens nuværende værdi
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={subscriber.email} // Sæt defaultValue til subscriberens nuværende værdi
            required
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" onClick={updateSubscriber} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            Update
          </button>
          <button type="button" onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </form>
    </div>
  );

  /*TODO:
    - Lav en formular med input for name og email med "defaultValue" sat til subscriberens nuværende værdier
    - Lav en funktion med "use server" som køres fra en action på formen
    - Funktionen modtager automatisk "formData" som argument
    - Opret et objekt med name og email fra formData; fx 'email: formData.get("email")'
    importer din PATCH-funktion fra supabase og kør den med objektet som argument
    - Brug revalidatePath("/") til at genindlæse siden, hvor du viser alle subscribers
    - Brug redirect("/") til at sende brugeren tilbage til forsiden
    */
}
