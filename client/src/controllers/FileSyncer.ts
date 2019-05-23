import {FileModel} from '../components/files/file-model'
import {QuantConnectApi} from './QuantConnectApi'
import * as path from "path"
import * as fs from "fs"
import * as os from 'os'
import ResponseBase from '../models/ResponseBase';
import ProjectsResponse from '../models/ProjectsResponse';
import ProjectFilesResponse from '../models/ProjectFilesResponse';
import ProjectFile from "../models/ProjectFile";
import Project from "../models/Project";

export class FileSyncer{
	public QuantConnectApi: QuantConnectApi;
	public rootPath: string;
	public constructor(userId: string, token: string){
		this.QuantConnectApi = new QuantConnectApi(userId,token);
		this.rootPath = path.join(os.homedir(),'QuantConnect');
	}

	public Sync(){
		this.RequestProjectList();
	}

	public RequestProjectList(){
		// read project list
		this.QuantConnectApi.ListProjects((response: ProjectsResponse) => {
			// success
			// request each project
			response.projects.forEach((project: Project) => this.RequestProject(project));
		},
		(response: ResponseBase) => {
			// fail
			console.log(response.errors);
		});
	}

	public RequestProject(project: Project){
		// create project folder if does not exist.
		this.QuantConnectApi.ReadProjectFiles(project.projectId, (response: ProjectFilesResponse) => {
			// success
			// Create directory if does not exist.
			this.CreatePathIfNotExist(path.join(this.rootPath,this.NameHandler(project.name)));
			// compare modified time between local and cloud
			let localProjectInfo = path.join(this.rootPath,project.name,".QCProject");

			// request each project file
			response.files.forEach((file: ProjectFile) => this.RequestProjectFile(project, file));

			this.UpdateLocalProjectInfo(project);
		},
		(response: ResponseBase) =>{
			// fail
			console.log(response.errors);
		});
	}

	public RequestProjectFile(project: Project, file: ProjectFile){
		let filePath = path.join(this.rootPath,this.NameHandler(project.name));
		let filename = file.name.split("/");
		filename.forEach((dir: string) => {
			this.CreatePathIfNotExist(filePath);
			filePath = path.join(filePath,this.NameHandler(dir));
		});
		fs.writeFileSync(filePath,file.content);
	}

	public CreatePathIfNotExist(path: string){
		!fs.existsSync(path) && fs.mkdirSync(path);
	}

	public NameHandler(name: string){
		if (name.substr(0,9) == "Boot Camp"){
			return "Boot Camp";
		}
		return name.replace(/[`~*()|?:'"<>]/gi,"_");
	}

	public UpdateLocalProjectInfo(project: Project){
		let content = {
			projectId : project.projectId,
			projectName : project.name,
			modified : project.modified
		};
		fs.writeFileSync(path.join(this.rootPath,this.NameHandler(project.name),".QCProject"), JSON.stringify(content, null, 2), 'utf-8');
	}
}