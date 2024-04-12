import React, { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  useEffect(() => {
    // (afterRender)
    console.log("Fetching products in ", category);
    setProducts(["Clothing", "Household"]);
  }, [category]);

  return (
    <>
      <div>
        <h5>-= ProductList =-</h5>
      </div>
    </>
  );
};

export default ProductList;
