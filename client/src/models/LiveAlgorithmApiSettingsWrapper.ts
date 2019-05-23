/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import BaseLiveAlgorithmSettings from "./BaseLiveAlgorithmSettings";

export default class LiveAlgorithmApiSettingsWrapper {
  public versionId: string;
  public projectId: number;
  public compileId: string;
  public serverType: string;
  public brokerage: BaseLiveAlgorithmSettings;
}
