const API_KEY = "4db0db80-7db7-4f51-9b07-a6511d79668a";
const BASE_URL = "https://apilist.tronscanapi.com";

export async function getTronBalance(address: string) {
  try {
    const headers = {
      "TRON-PRO-API-KEY": API_KEY,
      "Content-Type": "application/json"
    };

    // Buscar saldo TRX
    const accountResponse = await fetch(`${BASE_URL}/api/account?address=${address}`, {
      method: 'GET',
      headers
    });

    if (!accountResponse.ok) {
      throw new Error(`API Error: ${accountResponse.status}`);
    }

    const accountData = await accountResponse.json();
    const result = {
      TRX: (accountData.balance || 0) / 1_000_000,
      TRC20: {}
    };

    // Buscar tokens TRC20
    try {
      const tokenResponse = await fetch(`${BASE_URL}/api/account/tokens?address=${address}&start=0&limit=50`, {
        method: 'GET',
        headers
      });

      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        if (tokenData.data && Array.isArray(tokenData.data)) {
          for (const token of tokenData.data) {
            const symbol = token.tokenName || token.tokenAbbr || "UNKNOWN";
            const decimals = parseInt(token.tokenDecimal?.toString() || "0");
            const rawBalance = token.balance || token.quantity || "0";
            
            if (rawBalance && rawBalance !== "0") {
              const balance = decimals > 0 
                ? parseFloat(rawBalance) / Math.pow(10, decimals)
                : parseFloat(rawBalance);
              
              if (balance > 0) {
                result.TRC20[symbol] = balance;
              }
            }
          }
        }
      }
    } catch (e) {
      console.warn("Erro ao buscar tokens:", e);
    }

    return result;
  } catch (error) {
    throw new Error(`Network Error: ${error.message}`);
  }
}