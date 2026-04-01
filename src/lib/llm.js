const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function callOpenRouter(prompt, apiKey) {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.error?.message ?? `Request failed (${res.status})`);
  if (!data?.choices?.[0]?.message?.content) throw new Error("No content returned");

  return data.choices[0].message.content;
}