/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from './ResponseBase';
import CompileState from '../enums/CompileState';

export default class CompileResponse extends ResponseBase {
  public compileId: string;
  public state: CompileState;
  public logs: Array<string>;
}
