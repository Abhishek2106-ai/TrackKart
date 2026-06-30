import { useEffect, useState } from "react";
import { getPriceHistory } from "../services/productService";
import PriceHistoryChart from "./PriceHistoryChart";
import {
  X,
  LineChart,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";

function HistoryModal({
  productId,
  isOpen,
  onClose,
}) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!productId || !isOpen) return;

    async function loadHistory() {
      try {
        setLoading(true);

        const data = await getPriceHistory(productId);

        setHistory(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [productId, isOpen]);

  if (!isOpen) return null;

  const current =
    history.length
      ? Number(history[history.length - 1].price)
      : 0;

  const lowest =
    history.length
      ? Math.min(
          ...history.map((h) => Number(h.price))
        )
      : 0;

  const highest =
    history.length
      ? Math.max(
          ...history.map((h) => Number(h.price))
        )
      : 0;

  // Newest first for the timeline list
  const timeline = history.slice().reverse();

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal history-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="history-modal-header">

          <div className="section-title">
            <h2>
              <LineChart size={20} />
              Price Analytics
            </h2>
            <span>
              {history.length} Records
            </span>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>

        </div>

        <div className="history-modal-body">

          {loading ? (

            <div className="empty-activity">
              Loading Price History...
            </div>

          ) : (

            <>

              <div className="analytics-grid">

                <div className="analytics-card">
                  <span>Current Price</span>
                  <h3>
                    ₹
                    {current.toLocaleString("en-IN")}
                  </h3>
                </div>

                <div className="analytics-card">
                  <span>Lowest Price</span>
                  <h3 className="text-success">
                    ₹
                    {lowest.toLocaleString("en-IN")}
                  </h3>
                </div>

                <div className="analytics-card">
                  <span>Highest Price</span>
                  <h3 className="text-danger">
                    ₹
                    {highest.toLocaleString("en-IN")}
                  </h3>
                </div>

              </div>

              <PriceHistoryChart
                history={history}
              />

              <h3 className="timeline-heading">
                Price Timeline
              </h3>

              {timeline.length === 0 ? (

                <div className="empty-activity">

                  No price history available.

                </div>

              ) : (

                <div className="history-table">

                  {timeline.map((item, index) => {

                    const previous = timeline[index + 1];

                    let TrendIcon = Minus;
                    let trendClass = "neutral";

                    if (
                      previous &&
                      Number(item.price) <
                        Number(previous.price)
                    ) {
                      TrendIcon = TrendingDown;
                      trendClass = "down";
                    }

                    if (
                      previous &&
                      Number(item.price) >
                        Number(previous.price)
                    ) {
                      TrendIcon = TrendingUp;
                      trendClass = "up";
                    }

                    return (

                      <div
                        className="history-row"
                        key={item.id}
                      >

                        <div>

                          <strong>
                            ₹
                            {Number(
                              item.price
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </div>

                        <div className={`history-trend ${trendClass}`}>

                          <TrendIcon size={16} />

                        </div>

                        <div className="history-date">

                          {new Date(
                            item.created_at
                          ).toLocaleString(
                            "en-IN"
                          )}

                        </div>

                      </div>

                    );

                  })}

                </div>

              )}

            </>

          )}

        </div>

        <button
          className="close-modal-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default HistoryModal;
