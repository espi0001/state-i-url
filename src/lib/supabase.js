const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const api = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  //   Accept: "application/json",
  "Content-Type": "application/json",
  apikey: api,
  Prefer: "return=representation",
};

// GET alle subscribers
export async function getSubs() {
  const response = await fetch(url, {
    method: "GET",
    headers: headersList,
  });

  const data = await response.json();
  return data;
}

// GET subscriber by ID
export async function getSubById(id) {
  const response = await fetch(url, {
    method: "GET",
    headers: headersList,
  });

  const data = await response.json();
  return data;
}

// POST subscriber
// Modtager data fra form
export async function postSub(subdata) {
  const response = await fetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  const data = await response.json();
  return data;
}
// PATCH subscriber
// Modtager data fra form
export async function updateSubscriber(subdata) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  const data = await response.json();
  return data;
}

// DELETE subscriber
export async function deleteSubscriber(id) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: headersList,
  });

  const data = await response.json();
  return data;
}
