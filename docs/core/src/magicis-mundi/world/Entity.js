class Entity{
	constructor(name, maxHealth){
		this.health = -1; 
	    this.isDead = false;
	
	    this.orientation = 1;
	    this.speed = 0;
			
		this.position = {
		    x: 0,  y: 0,
		    offsetX: 0, offsetY: 0,
		
		    set(x, y){
			    this.x = x;
			    this.y = y;
		    }
	    }
	
	    this.group = "entities";
			
		this.textures = [0 ,0 ,0 ,0];
		
		this.name = name;
		this.maxHealth = maxHealth;
		
		Entities.add(this);
	}
	
	textureRegion(){
		return this.textures[this.orientation - 1];
	};
	
	update(){}
	
	at(map, x, y){
		this.position.set(x, y);
		this.map = map;
		map.entities.push(this);
	}
	
	kill(){
		let index = this.map.entities.indexOf(this);
		this.map.entities.splice(index, 1);
	}
}