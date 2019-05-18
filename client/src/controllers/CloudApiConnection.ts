import * as request from 'request'
export class CloudApiConnection {
	public constructor(){
	}

	public async TryRequest(options: any){
		return new Promise<any>((resolve, reject) => {	
			request(options, function(err, res, body){
				if (err){
					reject(err);
				};
				if (res.statusCode != 200){
					reject('Invalid status code <${res.statusCode}>')
				};
				resolve(JSON.parse(body));
			});
		});
	}
}