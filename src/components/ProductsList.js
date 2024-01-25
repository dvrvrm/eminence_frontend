import classes from './ProductsList.module.css';

function ProductsList({products}) {
  return (
    <div className={classes.products}>
      <h1>All Products</h1>
      <ul className={classes.list}>
        {products.map((product) => (
          <li key={product.id} className={classes.item}>
            <div>
              <img src={product.thumbnail} alt={product.title} />
              <div className={classes.content}>
                <h2>{product.title}</h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
