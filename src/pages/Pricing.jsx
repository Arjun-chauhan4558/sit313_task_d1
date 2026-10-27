import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import "./Pricing.css";

function Pricing() {
  const { user } = useAuth();
  const [plan, setPlan] = useState("Free");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadPlan() {
      if (!user) {
        setPlan("Free");
        return;
      }

      const result = await getDoc(doc(db, "users", user.uid));
      if (result.exists() && result.data().plan === "Paid") {
        setPlan("Paid");
      }
    }

    loadPlan();
  }, [user]);

  async function upgrade(e) {
    e.preventDefault();

    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    if (plan === "Paid") {
      setMessage("You already have the Paid plan.");
      return;
    }
if (!name.trim() || !card.trim()) {
  setMessage("Enter your name and card number.");
  return;
}

    try {
      await updateDoc(doc(db, "users", user.uid), {
        plan: "Paid"
      });

      setPlan("Paid");
      setShowModal(false);
      setMessage("You are now on the Paid plan.");
    } catch (error) {
      setMessage("Could not update your plan.");
    }
  }

  return (
    <div className="pricing">
      <h1>Choose Your Plan</h1>
      <p>Your current plan: {user ? plan : "Please log in"}</p>

      <div className="plans">
        <div className="plan">
          <h2>Free</h2>
          <h3>₹0 / month</h3>
          <p>Free posts</p>
          <p>5 posts per month</p>
          <p>2 MB image uploads</p>
        </div>

        <div className="plan">
          <h2>Paid</h2>
          <h3>₹199 / month</h3>
          <p>All posts</p>
          <p>Unlimited posts</p>
          <p>10 MB image uploads</p>

          <button
            disabled={plan === "Paid"}
            onClick={() => {
              if (!user) {
                setMessage("Please log in first.");
              } else {
                setMessage("");
                setShowModal(true);
              }
            }}
          >
            {plan === "Paid" ? "Current Paid Plan" : "Upgrade Plan"}
          </button>
        </div>
      </div>

      {message && <p>{message}</p>}

      {showModal && (
        <div className="modal">
          <form onSubmit={upgrade}>
            <h2>Upgrade Plan</h2>

            <label>Name on card</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Card number</label>
            <input
              value={card}
              onChange={(e) => setCard(e.target.value)}
              required
            />

            <p>Demo only. No real payment is processed.</p>
            <button type="submit">Confirm Upgrade</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Pricing;
