/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import SplitType from "../enums/SplitType";

export default class Split {
  public Type: SplitType;
  public SplitFactor: number;
  public ReferencePrice: number;
}
