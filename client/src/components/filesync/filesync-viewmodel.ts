import * as ko from 'knockout'
import {LocalFilesApi} from '../../controllers/LocalFilesApi'

export class FileSyncViewModel {
  public localFilesApi: LocalFilesApi;
  constructor() {
  	this.localFilesApi = new LocalFilesApi("74665", "3000ca1bdf8d9441ae20833b9a5df246");
	}

  public SyncRead(){
    this.localFilesApi.Sync();
  }
}