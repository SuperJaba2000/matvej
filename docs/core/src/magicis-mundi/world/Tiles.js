class Tiles{
	constructor(width, height) {
		this.width = width; 
		this.height = height;
		
		this.array = new Array(width).fill(0).map(el => new Array(height).fill(0).map(el => new Tile(null, null, {})));
	}
	
	/*getLight(x, y){
		let otherTiles = this.getInCircle(x, y, Vars.viewDistance);
		
		let lights = [];
		
		for(let _x in otherTiles){
			for(let _y in otherTiles[_x]){
				if(otherTiles[_x][_y] == null || otherTiles[_x][_y].block == null || !otherTiles[_x][_y].block.hasLight)
				        continue;
					
				let dx = (x - radius + _x) - x;
				let dy = (y - radius + _y) - y;
				
			        let d = Math.round( Math.sqrt((dx * dx) + (dy * dy)) );
				
				let light = 0.9 - d/otherTiles[_x][_y].block.lightLevel;
				
				lights.push(light);
			}
		}
		
	        return Math.min(lights.sum(), 0.9);
	}*/
	
	get(x, y) {
		return this.array[x][y];
	}
	
	set(x, y, tile) {
		this.array[x][y] = tile;
	}
	
	upd(x, y, tile){
		this.array[x][y] = Object.assign(this.get(x, y), tile);
		
		/*if(tile.block && tile.block.hasLight){
			let otherTiles = this.getInCircle(x, y, tile.block.lightLevel);
			
			for(let _x in otherTiles){
				for(let _y in otherTiles[_x]){
					
					let t = otherTiles[_x][_y];
					
					if(t == null || t == undefined)
						continue;
					
					
					let rx = (x - tile.block.lightLevel) + Number(_x);
					let ry = (y - tile.block.lightLevel) + Number(_y);
					
					let dx = rx - x;
					let dy = ry - y;
					
					let d = Math.round( Math.sqrt((dx * dx) + (dy * dy)) );
						
					let light = (t.light == undefined || t.light == null) ? (0.9 - d/tile.block.lightLevel) :
					        t.light + (0.9 - d/tile.block.lightLevel);
							
					console.log('set light ' + light);
						
					this.upd(rx, ry, {light: light});
				        //otherTiles[_x][_y].light += 0.9 - d/tile.block.lightLevel;
				}
			}
		}*/
	}
	
	valid(x, y){
		if( 
		    (x >= 0 && x < this.width) && (y >= 0 && y < this.height) && 
		    (this.get(x, y) != undefined && this.get(x, y) != null) 
		) return true;
		
		//console.error(`tile(${x}, ${y}) not valid!`);
		return false;
	}
	
	getInCircle(x, y, radius){
		let result = this.getInSquare(x, y, radius);
		
		for(let _x in result){
		        for(let _y in result[_x]){
				console.log(_x, _y)
					
				let dx = (x - radius + _x) - x;
				let dy = (y - radius + _y) - y;
				
			        let d = Math.round( Math.sqrt((dx * dx) + (dy * dy)) );
					
				if(d > radius)
					result[_x][_y] = null;
			}
		}
		
		return result;
	}
	
	getInSquare(x, y, range){
		console.log(range)
		let result = new Array((2*range+1)).fill().map( () => Array((2*range+1)).fill() );
		
		for(let _x in result){
			for(let _y in result[_x]){
				let rx = (x - range) + Number(_x);
				let ry = (y - range) + Number(_y);
				
				console.log(rx, ry)
				
				if(rx < 0 || ry < 0)
					continue;
				
				if(rx > this.width-1 || ry > this.height-1)
					continue;
				
				result[_x][_y] = this.valid(rx, ry) ?
				        this.get(rx, rx): null;

			}
		}
		
		return result;
	}
}


function saveTiles(tiles){
	let save = new Array(tiles.width).fill().map( () => Array(tiles.height).fill(0) );
	
	for(var _x = 0; _x < tiles.width; _x++){
        for(var _y = 0; _y < tiles.height; _y++){
            let tile = tiles.get(_x, _y);
			
			save[_x][_y] = [
			    tile.floor ? tile.floor.id : 0,
				tile.block ? tile.block.id : 0,
				tile.overlay ? tile.overlay.id : 0,
				tile.elevation
			]
        }
    }
	
	return save;
}

function loadTiles(save){
	let tiles = new Tiles(save.length, save[0].length);
	
	for(var _x = 0; _x < tiles.width; _x++){
        for(var _y = 0; _y < tiles.height; _y++){
            let tile = save.get(_x, _y);
			
			tiles[_x][_y] = new Tiles(
			    tile[0] ? Blocks.getById(tile[0]) : null,
				tile[1] ? Blocks.getById(tile[1]) : null,
				tile[2] ? Blocks.getById(tile[2]) : null,
				tile[3]
			)
        }
    }
	
	return tiles;
}

function saveNow(fileName){
	const savedTiles = saveTiles(Vars.changeable.activeMap.getActiveWorld().getActiveDimension().tiles);
    const blob = new Blob([JSON.stringify(savedTiles, null, 0)], {type : 'application/json'});
	
	saveAs(blob, fileName);
}

function loadNow(savedTiles){
	let tiles = loadTiles(savedTiles);
	
	Vars.changeable.activeMap.getActiveWorld().getActiveDimension().tiles = tiles;
}