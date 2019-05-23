/*
 * QUANTCONNECT.COM - Democratizing Finance, Empowering Individuals.
 * Skylight Electron Application V1.0.Copyright 2019 QuantConnect Corporation.
*/

const sha256 = require('sha256');
const $ = require('jquery');
const moment = require('moment-timezone');

import ResponseBase from '../models/ResponseBase';
import Language from '../enums/Language';
import ProjectsResponse from '../models/ProjectsResponse';
import ProjectFilesResponse from '../models/ProjectFilesResponse';
import CompileResponse from '../models/CompileResponse';
import Backtest from '../models/Backtest';
import BacktestListResponse from '../models/BacktestListResponse';
import BaseLiveAlgorithmSettings from '../models/BaseLiveAlgorithmSettings';
import LiveAlgorithm from '../models/LiveAlgorithm';
import LiveAlgorithmApiSettingsWrapper from '../models/LiveAlgorithmApiSettingsWrapper';
import AlgorithmStatus from '../enums/AlgorithmStatus';
import LiveAlgorithmsResponse from '../models/LiveAlgorithmsResponse';
import LiveAlgorithmResults from '../models/LiveAlgorithmResults';
import LiveLogsResponse from '../models/LiveLogsResponse';
import MarketSymbol from '../models/MarketSymbol';
import Resolution from '../enums/Resolution';
import LinkResponse from '../models/LinkResponse';
import BacktestReportResponse from '../models/BacktestReportResponse';
import Split from '../models/Split';
import Dividend from '../models/Dividend';

const DEFAULT_API_URL = 'https://www.quantconnect.com/api/v2/';

export class QuantConnectApi {


  private readonly userId: string;
  private readonly token: string;
  private readonly apiUrl: string;

  /**
   * @constructor
   * @param userId 
   * @param token 
   * @param apiUrl 
   */
  constructor(userId: string, token: string, apiUrl?: string) {
    this.userId = userId;
    this.token = token;
    this.apiUrl = apiUrl || DEFAULT_API_URL;
  }

