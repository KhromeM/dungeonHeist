export class WebSocketManager {
	constructor(wss) {
		this.wss = wss;
	}

	broadcast(data) {
		this.wss.getWss().clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(JSON.stringify(data));
			}
		});
	}
}
