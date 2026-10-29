
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const sellers = [];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Marketplace v1 - Register Seller</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f1f5f9;
          margin: 0;
          color: #1e293b;
        }
        header {
          background: #173b67;
          color: white;
          padding: 25px;
          text-align: center;
        }
        main {
          max-width: 500px;
          margin: 35px auto;
          padding: 25px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px #00000015;
        }
        input, button {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          margin: 12px 0;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 16px;
        }
        button {
          background: #1769aa;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover { background: #124f82; }
      </style>
    </head>
    <body>
      <header>
        <h1>Marketplace</h1>
        <p>Version 1 — Add Seller</p>
      </header>
      <main>
        <h2>Register Vendor</h2>
        <form action="/register" method="POST">
          <input name="name" placeholder="Vendor name" required>
          <input name="email" type="email" placeholder="Email address" required>
          <input name="phone" type="tel" placeholder="Phone number" required>
          <input name="shop" placeholder="Shop name" required>
          <button type="submit">Register Seller</button>
        </form>
        <p>Total registered sellers: ${sellers.length}</p>
      </main>
    </body>
    </html>
  `);
});

app.post("/register", (req, res) => {
  const { name, email, phone, shop } = req.body;

  sellers.push({ name, email, phone, shop });

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Registration Successful</title></head>
    <body style="font-family:Arial;padding:30px">
      <h1>Seller registered successfully!</h1>
      <p>Vendor: ${escapeHtml(name)}</p>
      <p>Shop: ${escapeHtml(shop)}</p>
      <p><a href="/">Register another seller</a></p>
    </body>
    </html>
  `);
});

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Marketplace v1 running on port ${PORT}`);
});
