class CameraAnimation{
	constructor(name, duration, play){
		this.name = name;
		this.duration = duration;
		
		this.play = play;
	}
	
	left(){
		
	}
}

let towardLeft = new CameraAnimation()

class Camera{	
	constructor(){
		this.position = {
		    x: 50,y: 50,
			//from -0.5 to +0.5
			offsetX: 0, offsetY: 0,
		
		    set(x, y){
			    this.x = x;
			    this.y = y;
		    }
	    }
	
	    this.offSetX = 0; this.offSetY = 0;
	    this.direction = 1;
	    this.free = false;
		
		this.activeAnimation = new CameraAnimation('empty', Infinity);
			
		/*this.time = 0;
		document.getElementById('scene').addEventListener('tick', (event) => {
            this.time++
        });*/
	};
	
	load(){
		this.animations = [
            
        ]
	};
	
	update(){
		if(this.free)
			return;
		
		let playerPosition = Vars.changeable.player.position;
		let worldWidth = Vars.changeable.activeMap.getActiveWorld().getActiveDimension().tiles.width;
		let worldHeight = Vars.changeable.activeMap.getActiveWorld().getActiveDimension().tiles.height;
		
		let minX = Math.ceil(Vars.graphics.drawer.getTilesScreen().width / 2)+1;
		let minY = Math.ceil(Vars.graphics.drawer.getTilesScreen().height / 2)+1;
		
		let maxX = worldWidth - minX;
		let maxY = worldHeight - minY;
		
		if(playerPosition.x <= minX){
			this.position.x = minX;
		}else if(playerPosition.x >= maxX){
			this.position.x = maxX;
		}else{
			this.position.x = playerPosition.x;
		}
		
		if(playerPosition.y <= minY){
			this.position.y = minY;
		}else if(playerPosition.y >= maxY){
			this.position.y = maxY;
		}else{
			this.position.y = playerPosition.y;
		}
		
		
		//this.position.x = Math.maxVars.changeable.player.position;
		
		if(Math.abs(this.position.offsetX) >= 0.5){
			this.position.x += Math.floor(this.position.offsetX / 0.5);
			this.position.offsetX = this.position.offsetX % 0.5;
		}
		
        if(Math.abs(this.position.offsetY) >= 0.5){
			this.position.y += Math.floor(this.position.offsetY / 0.5);
			this.position.offsetY = this.position.offsetY % 0.5;
		}		
	}
}