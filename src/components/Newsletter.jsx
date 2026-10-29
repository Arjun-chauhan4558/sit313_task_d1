
import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(event) {
    event.preventDefault();

    setMessage("");
    setSuccess(false);

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Subscription failed.");
      }

      setSuccess(true);
      setMessage(data.message);
      setEmail("");

    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Cannot connect to the server. Please try again."
          : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="newsletter">
      <h2>Subscribe to our newsletter</h2>
      <p>Get the latest updates delivered to your inbox.</p>

      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={
            success ? "newsletter-success" : "newsletter-error"
          }
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </section>
  );
}

export default Newsletter;
