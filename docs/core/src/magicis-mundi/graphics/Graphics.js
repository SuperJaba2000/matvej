class Graphics{
	constructor(canvas){
		this.canvas = canvas;
		this.drawer = new Drawer(canvas);
		
		//animations will also be processed later in update()
		this.update = this.draw;
	}
	
	init(){
		window.addEventListener('resize', this.updateSizes, false);
		
		this.updateSizes();
	}
	
	updateSizes(){
		Vars.graphics.canvas.width = Math.ceil(window.innerWidth / Vars.tileSize) * Vars.tileSize;
		Vars.graphics.canvas.height = Math.ceil(window.innerHeight / Vars.tileSize) * Vars.tileSize;
	}
	
	draw(){
		//should I clear the scene before redrawing?
		this.drawer.clear();
		
		this.drawTiles();
		
		//other...
		
		this.postDraw();
		
		this.drawEntities();
		
		//this.drawPlayer();
	}
	
	drawTiles() {
		var map = Vars.changeable.activeMap;
		var camera = Vars.changeable.camera;
		var tiles = map.getActiveWorld().getActiveDimension().tiles;
		
		/* the first and last tiles visible on the screen */
		let y_start = camera.position.y - Math.floor(this.drawer.getTilesScreen().height / 2);
	    let y_end = y_start + this.drawer.getTilesScreen().height;
        let x_start = camera.position.x - Math.floor(this.drawer.getTilesScreen().width / 2);
	    let x_end = x_start + this.drawer.getTilesScreen().width;
        
		/* sorting and rendering tiles visible on the screen */
		for(var y_now = y_start; y_now < y_end; y_now++){
            for(var x_now = x_start; x_now < x_end; x_now++){
				
                //if there is 'something wrong with the tile' it is skipped
                if(!tiles.valid(x_now, y_now)) continue;
				
				var tile = tiles.get(x_now, y_now);
				
				let drawX = (x_now - x_start + camera.position.offsetX - Vars.tileBuffer) * Vars.tileSize;
                let drawY = (y_now - y_start + camera.position.offsetY - Vars.tileBuffer) * Vars.tileSize;
					
				//later there will be tile.light to account for lighting
				var light = tile.light();
					
				if((tile.block == null || tile.block.alwaysDrawFloor) && tile.floor != null)
					this.drawer.draw(tile.floor.textureRegion(), drawX, drawY, light)
			}
        }
		
	}
	
	drawEntities(){
		var map = Vars.changeable.activeMap;
		var camera = Vars.changeable.camera;
		var tiles = map.getActiveWorld().getActiveDimension().tiles;
		var entities = map.getActiveWorld().getActiveDimension().entities;
		
		/* the first and last tiles visible on the screen */
		let y_start = camera.position.y - Math.floor(this.drawer.getTilesScreen().height / 2);
	    let y_end = y_start + this.drawer.getTilesScreen().height;
        let x_start = camera.position.x - Math.floor(this.drawer.getTilesScreen().width / 2);
	    let x_end = x_start + this.drawer.getTilesScreen().width;
 
		/* sort and display the tiles visible on the screen again... */
		for (let y_now = y_start; y_now < y_end; y_now++){	
            for(let x_now = x_start; x_now < x_end; x_now++){
				//if there is 'something wrong with the tile' it is skipped
                if(!tiles.valid(x_now, y_now)) continue;
				
				let entity = entities.getByCoordinates(x_now, y_now);
				
				//has not entities on this tile
				if(!entity) continue;
				
				var tile = tiles.get(x_now, y_now);
				
				let drawX = (x_now - x_start + camera.position.offsetX - Vars.tileBuffer) * Vars.tileSize;
                let drawY = (y_now - y_start + camera.position.offsetY - Vars.tileBuffer) * Vars.tileSize;
				
				let sizes = {
					width: Vars.tileSize,
					height: 2*Vars.tileSize
				}
					
				//later there will be tile.light to account for lighting
				var light = Vars.maxLight;
				
				this.drawer.draw(entity.textureRegion(), drawX, drawY, light, sizes)
			}
		}
	}
	
	postDraw(){
		var map = Vars.changeable.activeMap;
		var camera = Vars.changeable.camera;
		var tiles = map.getActiveWorld().getActiveDimension().tiles;
		
		/* the first and last tiles visible on the screen */
		let y_start = camera.position.y - Math.floor(this.drawer.getTilesScreen().height / 2);
	    let y_end = y_start + this.drawer.getTilesScreen().height;
        let x_start = camera.position.x - Math.floor(this.drawer.getTilesScreen().width / 2);
	    let x_end = x_start + this.drawer.getTilesScreen().width;
 
		/* sort and display the tiles visible on the screen again... */
		for (let y_now = y_start; y_now < y_end; y_now++){	
            for(let x_now = x_start; x_now < x_end; x_now++){

                //if there is 'something wrong with the tile' it is skipped
                if(!tiles.valid(x_now, y_now))
					continue;

			    var tile = tiles.get(x_now, y_now);
				
				//later there will be tile.light to account for lighting
				var light = tile.light();
					
				let cx = x_now - x_start + camera.position.offsetX - Vars.tileBuffer;
                let cy = y_now - y_start + camera.position.offsetY - Vars.tileBuffer;
					
				if((tile.block == null || tile.block.alwaysDrawFloor) && tile.floor != null){
					/* getting tiles around */
					
					var topTile, rightTile, bottomTile, leftTile = false;
					
					if(tiles.valid(x_now, y_now-1)) topTile = tiles.get(x_now, y_now-1);   //top
					if(tiles.valid(x_now+1, y_now)) rightTile = tiles.get(x_now+1, y_now); //right
					if(tiles.valid(x_now, y_now+1)) bottomTile = tiles.get(x_now, y_now+1);//bottom
					if(tiles.valid(x_now-1, y_now)) leftTile = tiles.get(x_now-1, y_now);  //left
				
				    if(tile.floor.edges.length > 0){
						/* draw edges */
						
						if(topTile && (topTile.elevation <= tile.elevation) && (topTile.floor.priority < tile.floor.priority))
							this.drawer.draw(tile.floor.edgeRegion(0), cx*Vars.tileSize, (cy-1)*Vars.tileSize, light)
						
						if(rightTile && (rightTile.elevation <= tile.elevation) && (rightTile.floor.priority < tile.floor.priority))
							this.drawer.draw(tile.floor.edgeRegion(1), (cx+1)*Vars.tileSize, cy*Vars.tileSize, light)
						
						if(bottomTile && (bottomTile.elevation <= tile.elevation) && (bottomTile.floor.priority < tile.floor.priority))
							this.drawer.draw(tile.floor.edgeRegion(2), cx*Vars.tileSize, (cy+1)*Vars.tileSize, light)
						
						if(leftTile && (leftTile.elevation <= tile.elevation) && (leftTile.floor.priority < tile.floor.priority))
							this.drawer.draw(tile.floor.edgeRegion(3), (cx-1)*Vars.tileSize, cy*Vars.tileSize, light)
					}
					
					if(tile.floor.cliffs.length > 0){
						/* draw cliffs */
						
						if(topTile && (topTile.elevation < tile.elevation))
							this.drawer.draw(tile.floor.cliffRegion(0), cx*Vars.tileSize, (cy-1)*Vars.tileSize, light)
						
						if(rightTile && (rightTile.elevation < tile.elevation))
							this.drawer.draw(tile.floor.cliffRegion(1), (cx+1)*Vars.tileSize, cy*Vars.tileSize, light)
						
						if(bottomTile && (bottomTile.elevation < tile.elevation))
							this.drawer.draw(tile.floor.cliffRegion(2), cx*Vars.tileSize, (cy+1)*Vars.tileSize, light)
						
						if(leftTile && (leftTile.elevation < tile.elevation))
							this.drawer.draw(tile.floor.cliffRegion(3), (cx-1)*Vars.tileSize, cy*Vars.tileSize, light)
					}
				}
				
				let drawX = cx * Vars.tileSize;
                let drawY = cy * Vars.tileSize;
				
				if(tile.overlay != null)
					this.drawer.draw(tile.overlay.textureRegion(), drawX, drawY, light);
					
			    if(tile.block != null)
					this.drawer.draw(tile.block.textureRegion(), drawX, drawY, light);
				
				//sorting end
			}
        }
	}
	
}

