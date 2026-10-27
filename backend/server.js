
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors({  origin: process.env.FRONTEND_URL || "http://localhost:5173"}));
app.use(express.json());

// Test the backend
app.get("/", function (req, res) {
  res.send("Newsletter backend is running");
});

// Newsletter subscription
app.post("/api/newsletter", async function (req, res) {
  try {
    const email = req.body.email;
    // Check whether email was entered
    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        message: "Please enter your email address."
      });
    }

    const cleanEmail = email.trim();
    // Check Brevo configuration
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_FROM_EMAIL) {
      return res.status(500).json({
        message: "Email service is not configured."
      });
    }

    // Send the email using Brevo
    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: {
            name: "Newsletter",
            email: process.env.BREVO_FROM_EMAIL
          },
          to: [{ email: cleanEmail }],
          subject: "Welcome to our newsletter!",
          htmlContent:
            "<h2>Welcome!</h2><p>Thank you for subscribing to our newsletter.</p>"
        })
      }
    );

    if (!response.ok) {
      return res.status(500).json({
        message: "Could not send the email."
      });
    }

    return res.status(200).json({
      message: "Your subscription was successful! Check your email."
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong."
    });
  }
});

// Start the backend server
const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Server running on http://localhost:" + PORT);
});
