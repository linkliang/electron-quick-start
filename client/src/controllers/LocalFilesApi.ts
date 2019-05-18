import {FileModel} from '../components/files/file-model'
import {CloudApi} from './CloudApi'
import * as path from "path"
import * as fs from "fs"
import * as os from 'os'
export class LocalFilesApi{
	public cloudApi: CloudApi;
	public userId: string;
	public rootPath: string;
	public constructor(userId: string, token: string){
		this.cloudApi = new CloudApi(userId,token);
		this.userId = "defaultUser";
		this.rootPath = path.join(os.homedir(),'QuantConnect');
	}

	public async Sync(){
		// read project list && user Id
		let projectList = await this.cloudApi.ListProjects();
		this.userId = projectList[0]["ownerId"].toString();
		// create user folder if does not exist.
		let userPath : string = path.join(this.rootPath,this.userId);
		!fs.existsSync(userPath) && fs.mkdirSync(userPath);

		// read each project
		projectList.forEach(project => this.readProject(project));
	}

	public async readProject(projectJSON: any){
		// create project folder if does not exist.
		let projectPath : string = path.join(this.rootPath,this.userId,projectJSON["projectId"].toString());
		!fs.existsSync(projectPath) && fs.mkdirSync(projectPath);
		// read project files
		let project = await this.cloudApi.ReadProjectFiles(projectJSON["projectId"]);
		project["files"].forEach(file => this.readFiles(file, projectJSON["projectId"].toString()));
	}

	public readFiles(fileJSON: any, projectId: string){
		let filePath = path.join(this.rootPath,this.userId,projectId);
		let filename = fileJSON["name"].split("/");
		filename.forEach(function(name){
			!fs.existsSync(filePath) && fs.mkdirSync(filePath);
			filePath = path.join(filePath,name);
		});
		fs.writeFileSync(filePath,fileJSON["content"]);
	}
}