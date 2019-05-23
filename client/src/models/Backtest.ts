/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

export default class Backtest extends ResponseBase {
  public name: string;
  public note: string;
  public backtestId: string;
  public completed: boolean;
  public progress: number;
  public result: any;
  public error: string;
  public stacktrace: string;
  public created: Date;
}
