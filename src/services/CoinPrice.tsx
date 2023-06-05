import axios from 'axios';

const getCoinPriceBySymbol = async (symbol: string, currency: string): Promise<number | null> => {
  try {
    // Step 1: Get the list of supported coins
    const coinsListUrl = 'https://api.coingecko.com/api/v3/coins/list';
    const { data: coinsList } = await axios.get(coinsListUrl);

    // Step 2: Find the coin ID for the given symbol
    const coin = coinsList.find((coin: { symbol: string }) => coin.symbol === symbol.toLowerCase());
    if (!coin) {
      throw new Error('Coin not found');
    }

    // Step 3: Get the price of the coin in the specified currency
    const coinPriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=${currency}`;
    const { data: coinPrice } = await axios.get(coinPriceUrl);

    if (coinPrice && coinPrice[coin.id] && coinPrice[coin.id][currency]) {
      return coinPrice[coin.id][currency];
    }

    return null;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
};

export default getCoinPriceBySymbol;





