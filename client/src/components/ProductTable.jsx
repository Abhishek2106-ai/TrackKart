import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import toast from "react-hot-toast";
import {
  Pencil,
  Trash2,
  History,
  ExternalLink,
  Target,
  IndianRupee,
  RefreshCw,
  Package,
  ShoppingCart,
} from "lucide-react";import { deleteProductApi, refreshProductApi } from "../services/productService";

function ProductTable({
  search,
  filter,
  openHistory,
  setEditOpen,
  setEditProduct,
}) {
  const { products, setProducts } = useProducts();
  const [refreshingId, setRefreshingId] = useState(null);

  const handleRefresh = async (id) => {
    setRefreshingId(id);
    try {
      const updated = await refreshProductApi(id);

      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );

      toast.success("Price updated");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Couldn't fetch live price");
    } finally {
      setRefreshingId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductApi(id);

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      toast.success("Product Deleted");
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      product.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="products-section">

<div className="products-header">

  <div>

    <span className="products-tag">

      LIVE TRACKING

    </span>

    <h2>

      Tracked Products

    </h2>

  </div>

  <span className="products-count">

    {filteredProducts.length} Products

  </span>

</div>
      {filteredProducts.length === 0 ? (

        <div className="empty-products">

          <div className="empty-icon">

  <Target size={60} />

</div>
          <h3>No Products Added</h3>

          <p>
            Start tracking your first product to
            receive automatic price updates.
          </p>

        </div>

      ) : (

        <div className="product-grid">

          {filteredProducts.map((product) => {

            const currentPrice =
              Number(product.current_price);

            const targetPrice =
              Number(product.target_price);

            const saving =
              Math.max(
                0,
                targetPrice - currentPrice
              );

            const readyToBuy =
              currentPrice <= targetPrice;

            return (

              <div
                className="product-card"
                key={product.id}
              >

                <div className="product-image">

                  {product.image ? (

                    <img
                      src={product.image}
                      alt={product.title}
                    />

                  ) : (

                    <Package size={36} strokeWidth={1.5} />

                  )}

                </div>

                <div className="store-badge">

                  {product.product_url?.includes("amazon") ? (
                    <>
                      <span className="store-dot amazon" />
                      Amazon
                    </>
                  ) : product.product_url?.includes("flipkart") ? (
                    <>
                      <span className="store-dot flipkart" />
                      Flipkart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={13} />
                      Store
                    </>
                  )}

                </div>

               <div className="product-meta">

  <span className="store-name">
    {product.product_url?.includes("amazon")
      ? "Amazon"
      : "Flipkart"}
  </span>

  <span className="price-status">
    {Number(product.current_price) <=
    Number(product.target_price)
      ? "Target Achieved"
      : "Tracking"}
  </span>

</div>

                <div className="price-section">

                  <div className="price-row">

<span>

  <IndianRupee size={14} />

  Current Price

</span>
                    <strong>

                      ₹{currentPrice.toLocaleString("en-IN")}

                    </strong>

                  </div>

                  <div className="price-row">

<span>

  <Target size={14} />

  Target Price

</span>
                    <strong>

                      ₹{targetPrice.toLocaleString("en-IN")}

                    </strong>

                  </div>

                  <div className="price-row savings">

                    <span>Potential Saving</span>

                    <strong>

                      ₹{saving.toLocaleString("en-IN")}

                    </strong>

                  </div>

                </div>

                <div
                  className={
                    readyToBuy
                      ? "status-badge buy-now"
                      : "status-badge watching"
                  }
                >

                  <div className="status-dot"></div>

                  {readyToBuy
                    ? "Ready to Buy"
                    : "Watching"}

                </div>

                <a
                  href={product.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-product-btn"
                >
<>
  <ExternalLink size={16} />
  View Product
</>                </a>

                <div className="product-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleRefresh(product.id)
                    }
                    disabled={refreshingId === product.id}
                  >
<>
  <RefreshCw
    size={16}
    className={
      refreshingId === product.id ? "spin" : ""
    }
  />
  {refreshingId === product.id ? "Syncing..." : "Sync Price"}
</>                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditProduct(product);
                      setEditOpen(true);
                    }}
                  >
<>
  <Pencil size={16} />
  Edit
</>                  </button>

                  <button
                    className="history-btn"
                    onClick={() =>
                      openHistory(product.id)
                    }
                  >
<>
  <History size={16} />
  History
</>                  </button>

                </div>

                <button
                  className="delete-btn"
                  onClick={() => {

                    const confirmDelete =
                      window.confirm(
                        `Delete "${product.title}"?`
                      );

                    if (confirmDelete) {
                      handleDelete(product.id);
                    }

                  }}
                >
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                </button>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default ProductTable;