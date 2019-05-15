import {FileModel} from './file-model'
import {FilesController} from '../../controllers/files-controller'
import * as ko from 'knockout'
import * as path from 'path'

export class FilesViewModel {
  public filelist: KnockoutObservableArray<FileModel>;
  public fc: FilesController;
  public newFileName: KnockoutObservable<string>;
  public newFileText: KnockoutObservable<string>;
  public selectedFile: KnockoutObservableArray<FileModel>;
  public constructor(params) {
	let homedir = require('os').homedir();
  	let location = params[0]==null ? path.join(homedir,'QuantConnect') : params[0];
  	this.fc = new FilesController(location);
  	this.filelist = ko.observableArray(this.fc.getFileList());
  	this.newFileName = ko.observable("name");
  	this.newFileText = ko.observable("content");
  	this.selectedFile = ko.observableArray();
  }

  public Select(file:FileModel){
  	console.log("want to select: "+file.fileName);
  	
  	this.selectedFile.push(file);
  	console.log("selected: "+this.selectedFile());
  }

  public DeleteFile(){
  	console.log("want to delete: "+ this.selectedFile());
  	this.fc.deleteFile(this.selectedFile());
  	this.Reload();
  }

  public CreateNewFile(){
  	this.fc.createNewFile(this.newFileName(),this.newFileText());
  	this.Reload();
  }

  public Reload(){
  	this.fc.loadFileList();
  	this.filelist(this.fc.getFileList());
  }
 }