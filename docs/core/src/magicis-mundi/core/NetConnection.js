class NetConnection{
	constructor(address){
		this.address = address;
		//  'ws://' or 'wss://' protocol required! 
		this.socket = new WebSocket(address);
		
		var connection = this;
		
		this.socket.onopen = function(event){
			connection.closed = false;
			connection.openingTime = new Date().toLocaleTimeString();
			
			connection.socket.send("Меня зовут Женя");
        };
		
		this.socket.onclose = function(event){
            connection.close();
        };
		
		this.socket.onmessage = function(event){
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };
	}
	
	close(){
		this.closed = true;
		this.socket.close(1000, 'planned shutdown');
		
		console.log(`[shutdown] Закрытие соединения, время работы: ${new Date().toLocaleTimeString() - this.openingTime}`)
	}
}




/*
if(Vars.changeable.isOnline){
	document.body.appendChild( () => {
		let el = document.createElement('script');
		el.src = "/socket.io/socket.io.js";
		return el;
	});
	
	let socket = Vars.changeable.socket = io();
	
	socket.on('setId', (id) => {
	    socket.$id = id;
	});
	
	socket.on('setSettings', (settings) => {
		console.log('Set settings from server');
	});
	
	socket.on('some-message', (text) => {
	    console.log(`message from server: '${text}'`);
	});
	
	socket.on('error-message', (text) => {
		console.error(`error from server: '${text}'`);
	});
	
	socket.on('forced-shutdown', (text) => {
		console.log(`forced shutdown from server: '${text}'`);
		//shutdown connection
		socket.disconnect();
	});
}
*/