/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

import ResponseBase from "./ResponseBase";

import ProjectFile from "./ProjectFile";

export default class ProjectFilesResponse extends ResponseBase {
  public files: Array<ProjectFile>;
}
