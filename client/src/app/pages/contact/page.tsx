"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import LeafletMap with SSR disabled
// const LeafletMap = dynamic(() => import("@/components/LeafletMap/LeafletMap"), { ssr: false });

import GoogleMapComponent from "@/components/GoogleMap/GoogleMap";


export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [locationError, setLocationError] = useState<string>("");
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(null);

  const GOOGLE_API_KEY = 'AIzaSyAuIR2zgDpOIjcAS3DlQ31HjbQHeloSd_I';

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLatlng({ lat: latitude, lng: longitude });
          try {
            const res = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=65166b14ce784a67a77a4d47a56d403d`
            );
            const data = await res.json();
            const components = data.results[0]?.components || {};
            const city = components.city || components.town || components.village || "";
            const state = components.state || "";
            const country = components.country || "";
            setLocation(`${city}${city ? ", " : ""}${state}${state ? ", " : ""}${country}`);
          } catch (err) {
            setLocationError("Failed to fetch location details.");
          }
        },
        (err) => {
          setLocationError("User denied location or an error occurred.");
        }
      );
    } else {
      setLocationError("Geolocation not supported.");
    }
  }, []);

  const handleMapPick = async (lat: number, lng: number) => {
    setLatlng({ lat, lng });
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=65166b14ce784a67a77a4d47a56d403d`
      );
      const data = await res.json();
      const components = data.results[0]?.components || {};
      const city = components.city || components.town || components.village || "";
      const state = components.state || "";
      const country = components.country || "";
      setLocation(`${city}${city ? ", " : ""}${state}${state ? ", " : ""}${country}`);
      setLocationError("");
    } catch (err) {
      setLocationError("Failed to fetch location details.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, location }),
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Contact Us</h2>
      <div style={{ marginBottom: "1rem" }}>
        <strong>Your Location: </strong>
        {location ? (
          <span>{location}</span>
        ) : (
          <span style={{ color: "red" }}>{locationError || "Fetching location..."}</span>
        )}
      </div>
      {/* <div style={{ height: 300, marginBottom: 20 }}>
        <LeafletMap latlng={latlng} onPick={handleMapPick} />
      </div> */}

      <div style={{ height: 300, marginBottom: 20 }}>
        <GoogleMapComponent latlng={latlng} onPick={handleMapPick} apiKey={GOOGLE_API_KEY} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      {status && <div style={{ marginTop: "1rem", color: status.includes("success") ? "green" : "red" }}>{status}</div>}
    </div>
  );
}
