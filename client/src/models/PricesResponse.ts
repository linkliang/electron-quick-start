/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

import Price from "./Price";

export default class PricesResponse extends ResponseBase {
  public prices: Array<Price>;
}
