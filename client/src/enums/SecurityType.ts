/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

/*
 * All security types can be used
 */
enum SecurityType {
  Base = 'base',
  Equity = 'equity',
  Option = 'option',
  Commodity = 'commodity',
  Forex = 'forex',
  Future = 'future',
  Cfd = 'cfd',
  Crypto = 'crypto',
}

export default SecurityType;
