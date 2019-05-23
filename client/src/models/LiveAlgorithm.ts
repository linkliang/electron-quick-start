/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";
import AlgorithmStatus from "../enums/AlgorithmStatus";

export default class LiveAlgorithm extends ResponseBase {
  public projectId: number;
  public deployId: string;
  public status: AlgorithmStatus;
  public launched: Date;
  public stopped?: Date;
  public brokerage: string;
  public subscription: string;
  public error: string;
}
