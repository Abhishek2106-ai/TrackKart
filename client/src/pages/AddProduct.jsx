import { useState } from "react";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log({
      title,
      url,
      targetPrice,
    });
  };

  return (
    <div className="add-product">

      <h1>Add Product</h1>

      <form onSubmit={submitHandler}>

        <input
          placeholder="Product Name"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Amazon/Flipkart URL"
          onChange={(e) => setUrl(e.target.value)}
        />

        <input
          type="number"
          placeholder="Target Price"
          onChange={(e) => setTargetPrice(e.target.value)}
        />

        <button>Add Product</button>

      </form>

    </div>
  );
}

export default AddProduct;