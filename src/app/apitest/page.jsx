import { getSubs } from "@/lib/supabase";

// når man skriver async ved vi at vi er på et server component - Man har brug for en asyncron funktion fordi vi await på at hente data der bliver genereret
async function Page() {
  const subscribers = await getSubs();
  return (
    <div>
      <h1>All Subscribers</h1>

      <ul>
        {subscribers.map((sub) => (
          <li key={sub.id}>
            {sub.navn} - {sub.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Page;
