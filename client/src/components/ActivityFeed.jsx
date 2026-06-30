import { useProducts } from "../context/ProductContext";
import { PackageCheck, IndianRupee, PartyPopper } from "lucide-react";

function ActivityFeed() {
  const { products } = useProducts();

  const activities = [];

  products.forEach((product) => {
    const createdAt = product.created_at
      ? new Date(product.created_at)
      : new Date();

    const updatedAt = product.updated_at
      ? new Date(product.updated_at)
      : createdAt;

    // Product Added
    activities.push({
      id: `${product.id}-1`,
      icon: <PackageCheck size={20} />,
      title: "Product Added",
      description: product.title,
      timestamp: createdAt.getTime(),
time: createdAt.toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
}),    });

    // Latest Price
    activities.push({
      id: `${product.id}-2`,
      icon: <IndianRupee size={20} />,
      title: "Price Updated",
      description: `Current Price ₹${Number(
        product.current_price
      ).toLocaleString("en-IN")}`,
      timestamp: updatedAt.getTime(),
time: updatedAt.toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
}),    });

    // Target reached
    if (
      Number(product.current_price) <=
      Number(product.target_price)
    ) {
      activities.push({
        id: `${product.id}-3`,
        icon: <PartyPopper size={20} />,
        title: "Target Price Reached",
        description: `${product.title} is now available for ₹${Number(
          product.current_price
        ).toLocaleString("en-IN")}`,
        timestamp: updatedAt.getTime() + 1,
time: updatedAt.toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
}),      });
    }
  });

  // Most recent activity first, oldest last
  activities.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="activity-feed">

      <div className="section-title">
        <h2>Recent Activity</h2>
        <span>{activities.length} Events</span>
      </div>

      {activities.length === 0 ? (

        <div className="empty-activity">

          <h3>No Activity Yet</h3>

          <p>
            Your latest product updates,
            alerts and price changes will
            appear here.
          </p>

        </div>

      ) : (

        <div className="activity-list">

          {activities
            .slice(0, 8)
            .map((activity) => (

              <div
                className="activity-item"
                key={activity.id}
              >

                <div className="activity-icon">
                  {activity.icon}
                </div>

                <div className="activity-content">

                  <h4>
                    {activity.title}
                  </h4>

                  <p>
                    {activity.description}
                  </p>

                </div>

                <div className="activity-time">

                  {activity.time}

                </div>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}

export default ActivityFeed;
