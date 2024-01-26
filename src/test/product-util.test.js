import { getCategories } from '../util/product-utils';

test('getCategories returns an empty array for an empty productList', () => {
  const productList = [];
  const result = getCategories(productList);
  expect(result).toEqual([]);
});

test('getCategories returns unique categories from the productList', () => {
  const productList = [
    { id: 1, category: 'Electronics' },
    { id: 2, category: 'Clothing' },
    { id: 3, category: 'Electronics' },
    { id: 4, category: 'Clothing' },
    { id: 5, category: 'Books' },
  ];
  const result = getCategories(productList);
  expect(result).toEqual(['Electronics', 'Clothing', 'Books']);
});

test('getCategories returns all categories when there are no duplicates', () => {
  const productList = [
    { id: 1, category: 'Electronics' },
    { id: 2, category: 'Clothing' },
    { id: 3, category: 'Books' },
  ];
  const result = getCategories(productList);
  expect(result).toEqual(['Electronics', 'Clothing', 'Books']);
});
