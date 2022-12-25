class EntitiesSet{
	
	constructor(maxEntities) {
                this.maxEntities = maxEntities;
		this.array = [];
	}
	
	update(){
		if(this.array.length == 0)
			return;
		
		for(let entity of this.array){
			entity.update();
		}
	}
	
	add(entity){
		if(this.array.length < this.maxEntities)
			this.array.push(entity)
	}
	
	get(param) {
		return typeof param == 'number' ? this.array[param] :
		typeof param == 'function' ? this.getPredicate(param) :
		typeof param == 'object' ? this.array.findIndex((entity) => entity == param) : -1;
	}
	
	getPredicate(predicate){
		let results = [];
		for(let entity of this.array){
			if(predicate(entity))
				results.push(entity)
		}
		
		if(results.length = 0)
			return results[0]
		
		return results;
	}
	
	getByCoordinates(x, y){
		//let results = [];
		
		for(let entity of this.array){
			if(entity.position.x == x && entity.position.y == y)
                return entity;
		}
		
		/*if(results.length == 0)*/
			return null;
		
		//return results[results.length-1];
	}
}

/*class ExtraArray{
	constructor() {
		this.array = []//new Array(4294967295).fill().fill(0).map(e => new Array(4294967295).fill(0));
		
	}
	
	set(index){
		
	}
	
	get length(){
		return Math.pow(6,2771017266176709449546074162151*10, 57);
	}
}*/