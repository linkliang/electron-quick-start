import {SHA256} from "crypto-js"
import {CloudApiConnection} from "./CloudApiConnection"

export class CloudApi{
	public userId: string;
	public token: string;
	public apiUrl: string;
	public connector: CloudApiConnection;
	public constructor(userId: string, token: string){
		this.userId = userId;
		this.token = token;
		this.apiUrl = "https://www.quantconnect.com/api/v2/";
		this.connector = new CloudApiConnection();
	}

	public async ListProjects(){
		let options = {
			url: this.apiUrl + "projects/read",
			method: "GET",
			headers: this.GenerateHeader(this.userId,this.token)
		};
		let res = await this.connector.TryRequest(options);
		return res["projects"];
	}

	public async ReadProject(projectId: string){
		let options = {
			url: this.apiUrl + "projects/read",
			method: "GET",
			headers: this.GenerateHeader(this.userId,this.token),
			formData: {
				projectId: projectId
			}
		};
		let res = await this.connector.TryRequest(options);
		return res;
	}

	public async AddProjectFile(projectId: string, name: string, content: string){
		let options={
			url: this.apiUrl + "files/create",
			method: "POST",
			headers: this.GenerateHeader(this.userId,this.token),
			formData: {
				projectId: projectId,
				name: name,
				content: content
			}
		}
		let res = await this.connector.TryRequest(options);
		return res;
	}

	public async UpdateProjectFileName(projectId: string, oldFileName: string, newFileName: string){
		let options={
			url: this.apiUrl + "files/update",
			method: "POST",
			headers: this.GenerateHeader(this.userId,this.token),
			formData: {
				projectId: projectId,
				name: oldFileName,
				newName: newFileName
			}
		}
		let res = await this.connector.TryRequest(options);
		return res;
	}

	public async UpdateProjectFileContent(projectId: string, fileName: string, newFileContents: string){
		let options={
			url: this.apiUrl + "files/update",
			method: "POST",
			headers: this.GenerateHeader(this.userId,this.token),
			formData: {
				projectId: projectId,
				name: fileName,
				content: newFileContents
			}
		}
		let res = await this.connector.TryRequest(options);
		return res;
	}

	public async ReadProjectFiles(projectId: string){
		let options={
			url: this.apiUrl + "files/read",
			method: "POST",
			headers: this.GenerateHeader(this.userId,this.token),
			formData: {
				projectId: projectId
			}
		}
		let res = await this.connector.TryRequest(options);
		console.log("!1");
		return res;
	}

	public async ReadProjectFile(projectId: string, fileName: string){
		let options={
			url: this.apiUrl + "files/read",
			method: "GET",
			headers: this.GenerateHeader(this.userId,this.token),
			formData: {
				projectId: projectId,
				name: fileName
			}
		}
		let res = await this.connector.TryRequest(options);
		return res;
	}


	public GenerateHeader(userId: string, token: string){
		let timeStamp = Math.floor(Date.now() / 1000);
		let hash = SHA256(token+":"+timeStamp);
		let b64 = btoa(userId+":"+hash);
		return {
			'Authorization' : "Basic "+b64,
			'Timestamp': timeStamp.toString()
		}
	}
}