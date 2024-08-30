import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [vista, setVista] = useState("list");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const deleteProduct = async (code) => {
    try {
      await fetch(`/products/${code}`, {
        method: "DELETE",
      });
      const newProducts = [];
      for (const product of products) {
        if (product.code !== code) {
          newProducts.push(product);
        }
      }
      setProducts(newProducts);
      alert("Producto Elimnado con exito");
    } catch (error) {
      console.log("Algo salio mal", error);
    }
  };

  if (vista == "form") {
    return <ProductForm />;
  }
  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <>
            <li key={product.code}>
              Code: {product.code} <br />
              Name: {product.name} <br />
              Price: ${product.price} <br />
              Stock: {product.stock} <br />
            </li>
            <button
              className="see"
              type="button"
              onClick={() => deleteProduct(product.code)}
            >
              X
            </button>
          </>
        ))}
      </ul>
      <button className="see" type="button" onClick={() => setVista("form")}>
        Back
      </button>
    </div>
  );
};

export default ProductList;
