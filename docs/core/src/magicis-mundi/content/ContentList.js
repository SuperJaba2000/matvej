class ContentList{
	constructor(load, texturesRequired){
		this.lastid = 1;
		this.content = new Set();
		
		this.texturesRequired = texturesRequired;
		
		this.list = new Set();
		
		this.load = load;
	}
	
	add(content){
		content.id = this.lastid++;
		this.list.add(content);
		
		return content.id;
	}
	
	getById(id){
		for (let content of this.list){
			if(content.id == id) return content;
		}	
	}
}