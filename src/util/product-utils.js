
export function getCategories(productList) {
    console.log(productList);
    const ncat = [];
    productList.forEach((item) => {
        if (!ncat.includes(item.category)) {
            ncat.push(item.category);
        }
    });
    return ncat;
}