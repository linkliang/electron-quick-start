import {FileModel} from '../components/files/file-model'
import * as ko from 'knockout'
const fs = require('fs')
import * as path from 'path'
export class FilesController {
	public filelist : FileModel[];
	public location : string;
	public constructor(params: any){
		try{
			this.location = params;
			this.filelist = new Array();
			this.loadFileList();
		}
		catch(e){
			console.log(e);
		}
	}

	public loadFileList(){
		this.filelist = new Array();
		try{
			let files = fs.readdirSync(this.location);
			files.forEach((file: any) => {
				let filename = file;
				let filestats = fs.statSync(path.join(this.location,file));
				this.filelist.push(new FileModel([filename, filestats.size, filestats.mtime]));
			});
		}
		catch(e){
			console.log(e);
		}
	}

	public getFileList(){
		return this.filelist;
	}

	public createNewFile(projectId:string, filename:string, filetext:string){
		fs.writeFileSync(path.join(this.location,projectId,filename),filetext);
	}

	public deleteFile(files:FileModel[],projectId:string){
		files.forEach(file => {
			try{
				fs.unlinkSync(path.join(this.location,projectId,file.fileName));
			}
			catch(e){
				console.log(e);
			}
		})
	}
}