import axios from 'axios';

const getCoinPriceBySymbols = async (
  symbols: string[],
  currency: string,
): Promise<{ [symbol: string]: number | undefined }> => {
  try {
    // Step 1: Get the list of supported coins
    const coinsListUrl = 'https://api.coingecko.com/api/v3/coins/list';
    const { data: coinsList } = await axios.get(coinsListUrl);

    // Step 2: Create an object to store the coin prices
    const coinPrices: { [symbol: string]: number | undefined } = {};

    // Step 3: Find the coin IDs for the given symbols
    const coinIds = symbols.map((symbol) => {
      const coin = coinsList.find((coin: { symbol: string }) => coin.symbol.toLowerCase() === symbol.toLowerCase());
      if (!coin) {
        return null;
      }
      return coin.id;
    });

    // Step 4: Get the prices of the coins in the specified currency
    const coinPriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds
      .filter(Boolean)
      .join(',')}&vs_currencies=${currency}`;
    const { data: coinPrice } = await axios.get(coinPriceUrl);

    // Step 5: Store the prices in the coinPrices object
    symbols.forEach((symbol) => {
      const coinId = coinIds[symbols.indexOf(symbol)];
      if (coinId && coinPrice && coinPrice[coinId] && coinPrice[coinId][currency]) {
        coinPrices[symbol] = coinPrice[coinId][currency];
      } else {
        coinPrices[symbol] = undefined;
      }
    });

    return coinPrices;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return {};
  }
};

export default getCoinPriceBySymbols;
