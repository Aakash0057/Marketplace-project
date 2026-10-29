
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

const products = [];

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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Marketplace v2 - Add Product</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          background: #f1f5f9;
          color: #1e293b;
        }
        header {
          background: #173b67;
          color: white;
          text-align: center;
          padding: 25px;
        }
        main {
          max-width: 520px;
          margin: 35px auto;
          padding: 25px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px #00000015;
        }
        input, textarea, button {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 12px;
          margin: 12px 0;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 16px;
        }
        textarea { min-height: 100px; }
        button {
          background: #1769aa;
          color: white;
          border: none;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>Marketplace</h1>
        <p>Version 2 — Add Product: Upload Items</p>
      </header>
      <main>
        <h2>Upload a Product</h2>
        <form action="/add-product" method="POST">
          <input name="name" placeholder="Product name" required>
          <input name="price" type="number" min="0"
                 step="0.01" placeholder="Price in ₹" required>
          <textarea name="description"
                    placeholder="Product description" required></textarea>
          <input name="image" type="url"
                 placeholder="Image URL (optional)">
          <button type="submit">Upload Product</button>
        </form>
        <p>Total uploaded products: ${products.length}</p>
      </main>
    </body>
    </html>
  `);
});

app.post("/add-product", (req, res) => {
  const price = Number(req.body.price);

  if (!Number.isFinite(price) || price < 0) {
    return res.status(400).send("Please enter a valid price.");
  }

  products.push({
    name: req.body.name,
    price,
    description: req.body.description,
    image: req.body.image
  });

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Product Uploaded</title></head>
    <body style="font-family:Arial;padding:30px">
      <h1>Product uploaded successfully!</h1>
      <p>Product: ${escapeHtml(req.body.name)}</p>
      <p>Price: ₹${price.toFixed(2)}</p>
      <p><a href="/">Upload another product</a></p>
    </body>
    </html>
  `);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Marketplace v2 running on port ${PORT}`);
});
