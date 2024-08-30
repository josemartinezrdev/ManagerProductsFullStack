import { useState } from "react";
import ProductList from "./ProductList";

const ProductForm = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [vista, setVista] = useState("form");

  const submitProducts = async (event) => {
    event.preventDefault();

    const product = {
      code,
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
    };

    try {
      await fetch("/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      alert("Producto añadido con éxito");

      setCode("");
      setName("");
      setPrice("");
      setStock("");
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al agregar el producto.");
    }
  };

  if (vista === "list") {
    return <ProductList />;
  }

  return (
    <div className="container">
      <h1>Agregar Producto</h1>
      <form onSubmit={submitProducts}>
        <label htmlFor="code">Código:</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          required
        />
        <br />
        <br />

        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <br />
        <br />

        <div className="div-btns">
          <button className="send" type="submit">
            Enviar
          </button>
          <button
            className="see"
            type="button"
            onClick={() => setVista("list")}
          >
            Ver
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
