/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import MarketSymbol from "./MarketSymbol";

export default class Price {
  public Symbol: MarketSymbol;
  public symbol: string;
  public price: number;
  public updated: Date; // TODO: DoubleUnixSecondsDateTimeJsonConverter
}
