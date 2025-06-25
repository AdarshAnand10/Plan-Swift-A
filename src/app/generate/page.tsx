"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const generatePlan = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a helpful assistant that generates professional business plans.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "No result.";
      setResult(text);
    } catch (err) {
      console.error(err);
      setResult("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Generate Your Business Plan</h1>

      <textarea
        className="w-full p-4 border rounded mb-4"
        placeholder="Enter your startup idea or prompt..."
        rows={6}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        onClick={generatePlan}
        disabled={loading || !prompt}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {result && (
        <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded border">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
