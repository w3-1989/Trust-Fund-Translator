export async function translate(text: string): Promise<string> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const raw = await res.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`API returned ${res.status}, not JSON. Is the API running?`);
  }

  if (!res.ok) throw new Error(data.error ?? `Error ${res.status}`);
  return data.translation;
}