const API = `${import.meta.env.VITE_API_URL}/products`;

export const getProducts = async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const res = await fetch(
    `${API}?user_id=${user.id}`
  );

  return await res.json();

};

export const createProduct = async (product) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return await res.json();
};

export const deleteProductApi = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};

export const extractProduct = async (url) => {
  const res = await fetch(
`${import.meta.env.VITE_API_URL}/extract`,
 {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );

  return await res.json();
};


export const getPriceHistory = async (
  productId
) => {

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/history/${productId}`
  );

  return await res.json();

};

export const updateProductApi =
  async (
    id,
    target_price
  ) => {

    const res =
      await fetch(
        `${API}/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            target_price,
          }),
        }
      );

    return await res.json();

};

export const refreshProductApi = async (id) => {
  const res = await fetch(`${API}/${id}/refresh`, {
    method: "POST",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to refresh price");
  }

  return await res.json();
};