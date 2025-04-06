import {
 // fetchProductByCategoryId,
  fetchProducts,
} from "@/app/action/productsbase/dbOperation";
import { ProductType } from "@/lib/types/productType";
import React, { useEffect, useState } from "react";
import PageProductDetailComponent from "./PageProductDetailComponent";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { fetchAddOnProducts } from "@/app/action/productsaddon/dbOperation";
import SearchForm from "./SearchForm";

export default function Products() {
  const { productCategoryIdG } = UseSiteContext();
  const [products, setProduct] = useState<ProductType[]>([]);
  const [allProducts, setAllProduct] = useState<ProductType[]>([]);
  const [allAddOns, setAllAddOns] = useState<ProductType[]>([]);
  useEffect(() => {
    async function fetchAddOn() {
      const result = await fetchAddOnProducts();
    setAllAddOns(result);
    }
    fetchAddOn();
    // console.log("productCategoryIdG -------------", productCategoryIdG)
    if (productCategoryIdG === "") {
      async function fetchproductData() {
        const productData = await fetchProducts();
        productData.sort((a, b) => a.sortOrder - b.sortOrder);
        setAllProduct(productData);
        setProduct(productData);
      }
      fetchproductData();
    } else {
      async function fetchproductData() {
        // const productData = await fetchProductByCategoryId(productCategoryIdG);
        const filtertedProduct = allProducts.filter(
          (item) => item.categoryId === productCategoryIdG
        );
        filtertedProduct.sort(
          (a: ProductType, b: ProductType) => a.sortOrder! - b.sortOrder!
        );

        setProduct(filtertedProduct);
      }
      fetchproductData();
    }
  }, [productCategoryIdG]);
  function handleSearchForm(e:string){
    
    //console.log("search text-----------", e)
    const searchedProduct = allProducts.filter(item =>
    item.name.toLowerCase().includes(e.toLowerCase())
  );
  setProduct(searchedProduct);
  }
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-1 md:gap-2 w-full">
      <div className="flex items-center gap-2"><SearchForm handleSearchForm={handleSearchForm} /><div className="flex items-center bg-slate-100 rounded-full py-1 px-2 text-sm font-light md:font-normal">Gericht suchen oder Kategorie auswählen</div></div>  
      <div className="flex flex-col md:flex-row md:flex-wrap md:mt-3 gap-1 md:gap-5 w-full">
      {products.map((product, i) => {
        return <PageProductDetailComponent key={i} allAddOns={allAddOns} product={product} />;
      })}
      </div>
    </div>
  );
}
