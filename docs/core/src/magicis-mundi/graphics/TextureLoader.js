class TextureLoader{
	constructor(directory){
		this.directory = directory;
		
		this.objectives = [];
		this.total = this.uploaded = 0;
	}
	
	addObjectives(objectives){
		if(!objectives.length && !objectives.size){
			this.objectives.push(objectives)
		}else{
			for(let objective of objectives)
				this.objectives.push(objective)
		}
	}
	
	load(objective, callback){
		//objective is null or undefined
		if(!objective)
			return false;
		
		//for functions
		let loader = this;
		
		
		for(let texture = 0; texture < objective.textures.length; texture++){
			loader.total++;
			
			let image = new Image(); 					
			image.onload = () => callback();
			image.src = `${loader.directory}/${objective.group}/${objective.name}/${texture}.png`;
					
			objective.textures[texture] = image;
		}
		
		if(objective.group != 'floors')
			return;
		
		/* not all floors has edge and cliff textures now */
		//return;
		
		//load edge and cliff textures
		for(let side = 0; side < 4; side++){
			loader.total += 2;
			
			let edgeImage = new Image(); 
            let cliffImage = new Image();				
			
			edgeImage.onload = cliffImage.onload = () => callback();
			edgeImage.onerror = cliffImage.onerror = () => loader.total--;
			
			edgeImage.src = `${loader.directory}/${objective.group}/${objective.name}/edge${side}.png`;
			cliffImage.src = `${loader.directory}/${objective.group}/${objective.name}/cliff${side}.png`;
			
			objective.edges[side] = edgeImage;
			objective.cliffs[side] = cliffImage;
		}
	}
	
	loadAll(callback){
		//for functions
		let loader = this;
		
		//callback for one texture
		let uploaded = () => {
			loader.uploaded++;
			
			if(loader.uploaded == loader.total)
				callback()
		}
		
		for(let objective of loader.objectives)
			loader.load(objective, uploaded);
	}
}