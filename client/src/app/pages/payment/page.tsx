"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [method, setMethod] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMethod(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setTimeout(() => {
      setStatus(`Payment method '${method}' selected successfully!`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Choose Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select a payment method:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="creditCard"
              value="Credit Card"
              checked={method === "Credit Card"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="creditCard">
              Credit Card
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="PayPal"
              checked={method === "PayPal"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="paypal">
              PayPal
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="paymentMethod"
              id="cash"
              value="Cash"
              checked={method === "Cash"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="cash">
              Cash
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Processing..." : "Confirm Payment Method"}
        </button>
      </form>
      {status && (
        <div style={{ marginTop: "1rem", color: "green" }}>{status}</div>
      )}
    </div>
  );
}
