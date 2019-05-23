/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

import LiveAlgorithm from "./LiveAlgorithm";

export default class LiveAlgorithmsResponse extends ResponseBase {
  public live: Array<LiveAlgorithm>;
}
