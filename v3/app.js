
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 599,
    description: "Wireless mouse with USB receiver",
    image: ""
  },
  {
    id: 2,
    name: "Headphones",
    price: 1299,
    description: "Comfortable over-ear headphones",
    image: ""
  },
  {
    id: 3,
    name: "Backpack",
    price: 899,
    description: "Everyday backpack for college",
    image: ""
  }
];

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

app.get("/", (req, res) => {
  const productCards = products.map(product => `
    <article class="card">
      ${
        product.image
          ? `<img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">`
          : `<div class="placeholder">Marketplace Product</div>`
      }
      <div class="details">
        <h2>${escapeHtml(product.name)}</h2>
        <p>${escapeHtml(product.description)}</p>
        <strong>₹${product.price.toFixed(2)}</strong>
      </div>
    </article>
  `).join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Marketplace v3 - All Products</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f1f5f9;
          color: #1e293b;
        }
        header {
          padding: 25px;
          text-align: center;
          background: #173b67;
          color: white;
        }
        main {
          max-width: 1100px;
          margin: 30px auto;
          padding: 0 20px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
        }
        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px #00000012;
        }
        .placeholder {
          height: 150px;
          display: grid;
          place-items: center;
          background: #dbeafe;
          color: #173b67;
        }
        img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        .details { padding: 18px; }
        .details h2 { margin-top: 0; }
        .details p { color: #64748b; min-height: 40px; }
        .details strong { color: #1769aa; font-size: 20px; }
        .count { margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <header>
        <h1>Marketplace</h1>
        <p>Version 3 — View: Show All Products</p>
      </header>
      <main>
        <h2>All Products</h2>
        <p class="count">Total products: ${products.length}</p>
        <section class="grid">
          ${productCards}
        </section>
      </main>
    </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Marketplace v3 running on port ${PORT}`);
});
