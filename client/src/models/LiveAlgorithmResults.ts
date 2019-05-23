/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

import LiveResultsData from "./LiveResultsData";

export default class LiveAlgorithmResults extends ResponseBase {
  public LiveResults: LiveResultsData;
}
