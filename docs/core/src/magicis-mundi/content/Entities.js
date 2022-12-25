const Entities = new ContentList(
	function load(){
		//region basic
	
	    this.player = Vars.changeable.player = new Player();
		this.add(this.player)
	
	    //endregion
	    //region magic
	
	    //this.magicSphereSmall = new MagicSphere("magic-sphere", 32, "#FFFFFF", 60);
		
		//endregion
	}, true
);