  /**
   * Authenticate with the data
   * @param success 
   * @param failure 
   */
  public Authenticate(
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
    };
    this.ExecuteRequest('GET', 'authenticate', data, success, failure);
  }

  /**
     * Create the project
     * @param projectName
     * @param language
     * @param files
     * @param success
     * @param failure
     * @constructor
     */
  public CreateProject(
    projectName: string,
    language: Language,
    success?: (response: ProjectsResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      name: projectName,
      language: language,
    };
    this.ExecuteRequest('POST', 'projects/create', data, success, failure);
  }

  /**
   * Read the project
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public ReadProject(
    projectId: number,
    success?: (response: ProjectsResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('POST', 'projects/read', data, success, failure);
  }

  /**
   * List the projects
   * @param success 
   * @param failure 
   */
  public ListProjects(
    success?: (response: ProjectsResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
    };
    this.ExecuteRequest('POST', 'projects/read', data, success, failure);
  }

  /**
   * Add the project file
   * @param projectId 
   * @param name 
   * @param content 
   * @param success 
   * @param failure 
   */
  public AddProjectFile(
    projectId: number,
    name: string,
    content: string,
    success?: (response: ProjectFilesResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      name: name,
      content: content,
    };
    this.ExecuteRequest('POST', 'files/create', data, success, failure);
  }

  /**
   * Update project filename
   * @param projectId 
   * @param oldFileName 
   * @param newFileName 
   * @param success 
   * @param failure 
   */
  public UpdateProjectFileName(
    projectId: number,
    oldFileName: string,
    newFileName: string,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      name: oldFileName,
      newName: newFileName,
    };
    this.ExecuteRequest('POST', 'files/update', data, success, failure);
  }

  /**
   * Update the project's file content
   * @param projectId 
   * @param fileName 
   * @param newFileContents 
   * @param success 
   * @param failure 
   */
  public UpdateProjectFileContent(
    projectId: number,
    fileName: string,
    newFileContents: string,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      name: fileName,
      content: newFileContents,
    };
    this.ExecuteRequest('POST', 'files/update', data, success, failure);
  }

  /**
   * Read project files
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public ReadProjectFiles(
    projectId: number,
    success?: (response: ProjectFilesResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('GET', 'files/read', data, success, failure);
  }

  /**
   * Read a project file
   * @param projectId 
   * @param fileName 
   * @param success 
   * @param failure 
   */
  public ReadProjectFile(
    projectId: number,
    fileName: string,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      name: fileName,
    };
    this.ExecuteRequest('GET', 'files/read', data, success, failure);
  }

  /**
   * Delete file
   * @param projectId 
   * @param fileName 
   * @param success 
   * @param failure 
   */
  public DeleteFile(
    projectId: number,
    fileName: string,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      name: fileName,
    };
    this.ExecuteRequest('POST', 'files/delete', data, success, failure);
  }

  /**
   * Delete the project
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public DeleteProject(
    projectId: number,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('POST', 'projects/delete', data, success, failure);
  }

  /**
   * Create compile
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public CreateCompile(
    projectId: number,
    success?: (response: CompileResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('POST', 'compile/create', data, success, failure);
  }

  /**
   * Read compile
   * @param projectId 
   * @param compileId 
   * @param success 
   * @param failure 
   */
  public ReadCompile(
    projectId: number,
    compileId: string,
    success?: (response: CompileResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      compileId: compileId,
    };
    this.ExecuteRequest('GET', 'compile/read', data, success, failure);
  }

  /**
   * Create backtest
   * @param projectId 
   * @param compileId 
   * @param backtestName 
   * @param success 
   * @param failure 
   */
  public CreateBacktest(
    projectId: number,
    compileId: string,
    backtestName: string,
    success?: (response: Backtest) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      compileId: compileId,
      backtestName: backtestName,
    };
    this.ExecuteRequest('POST', 'backtests/create', data, success, failure);
  }

  /**
   * Read back test
   * @param projectId 
   * @param backtestId 
   * @param success 
   * @param failure 
   */
  public ReadBacktest(
    projectId: number,
    backtestId: string,
    success?: (response: Backtest) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      backtestId: backtestId,
    };
    this.ExecuteRequest('GET', 'backtests/read', data, success, failure);
  }

  /**
   * Update the backtest
   * @param projectId 
   * @param backtestId 
   * @param name 
   * @param note 
   * @param success 
   * @param failure 
   */
  public UpdateBacktest(
    projectId: number,
    backtestId: string,
    name: string = '',
    note: string = '',
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      backtestId: backtestId,
      name: name,
      note: note,
    };
    this.ExecuteRequest('POST', 'backtests/update', data, success, failure);
  }

  /**
   * ListBacktests
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public ListBacktests(
    projectId: number,
    success?: (response: BacktestListResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('GET', 'backtests/read', data, success, failure);
  }

  /**
   * Delete backtest
   * @param projectId 
   * @param backtestId 
   * @param success 
   * @param failure 
   */
  public DeleteBacktest(
    projectId: number,
    backtestId: string,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      backtestId: backtestId,
    };
    this.ExecuteRequest('POST', 'backtests/delete', data, success, failure);
  }

  /**
   * Create live algorithm
   * @param projectId 
   * @param compileId 
   * @param serverType 
   * @param baseLiveAlgorithmSettings 
   * @param versionId 
   * @param success 
   * @param failure 
   */
  public CreateLiveAlgorithm(
    projectId: number,
    compileId: string,
    serverType: string,
    baseLiveAlgorithmSettings: BaseLiveAlgorithmSettings,
    versionId: string = '-1',
    success?: (response: LiveAlgorithm) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data: LiveAlgorithmApiSettingsWrapper = {
      versionId: versionId,
      projectId: projectId,
      compileId: compileId,
      serverType: serverType,
      brokerage: baseLiveAlgorithmSettings,
    };
    this.ExecuteRequest('POST', 'live/create', data, success, failure);
  }

  /**
   * List live algorithms
   * @param status 
   * @param startTime 
   * @param endTime 
   * @param success 
   * @param failure 
   */
  public ListLiveAlgorithms(
    status?: AlgorithmStatus,
    startTime?: Date,
    endTime?: Date,
    success?: (response: LiveAlgorithmsResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    if (status
      && status !== AlgorithmStatus.Running
      && status !== AlgorithmStatus.RuntimeError
      && status !== AlgorithmStatus.Stopped
      && status !== AlgorithmStatus.Liquidated
    ) {
      throw new Error('The Api only supports Algorithm Statuses of Running, Stopped, RuntimeError and Liquidated');
    }
    startTime = startTime || new Date(0);
    endTime = endTime || new Date();
    const data: any = {
      start: Math.round((startTime).getTime() / 1000),
      end: Math.round((endTime).getTime() / 1000),
    };
    if (status) {
      data.status = status;
    }
    this.ExecuteRequest('GET', 'live/read', data, success, failure);
  }

  /**
   * Read live algorithm
   * @param projectId 
   * @param deployId 
   * @param success 
   * @param failure 
   */
  public ReadLiveAlgorithm(
    projectId: number,
    deployId: string,
    success?: (response: LiveAlgorithmResults) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      deployId: deployId,
    };
    this.ExecuteRequest('GET', 'live/read', data, success, failure);
  }

  /**
   * Liquidate live algorithm
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public LiquidateLiveAlgorithm(
    projectId: number,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('POST', 'live/update/liquidate', data, success, failure);
  }

  /**
   * Stop live algorithm
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public StopLiveAlgorithm(
    projectId: number,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('POST', 'live/update/stop', data, success, failure);
  };

  /**
   * Read live logs
   * @param projectId 
   * @param algorithmId 
   * @param startTime 
   * @param endTime 
   * @param success 
   * @param failure 
   */
  public ReadLiveLogs(
    projectId: number,
    algorithmId: string,
    startTime?: Date,
    endTime?: Date,
    success?: (response: LiveLogsResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    startTime = startTime || new Date(0); // TODO: Adjust & test
    endTime = endTime || new Date();
    const data = {
      format: 'json',
      projectId: projectId,
      algorithmId: algorithmId,
      start: Math.round((startTime).getTime() / 1000),
      end: Math.round((endTime).getTime() / 1000),
    };
    this.ExecuteRequest('GET', 'live/read/log', data, success, failure);
  }

  /**
   * Read data link
   * @param symbol 
   * @param resolution 
   * @param date 
   * @param success 
   * @param failure 
   */
  public ReadDataLink(
    symbol: MarketSymbol,
    resolution: Resolution,
    date: Date,
    success?: (response: LinkResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      format: 'link',
      ticker: symbol.Value.toLowerCase(),
      type: symbol.ID.SecurityType,
      market: symbol.ID.Market,
      resolution: resolution,
      date: moment(date).format('yyyyMMdd'),
    };
    this.ExecuteRequest('GET', 'data/read', data, success, failure);
  }

  /**
   * Read back test report
   * @param projectId 
   * @param backtestId 
   * @param success 
   * @param failure 
   */
  public ReadBacktestReport(
    projectId: number,
    backtestId: string,
    success?: (response: BacktestReportResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      backtestId: backtestId,
    };
    this.ExecuteRequest('POST', 'backtests/read/report', data, success, failure);
  }

  /**
   * Read prices
   * @param sybmols 
   * @param success 
   * @param failure 
   */
  public ReadPrices(
    sybmols: Array<MarketSymbol>,
    success?: (response: BacktestReportResponse) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      symbols: sybmols.map(s => s.ID.toString()), // TODO: implement toString()
    };
    this.ExecuteRequest('POST', 'prices', data, success, failure);
  }

  // TODO: Implement DownloadData method
  /**
   * Get splits
   * @param from 
   * @param to 
   * @param success 
   * @param failure 
   */
  public GetSplits(
    from: Date,
    to: Date,
    success?: (response: Array<Split>) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      from: moment(from).format('yyyyMMdd'),
      to: moment(to).format('yyyyMMdd'),
    };
    this.ExecuteRequest('POST', 'prices', data, <any>success, failure); // WARN: not ResponseBase
  }

  /**
   * Get dividends
   * @param from 
   * @param to 
   * @param success 
   * @param failure 
   */
  public GetDividends(
    from: Date,
    to: Date,
    success?: (response: Array<Dividend>) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      from: moment(from).format('yyyyMMdd'),
      to: moment(to).format('yyyyMMdd'),
    };
    this.ExecuteRequest('POST', 'dividends', data, <any>success, failure); // WARN: not ResponseBase
  }

  // ******************************************************
  // *** METHODS BELOW ARE NOT PRESENT IN LEAN API CODE ***
  // ******************************************************

  /**
   * Update project
   * @param projectId 
   * @param data 
   * @param success 
   * @param failure 
   */
  public UpdateProject(
    projectId: number,
    data: any = {},
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    data['projectId'] = projectId;
    this.ExecuteRequest('POST', 'projects/update', data, success, failure);
  }

  /**
   * Update live
   * @param projectId 
   * @param data 
   * @param success 
   * @param failure 
   */
  public UpdateLive(
    projectId: number,
    data: any = {},
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    data['projectId'] = projectId;
    this.ExecuteRequest('POST', 'live/update', data, success, failure);
  }

  /**
   * Command
   * @param projectId 
   * @param algorithmId 
   * @param userCommand 
   * @param success 
   * @param failure 
   */
  public Command(
    projectId: number,
    algorithmId: any,
    userCommand: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      algorithmId: algorithmId,
      userCommand: userCommand
    };
    this.ExecuteRequest('GET', 'command/create', data, success, failure);
  }

  /**
   * Get back test logs
   * @param projectId 
   * @param backtestId 
   * @param start 
   * @param end 
   * @param success 
   * @param failure 
   */
  public GetBacktestLogs(
    projectId: number,
    backtestId: any,
    start: any,
    end: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      'projectId': projectId,
      'start': start,
      'end': end,
      'backtestId': backtestId,
      'format': 'json'
    };
    this.ExecuteRequest('GET', 'backtests/read/log', data, success, failure);
  }

  /**
   * Get back test insights
   * @param projectId 
   * @param backtestId 
   * @param success 
   * @param failure 
   */
  public GetBacktestInsights(
    projectId: number,
    backtestId: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      'projectId': projectId,
      'backtestId': backtestId,
    };
    this.ExecuteRequest('GET', 'backtests/read/insights', data, success, failure);
  }

  /**
   * Get algorithm assets
   * @param projectId 
   * @param compileId 
   * @param success 
   * @param failure 
   */
  public GetAlgorithmAssets(
    projectId: number,
    compileId: string,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      'projectId': projectId,
      'compileId': compileId,
    };
    this.ExecuteRequest('POST', 'compile/assets/read', data, success, failure);
  }

  /**
   * Get live deployment status
   * @param success 
   * @param failure 
   */
  public GetLiveDeploymentStatus(
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {};
    this.ExecuteRequest('POST', 'live/status', data, success, failure);
  }

  /**
   * Get markets
   * @param holdingsIds 
   * @param success 
   * @param failure 
   */
  public GetMarkets(
    holdingsIds: [string],
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      holdings: 'EURUSD 5O,SPY R735QTJ8XC9X,BTCUSD XJ',
    };
    for (let i in holdingsIds) {
      if (holdingsIds.hasOwnProperty(i)) {
        data.holdings += (',' + holdingsIds[i]);
      }
    }
    this.ExecuteRequest('POST', 'services/exchanges/status', data, success, failure);
  }

  /**
   * Get exchange status
   * @param exchanges 
   * @param success 
   * @param failure 
   */
  public GetExchangesStatus(
    exchanges: [string],
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    console.warn('Using deprecated method GetExchangesStatus');
    const data = {
      exchanges: exchanges,
    };
    this.ExecuteRequest('POST', 'live/exchanges/status', data, success, failure);
  }

  /**
   * Get project files
   * @param projectId 
   * @param success 
   * @param failure 
   */
  public GetProjectFiles(
    projectId: number,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
    };
    this.ExecuteRequest('POST', 'files/read', data, success, failure);
  }

  /**
   * Add library
   * @param projectId 
   * @param libraryId 
   * @param success 
   * @param failure 
   */
  public AddLibrary(
    projectId: number,
    libraryId: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      libraryId: libraryId,
    };
    this.ExecuteRequest('POST', 'projects/library/create', data, success, failure);
  }

  /**
   * Remove library
   * @param projectId 
   * @param libraryId 
   * @param success 
   * @param failure 
   */
  public RemoveLibrary(
    projectId: number,
    libraryId: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      libraryId: libraryId,
    };
    this.ExecuteRequest('POST', 'projects/library/delete', data, success, failure);
  }

  /**
   * GEt backtest report
   * @param backtestId 
   * @param success 
   * @param failure 
   */
  public GetBacktestReport(
    backtestId: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      backtestId: backtestId,
    };
    this.ExecuteRequest('POST', 'terminal/processReports/read/status', data, success, failure);
  }

  /**
   * Create live order
   * @param projectId 
   * @param deployId 
   * @param order 
   * @param success 
   * @param failure 
   */
  public CreateLiveOrder(
    projectId: number,
    deployId: any,
    order: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      deployId: deployId,
      order: order,
    };
    this.ExecuteRequest('POST', 'live/orders/create', data, success, failure);
  }

  /**
   * Add live security
   * @param projectId 
   * @param deployId 
   * @param security 
   * @param success 
   * @param failure 
   */
  public AddLiveSecurity(
    projectId: number,
    deployId: any,
    security: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      deployId: deployId,
      security: security,
    };
    this.ExecuteRequest('POST', 'live/securities/add', data, success, failure);
  }

  /**
   * Cancel live order
   * @param projectId 
   * @param deployId 
   * @param orderId 
   * @param success 
   * @param failure 
   */
  public CancelLiveOrder(
    projectId: number,
    deployId: any,
    orderId: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      deployId: deployId,
      orderId: orderId,
    };
    this.ExecuteRequest('POST', 'live/orders/cancel', data, success, failure);
  }

  /**
   * Send live update order command
   * @param projectId 
   * @param deployId 
   * @param order 
   * @param success 
   * @param failure 
   */
  public SendLiveUpdateOrderCommand(
    projectId: number,
    deployId: any,
    order: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      deployId: deployId,
      order: order,
    };
    this.ExecuteRequest('POST', 'live/orders/update', data, success, failure);
  }

  /**
   * Get unshared library
   * @param projectId 
   * @param libraryId 
   * @param success 
   * @param failure 
   */
  public GetUnsharedLibrary(
    projectId: number,
    libraryId: any,
    success?: (response: ResponseBase) => void,
    failure?: (response: ResponseBase) => void,
  ) {
    const data = {
      projectId: projectId,
      libraryId: libraryId,
    };
    this.ExecuteRequest('POST', 'projects/library/read', data, success, failure);
  }

  /**
   * Execute request with the parameters
   * @param method 
   * @param path 
   * @param data 
   * @param successCallback 
   * @param failureCallback 
   */
  private ExecuteRequest(
    method: string,
    path: string,
    data: any,
    successCallback: (response: ResponseBase) => void,
    failureCallback: (response: ResponseBase) => void,
  ) {
    const url = this.apiUrl + path;
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const hash = sha256(`${this.token}:${timestamp}`);
    const authToken = btoa(this.userId + ':' + hash);
    $.ajax({
      type: method,
      url,
      async: true,
      data: data,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      headers: {
        'Timestamp': timestamp,
        'Authorization': `Basic ${authToken}`,
      },
      success: (response: ResponseBase) => {
        if (response.success) {
          if (successCallback) {
            successCallback(response);
          }
        } else {
          if (failureCallback) {
            failureCallback(response);
          }
        }
      }
    });
  }
}