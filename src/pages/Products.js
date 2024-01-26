import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import ProductsLandingPage from '../components/ProductsLandingPage';
import RedirectPage from './RedirectPage';

function ProductsPage() {
  const { products } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={products} errorElement={<RedirectPage />} >
        {(loadedProduts) => {
          if (loadedProduts && loadedProduts.length > 0) {
            return <ProductsLandingPage products={loadedProduts} />
          }}}
      </Await>
    </Suspense>
  );
}

export default ProductsPage;

async function loadProducts() {

  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8080/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    }
  });

  if (response.status === 401) {
    throw json(
      { message: 'Token has expired.' },
      {
        status: 401,
      }
    );
  }

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch products.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch products.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch products.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.products;
  }
}

export function loader() {
  return defer({
    products: loadProducts(),
  });
}
