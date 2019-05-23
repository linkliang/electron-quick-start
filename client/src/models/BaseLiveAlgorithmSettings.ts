/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import BrokerageEnvironment from "../enums/BrokerageEnvironment";

export default class BaseLiveAlgorithmSettings {
  public id: string;
  public user: string;
  public password: string;
  public environment: BrokerageEnvironment;
  public account: string;
}
