"use client";

import Image from "next/image";
import data from "../../public/next.svg";
import { useEffect, useState } from "react";

export default function Home() {
  const [locationInfo, setLocationInfo] = useState<null | {
    city: string;
    state: string;
    country: string;
  }>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
            );
            const data = await res.json();

            const components = data.results[0].components;
            const city = components.city || components.town || components.village || "";
            const state = components.state || "";
            const country = components.country || "";

            setLocationInfo({ city, state, country });
          } catch (err) {
            setError("Failed to fetch location details.");
          }
        },
        (err) => {
          setError("User denied location or an error occurred.");
          console.warn("Location error:", err.message);
        }
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  return (
    <div className="home container">
      <div className="row">
        <div className="col-lg-6">
          <h1>Heading 1 Demo</h1>
          <h2>Heading 2 Demo</h2>
          <h3>Heading 3 Demo</h3>
          <h4>Heading 4 Demo</h4>
          <h5>Heading 5 Demo</h5>
          <h6>Heading 6 Demo</h6>

          <div style={{ marginTop: "1rem" }}>
            <h5>User Location Info:</h5>
            {locationInfo ? (
              <p>
                You are in <strong>{locationInfo.city}</strong>,{" "}
                <strong>{locationInfo.state}</strong>,{" "}
                <strong>{locationInfo.country}</strong>
              </p>
            ) : (
              <p style={{ color: "red" }}>{error || "Fetching location..."}</p>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <p>This is a sample paragraph to demonstrate the font family and base styles.</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", margin: "1rem 0" }}>
            <button className="btn btn-primary">Primary</button>
            <button className="btn btn-secondary">Secondary</button>
            <button className="btn btn-success">Success</button>
            <button className="btn btn-warning">Warning</button>
            <button className="btn btn-danger">Danger</button>
          </div>
        </div>
      </div>

      <div className="card" style={{ width: "18rem", marginTop: "2rem" }}>
        <Image src={data} className="card-img-top" alt="rest" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card’s content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
}
