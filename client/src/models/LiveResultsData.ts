/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import Resolution from "../enums/Resolution";

export default class LiveResultsData {
  public version: number;
  public resolution: Resolution;
  public results: any;
}
