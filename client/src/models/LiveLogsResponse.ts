/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

export default class LiveLogsResponse extends ResponseBase {
  public LiveLogs: Array<string>;
}
