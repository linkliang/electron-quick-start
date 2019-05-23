/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

/*
 *All algorithm status can be used
 */
enum AlgorithmStatus {
  DeployError = 0,
  InQueue = 1,
  Running = 2,
  Stopped = 3,
  Liquidated = 4,
  Deleted = 5,
  Completed = 6,
  RuntimeError = 7,
  Invalid = 8,
  LoggingIn = 9,
  Initializing = 10,
  History = 11,
}

export default AlgorithmStatus;
