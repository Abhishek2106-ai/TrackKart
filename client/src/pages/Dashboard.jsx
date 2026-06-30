import { useState, useEffect } from "react";
import { useRef } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import SearchBar from "../components/SearchBar";
import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import HistoryModal from "../components/HistoryModal";
import EditProductModal from "../components/EditProductModal";
import ActivityFeed from "../components/ActivityFeed";
import { Package, BellRing, Wallet, TrendingDown, Plus } from "lucide-react";

import { getProducts } from "../services/productService";
import { useProducts } from "../context/ProductContext";

import "../styles/dashboard.css";

function Dashboard() {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
const statsRef = useRef(null);
const productsRef = useRef(null);
const activityRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [editOpen, setEditOpen] =
    useState(false);

  const [editProduct, setEditProduct] =
    useState(null);

  const { products, setProducts } =
    useProducts();

  useEffect(() => {

    async function loadProducts() {

      try {

        const data = await getProducts();

        if (Array.isArray(data)) {

          setProducts(data);

        }

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    loadProducts();

  }, [setProducts]);

  if (loading) {

    return (

      <div className="loading">

        Loading products...

      </div>

    );

  }

  return (

    <div className="dashboard">

<Sidebar
  statsRef={statsRef}
  productsRef={productsRef}
  activityRef={activityRef}
/>
      <div className="dashboard-content">

        <Topbar />

<div className="dashboard-header">

  <div>

    <h1>

      Dashboard

    </h1>

    <p>

      Track, monitor and manage your products.

    </p>

  </div>

</div>
        <div className="dashboard-actions">

  <button
    className="add-product-btn glass"
  onClick={() => setIsModalOpen(true)}
>
  <Plus size={18} />

  Add Product

</button>

        </div>

<section
  ref={statsRef}
  className="stats-container"
>
          <StatsCard
            icon={<Package size={24} />}
            title="Tracked Products"
            value={products.length}
          />

          <StatsCard
            icon={<BellRing size={24} />}
            title="Active Alerts"
            value={
              products.filter(
                (p) =>
                  Number(
                    p.current_price
                  ) <=
                  Number(
                    p.target_price
                  )
              ).length
            }
          />

          <StatsCard
            icon={<Wallet size={24} />}
            title="Money Saved"
            value={`₹${products
              .reduce(
                (sum, p) =>
                  sum +
                  Math.max(
                    0,
                    Number(
                      p.target_price
                    ) -
                      Number(
                        p.current_price
                      )
                  ),
                0
              )
              .toLocaleString("en-IN")}`}
          />



        </section>

        <SearchBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

<section
  ref={productsRef}
  className="products-section"
>
<ProductTable
          search={search}
          filter={filter}
          openHistory={(id) => {
            setSelectedProduct(id);
            setHistoryOpen(true);
          }}
          setEditOpen={setEditOpen}
          setEditProduct={setEditProduct}
        />
       </section>

<aside
  ref={activityRef}
  className="activity-wrapper"
>  <ActivityFeed />
</aside>
        <HistoryModal
          productId={selectedProduct}
          isOpen={historyOpen}
          onClose={() =>
            setHistoryOpen(false)
          }
        />

        <EditProductModal
          isOpen={editOpen}
          onClose={() =>
            setEditOpen(false)
          }
          product={editProduct}
          setProducts={setProducts}
        />

        <AddProductModal
          isOpen={isModalOpen}
          onClose={() =>
            setIsModalOpen(false)
          }
        />

      </div>

    </div>

  );

}

export default Dashboard;