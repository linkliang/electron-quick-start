import {FileModel} from '../components/files/file-model'
import * as ko from 'knockout'
import * as fs from 'fs'
import * as path from 'path'
export class FilesController {
	public filelist : FileModel[];
	public location : string;
	public constructor(params){
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
			files.forEach(file => {
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

	public createNewFile(filename:string, filetext:string){
		fs.writeFileSync(path.join(this.location,filename),filetext);
	}

	public deleteFile(files:FileModel[]){
		files.forEach(file => {
			try{
				fs.unlinkSync(path.join(this.location,file.fileName));
			}
			catch(e){
				console.log(e);
			}
		})
	}
}