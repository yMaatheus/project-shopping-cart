require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  const search = 'computador';
  test('fetchProducts é uma função', async () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toBe('function');
  });
  test('Execute a função fetchProducts com o argumento "computador" e teste se fetch foi chamada', async () => {
    expect.assertions(1);
    await fetchProducts(search);
    expect(fetch).toHaveBeenCalled();
  });
  test('Ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    expect.assertions(1);
    await fetchProducts(search);
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(URL);
  });
  test('O retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
    expect.assertions(1);
    const products = await fetchProducts(search);
    const { results } = computadorSearch;
    expect(products).toEqual(results);
  });
  test('Ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'))
    }
  });
});
