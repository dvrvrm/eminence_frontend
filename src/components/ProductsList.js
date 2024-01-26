import classes from './ProductsList.module.css';

function ProductsList({filteredProductList}) {
  return (
    <div className={classes.products}>
      <h1>All Products</h1>
      <div className={classes.list}>
        {filteredProductList.map((product) => (
          <div key={product.id} className={classes.item}>
              <img src={product.thumbnail} alt={product.title} />
              <div className={classes.content}>
                <p>{product.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
