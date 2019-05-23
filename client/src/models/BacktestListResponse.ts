/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

import Backtest from "./Backtest";

export default class BacktestListResponse extends ResponseBase {
  public backtests: Array<Backtest>;
}
