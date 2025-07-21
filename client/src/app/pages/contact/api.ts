import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Forward the data to the backend server (adjust the URL as needed)
    const backendRes = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (backendRes.ok) {
      return res.status(200).json({ message: "Message sent successfully" });
    } else {
      return res.status(500).json({ message: "Failed to send message to backend" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
