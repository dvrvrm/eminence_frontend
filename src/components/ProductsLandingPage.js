import ProductList from "./ProductsList";
import { useState, useEffect } from "react";

import classes from './ProductsLandingPage.module.css';


function ProductsLandingPage({ products }) {

  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fileredProductList, setFilteredProductList] = useState([]);

  const addCategory = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories(prev => ([...prev, category]))
    }
  }

  const removeCategory = (category) => {
    if (selectedCategories.includes(category)) {
      console.log(selectedCategories)
      const removedList = selectedCategories.filter((item) => (item !== category));
      setSelectedCategories(removedList);
    }
  }


  const resetCategory = () => {
    setSelectedCategories([]);
  }

  const getCategories = async () => {
    setLoading(true);

    await fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
      })
      .catch(err => alert(err))
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (products) {
      setProductList(products);
      setFilteredProductList(products);
      getCategories(); // get the categories list
    }
  }, [products])

  console.log("fileredProductList", fileredProductList);
  return (
    <div>
      <div className={classes.horizontalBar}>
        <span className={classes.categories}> Categories: </span>
        {
          categories.map((category) => (
            <div
              key={category}
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  removeCategory(category);
                } else {
                  addCategory(category);
                }
              }}
              className={classes.categoryItem}>
              {category.split("-").join(" ")}
            </div>
          ))
        }
        <div
          onClick={() => resetCategory()}
          className={`${(selectedCategories.length > 0) ? 'opacity-100' : 'opacity-0 pointer-events-none'} sticky right-0 w-fit h-full px-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer hover:text-blue-700 transition-all duration-300`}
        >
          clear
        </div>
      </div>
      {fileredProductList && <ProductList filteredProductList={fileredProductList} loading={loading} />}
    </div>
  );
}

export default ProductsLandingPage;
