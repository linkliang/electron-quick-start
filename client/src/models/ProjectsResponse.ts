/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

import Project from "./Project";

export default class ProjectsResponse extends ResponseBase {
  public projects: Array<Project>;
}
