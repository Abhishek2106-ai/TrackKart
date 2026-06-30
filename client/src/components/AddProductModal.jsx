import { useState } from "react";
import {
  Sparkles,
  X,
  LoaderCircle,
  Save,
} from "lucide-react";import { useProducts } from "../context/ProductContext";
import toast
from "react-hot-toast";

import {
  createProduct,
  extractProduct,
} from "../services/productService";

function AddProductModal({
  isOpen,
  onClose,
}) {
  const [url, setUrl] = useState("");
  const [targetPrice, setTargetPrice] =
    useState("");
const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [currentPrice, setCurrentPrice] =
    useState("");
  const [image, setImage] = useState("");

  const { products, setProducts } =
    useProducts();

  if (!isOpen) return null;

const handleExtract = async () => {
  if (!url.trim()) {
    toast.error("Please enter a product URL");
    return;
  }

  try {
    setLoading(true);

    const data = await extractProduct(url);

    if (!data.price) {
      toast.error("Unable to fetch product");
      return;
    }

    const cleanPrice = Number(
      String(data.price).replace(/[^\d.]/g, "")
    );

    setTitle(data.title || "");
    setCurrentPrice(cleanPrice);
    setImage(data.image || "");

    toast.success("Product fetched successfully");
  } catch (err) {
    console.log(err);
    toast.error("Failed to fetch product");
  } finally {
    setLoading(false);
  }
};

  const saveProduct = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login again");
        return;
      }
if (!title || !currentPrice) {
  toast.error("Please fetch product details first.");
  return;
}

const newProduct = await createProduct({
  user_id: user.id,
  title,
  product_url: url,
  current_price: Number(currentPrice),
  target_price: Number(targetPrice),
  image,
});

      setProducts([
  ...products,
  newProduct
]);

toast.success(
  "Product Added"
);

setUrl("");
setTargetPrice("");
setTitle("");
setCurrentPrice("");
setImage("");

onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
<div className="modal-header">

  <div>

    <span className="modal-tag">

      TRACK PRODUCT

    </span>

    <h2>

      Add New Product

    </h2>

    <p>

      Paste a product URL, fetch details automatically and start tracking instantly.

    </p>

  </div>

  <button
    className="modal-close"
    onClick={onClose}
  >
    <X size={18} />
  </button>

</div>
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
        />
<button
  className="save-btn gradient-btn"
  onClick={handleExtract}
  disabled={loading}
>

  {loading ? (
    <>
      <LoaderCircle
        size={18}
        className="spin"
      />
      Fetching...
    </>
  ) : (
    <>
      <Sparkles size={18} />
      Extract Product
    </>
  )}

</button>

       {title && (
  <div className="product-preview">

    <img
      src={image}
      alt={title}
      className="preview-image"
    />

    <div className="preview-details">
      <h3>{title}</h3>

      <p>
        Current Price
      </p>

      <h2>
        ₹{Number(currentPrice).toLocaleString("en-IN")}
      </h2>
    </div>

  </div>
)}

        <input
          type="number"
          placeholder="Target Price"
          value={targetPrice}
          onChange={(e) =>
            setTargetPrice(
              e.target.value
            )
          }
        />

        <div className="modal-buttons">
      <button
  className="cancel-btn"
  onClick={onClose}
>
  <X size={16} /> Cancel
</button>
<button
className="save-btn"
onClick={saveProduct}
>

<Save size={16} /> Save Product

</button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;