/*

class Graphics {

    constructor(outputCanvas) {
		this.canvas = outputCanvas;	
		this.draw = new Draw(outputCanvas, null, 0);
		
		window.addEventListener('resize', this.init, false);
    }
		
	_draw(){
		this.drawTiles();
		this.drawEntities();
		this.drawEffects();
		
		this.postDraw();
		
		this.drawPlayer();
	}
	
	init(){
		Vars.mainCanvas.width = `${Vars.graphics.draw.getTilesScreen().width * Vars.tileSize}`;
		Vars.mainCanvas.height = `${Vars.graphics.draw.getTilesScreen().height * Vars.tileSize}`;
		
		Vars.graphics.draw.drawSize = Vars.tileSize;
	}
	
	update() {
		this.clear();
	    this._draw();
	}
	
	clear() {
		let width = window.screen.availWidth; 
		let height = window.screen.availHeight;
		
		let ctx = this.canvas.getContext('2d');
		
		this.init();
		
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	
	drawTiles() {
		
		let map = Vars.changeable.activeMap;
		let camera = Vars.changeable.camera;
		let tiles = map.getActiveWorld().getActiveDimension().tiles;
		
		let y_start = camera.position.y - Math.floor(this.draw.getTilesScreen().height / 2);
	    let y_end = y_start + this.draw.getTilesScreen().height;
        let x_start = camera.position.x - Math.floor(this.draw.getTilesScreen().width / 2);
	    let x_end = x_start + this.draw.getTilesScreen().width;
                
		for(let y_now = y_start; y_now < y_end; y_now++){		
            for(let x_now = x_start; x_now < x_end; x_now++){
                let drawX = (x_now - x_start + camera.position.offsetX) * Vars.tileSize;
                let drawY = (y_now - y_start + camera.position.offsetY) * Vars.tileSize;

                if(!tiles.valid(x_now, y_now))
					continue;
									
			    let tile = tiles.get(x_now, y_now);
					
					
				if((tile.block == null || tile.block.alwaysDrawFloor) && tile.floor != null){
					//let floorVariant = tile.floor.variants;
					
					this.draw.draw(tile.floor, drawX, drawY, 0.5)
				
				        //if(x_now == camera.position.x && y_now == camera.position.y)
						//this.draw.draw({color: '#FF0000'}, 0, drawX, drawY)
				}
				
				if(tile.overlay != null)
					this.draw.draw(tile.overlay, drawX, drawY, tile.light);
					
			    if(tile.block != null)
					this.draw.draw(tile.block, drawX, drawY, tile.light);
			}
        }
	}
	
	postDraw() {
		let map = Vars.changeable.activeMap;
		let camera = Vars.changeable.camera;
		let tiles = map.getActiveWorld().getActiveDimension().tiles;
		
		let y_start = camera.position.y - Math.floor(this.draw.getTilesScreen().height / 2);
	    let y_end = y_start + this.draw.getTilesScreen().height;
        let x_start = camera.position.x - Math.floor(this.draw.getTilesScreen().width / 2);
	    let x_end = x_start + this.draw.getTilesScreen().width;
                
		for (let y_now = y_start; y_now < y_end; y_now++){		
            for(let x_now = x_start; x_now < x_end; x_now++){
	            let drawX = (x_now - x_start + camera.position.offsetX) * Vars.tileSize;
                let drawY = (y_now - y_start + camera.position.offsetY) * Vars.tileSize;

                if(!tiles.valid(x_now, y_now))
					continue;
									
			    let tile = tiles.get(x_now, y_now);
					
				if((tile.block == null || tile.block.alwaysDrawFloor) && tile.floor != null){
					//draw edges
				
				    //top
					if(tiles.valid(x_now, y_now-1) && tiles.get(x_now, y_now-1).floor && tiles.get(x_now, y_now-1).floor.priority < tile.floor.priority)
					    this.draw.drawEdge(tile.floor, 0, drawX, drawY-Vars.tileSize, 0.5)
					
					//right
					if(tiles.valid(x_now+1, y_now) && tiles.get(x_now+1, y_now).floor && tiles.get(x_now+1, y_now).floor.priority < tile.floor.priority)
					    this.draw.drawEdge(tile.floor, 1, drawX+Vars.tileSize, drawY, 0.5)
						
					//bottom
					if(tiles.valid(x_now, y_now+1) && tiles.get(x_now, y_now+1).floor && tiles.get(x_now, y_now+1).floor.priority < tile.floor.priority)
					    this.draw.drawEdge(tile.floor, 2, drawX, drawY+Vars.tileSize, 0.5)
						
					//left
					if(tiles.valid(x_now-1, y_now) && tiles.get(x_now-1, y_now).floor && tiles.get(x_now-1, y_now).floor.priority < tile.floor.priority)
					    this.draw.drawEdge(tile.floor, 3, drawX-Vars.tileSize, drawY, 0.5)
				}
				
				if(tile.elevation != 0 && tile.floor != null){
					//draw cliffs
					
					//top
					if(tiles.valid(x_now, y_now-1) && tiles.get(x_now, y_now-1).elevation < tile.elevation)
					    this.draw.drawCliff(tile.floor, 0, drawX, drawY-Vars.tileSize, 0.5)
					
					//right
					if(tiles.valid(x_now+1, y_now) && tiles.get(x_now+1, y_now).elevation < tile.elevation)
					    this.draw.drawCliff(tile.floor, 1, drawX+Vars.tileSize, drawY, 0.5)
						
					//bottom
					if(tiles.valid(x_now, y_now+1) && tiles.get(x_now, y_now+1).elevation < tile.elevation)
					    this.draw.drawCliff(tile.floor, 2, drawX, drawY+Vars.tileSize, 0.5)
						
					//left
					if(tiles.valid(x_now-1, y_now) && tiles.get(x_now-1, y_now).elevation < tile.elevation)
					    this.draw.drawCliff(tile.floor, 3, drawX-Vars.tileSize, drawY, 0.5)
				}
			}
        }
	}
	
	drawEntities() {
		const dimension = Vars.changeable.activeMap.getActiveWorld().getActiveDimension();
		const camera = Vars.changeable.camera;
		const entities = dimension.entities;
		
		let y_start = camera.position.y - Math.floor(this.draw.getTilesScreen().height / 2);
	        let y_end = y_start + this.draw.getTilesScreen().height;
                let x_start = camera.position.x - Math.floor(this.draw.getTilesScreen().width / 2);
	        let x_end = x_start + this.draw.getTilesScreen().width;
		
		
			//if( Math.abs(camera.position.x - entity.position.x) > this.draw.getTilesScreen().width / 2) continue;
			//if( Math.abs(camera.position.y - entity.position.y) > this.draw.getTilesScreen().height / 2) continue;
		
		for (let y_now = y_start; y_now < y_end; y_now++){		
            for(let x_now = x_start; x_now < x_end; x_now++){
				let entity = entities.getByCoordinates(x_now, y_now);
				
				if(entity !== null)
				    this.draw.drawEntity( entity, (entity.position.x - x_start)*Vars.tileSize, (entity.position.y - y_start)*Vars.tileSize);
			}
        }
	}

        drawEffects() {
                //TODO CAMERA FXs
        }			
	
	drawPlayer() {
		let player = Vars.changeable.player;
		let camera = Vars.changeable.camera;
		let ctx = this.canvas.getContext('2d');
		
		//let activeRegion = player.textureRegion.get();
		
		let drawX = (Math.floor(this.draw.getTilesScreen().width/2) - camera.position.x + player.position.x + camera.position.offsetX) * Vars.tileSize;
		let drawY = (Math.floor(this.draw.getTilesScreen().height/2) - camera.position.y + player.position.y + camera.position.offsetY) * Vars.tileSize;
		
		ctx.globalAlpha = 1;
		
		ctx.fillStyle = '#da70d6';
		ctx.fillRect(drawX, drawY, Vars.tileSize, Vars.tileSize);
		//ctx.drawImage(activeRegion, drawX, drawY, Vars.tileSize, Vars.tileSize);
	}
	
}	*/