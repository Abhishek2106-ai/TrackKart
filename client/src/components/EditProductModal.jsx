import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { updateProductApi } from "../services/productService";

function EditProductModal({
  isOpen,
  onClose,
  product,
  setProducts,
}) {
  const [targetPrice, setTargetPrice] = useState("");

  useEffect(() => {
    if (product) {
      setTargetPrice(product.target_price);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSave = async () => {
    try {
      const updated = await updateProductApi(
        product.id,
        Number(targetPrice)
      );

      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? updated : p
        )
      );

      toast.success("Target Updated");

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Target Price</h2>

        <p>{product.title}</p>

        <input
          type="number"
          value={targetPrice}
          onChange={(e) =>
            setTargetPrice(e.target.value)
          }
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditProductModal;