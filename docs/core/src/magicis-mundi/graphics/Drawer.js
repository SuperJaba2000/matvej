class Drawer{
	constructor(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}
	
	draw(texture, x, y, light, sizes){
        if(!texture) return;
		
		if(!sizes)
			sizes = {
			    width: Vars.tileSize,
				height: Vars.tileSize
		    };
		
		this.get().globalAlpha = light / Vars.maxLight;
		this.get().drawImage(texture, x, y, sizes.width, sizes.height);
	}
	
	get(){
		return this.context;
	}
	
	clear(){	
		this.get().clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	getTilesScreen(){
		return {
			width: Math.ceil(window.innerWidth / Vars.tileSize) + 2*Vars.tileBuffer,
			height: Math.ceil(window.innerHeight / Vars.tileSize) + 2*Vars.tileBuffer
		}
	}
}

/*
class Draw {
	constructor(canvas, minimap, drawSize){
		this.canvas = canvas;
		this.minimap = minimap;
		this.drawSize = drawSize;
		
		this.useTextures = true;
	}
	
	getTilesScreen(){
		return {
			width: Math.ceil(window.innerWidth / Vars.tileSize),
			height: Math.ceil(window.innerHeight / Vars.tileSize),
		}
	}
	
	getLight(x, y){
		let viewDistance = 30;
		
		//x++; y++;
		
		const px = Vars.changeable.camera.position.x;
	        const py = Vars.changeable.camera.position.y;
	        
	        const rx = px - Math.floor(this.getTilesScreen().width / 2) + x;
	        const ry = py - Math.floor(this.getTilesScreen().height / 2) + y;
			
		let dx = rx - px;
		let dy = ry - py;
		
		let d = Math.round(Math.sqrt((dx * dx) + (dy * dy)));
	
	        let l = 0.9 - d/Vars.maxLight;
	
                if( Vars.maxLight - d < (Vars.maxLight - viewDistance) )
	        	l = 0;	
	
        	if(l <= 0)
	                return 0.05;
		
	        return l;
        }
	
	draw(obj, x, y, light){
		
		if(obj == undefined)
			return false;
		
		const ctx = this.canvas.getContext('2d');
		
		if(Vars.changeable.activeMap.getActiveWorld().activeDimension == 1){
			//ctx.globalAlpha = 1;
		        ctx.globalAlpha = 1;//this.getLight(x/this.drawSize, y/this.drawSize);
		}else{
		        ctx.globalAlpha = 1;//this.getLight(x/this.drawSize, y/this.drawSize);//.get(x / this.drawSize, y / this.drawSize);
		}
		
		/*ctx.fillStyle = "#000000";
		ctx.fillText(this.getLight(x / this.drawSize, y / this.drawSize), x, y)
		
		if(this.useTextures){
			ctx.drawImage(obj.textureRegion(), x, y, this.drawSize, this.drawSize);
		}else{
			ctx.fillStyle = obj.color;
			ctx.fillRect(x, y, this.drawSize, this.drawSize);
			
		}
		
		if(!obj.hasShadow)
			return;
		
		let shadowX = x + Vars.tileSize + 1;
		let shadowY = y + Vars.tileSize + 1;
		
		ctx.beginPath();
		
                ctx.moveTo(shadowX, y);
                ctx.lineTo(shadowX, shadowY);
                ctx.lineTo(x, shadowY);
                ctx.strokeStyle = '#000000';
				
                ctx.stroke();
	}
	
	drawEdge(floor, side, x, y, light){
		const ctx = this.canvas.getContext('2d');
		ctx.globalAlpha = light+0.5;
		
		ctx.drawImage(floor.edgeRegion(side), x, y, this.drawSize, this.drawSize);
	}
	
	drawCliff(floor, side, x, y, light){
		const ctx = this.canvas.getContext('2d');
		ctx.globalAlpha = light+0.5;
		
		ctx.drawImage(floor.cliffRegion(side), x, y, this.drawSize, this.drawSize);
	}
	
	drawEntity( entity, x, y){
		const ctx = this.canvas.getContext('2d');
		
	        let drawX = x + entity.position.offsetX;
		let drawY = y + entity.position.offsetY;
		
		console.log(drawX + "," + drawY)
		
		//ctx.globalAlpha = light;//.get(x / this.drawSize, y / this.drawSize);
		
		/*ctx.fillStyle = "#000000";
		ctx.fillText(this.getLight(x / this.drawSize, y / this.drawSize), x, y)
		
		if(entity.draw)
			entity.draw(ctx, x, y);
		
		/*this.useTextures = true;
		
		if(this.useTextures){
			ctx.drawImage(entity.textureRegion(), drawX, drawY, this.drawSize, this.drawSize);
		}else{
			ctx.fillStyle = entity.color;
			ctx.strokeStyle = "#000000";
			
			ctx.beginPath();
			ctx.arc(drawX + (Vars.tileSize/2), drawY + (Vars.tileSize/2), entity.size, 0, 2 * Math.PI, false);
			ctx.fill();
                        ctx.stroke();		
		}
		
		this.useTextures = false;
	}
	
	updateMinimap(){
		//TODO WRITE
	}
	
}

/*
worldDraw.mozImageSmoothingEnabled = false;
worldDraw.webkitImageSmoothingEnabled = false;
worldDraw.msImageSmoothingEnabled = false;
worldDraw.imageSmoothingEnabled = false;
*/