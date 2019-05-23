import * as ko from 'knockout'
import {FileSyncer} from '../../controllers/FileSyncer'

export class FileSyncViewModel {
  public fileSyncApi: FileSyncer;
  constructor() {
  	this.fileSyncApi = new FileSyncer("74665", "3000ca1bdf8d9441ae20833b9a5df246");
	}

  public SyncRead(){
    this.fileSyncApi.Sync();
  }
}