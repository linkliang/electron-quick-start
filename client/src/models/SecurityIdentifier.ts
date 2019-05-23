/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import SecurityType from "../enums/SecurityType";

export default class SecurityIdentifier {
  public Market: string;
  public Symbol: string;
  public SecurityType: SecurityType;
}
