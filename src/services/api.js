export async function getCategories() {
  try {
    const URL = 'https://api.mercadolibre.com/sites/MLB/categories';

    const response = await fetch(URL);
    const data = await response.json();

    return data;
  } catch (error) {
    return error.message;
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
}
