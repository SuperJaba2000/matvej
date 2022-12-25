class Structure{
	constructor(name, sizes, plan){	
		//array of structure tiles
		this.plan = plan;
		
	    this.name = name;
		this.width = sizes.width;
		this.height = sizes.height;
	}
	
	canSet(tiles, x, y){
		if(!tiles.valid(x, y))
			return false;
		
		let mainElevation = tiles.get(x, y).elevation;
		
		for(var _x = x; _x < x+this.width; _x++){
			for(var _y = y; _y < y+this.height; _y++){
			    if(!tiles.valid(_x, _y))
					return false;
				
				if(tiles.get(_x, _y).elevation != mainElevation)
					return false;
				
				if(tiles.get(_x, _y).block != null)
					return false;
		    }
		}
		
		return true;
	}
	
	set(tiles, x, y){
		for(var _x = x; _x < x+this.width; _x++){
			for(var _y = y; _y < y+this.height; _y++){
				let xonPlan = _x-x;
				let yonPlan = _y-y;
				
				//console.log(xonPlan, yonPlan, this.plan)
				
				tiles.get(_x, _y).block = this.plan[yonPlan][xonPlan].block;
			}
		}
	}
}