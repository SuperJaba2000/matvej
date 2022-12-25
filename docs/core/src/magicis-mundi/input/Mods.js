const Mods = Object.freeze({
	
        get list(){
		return Vars.mods;
	},
	
	add( mod ){
	        Vars.mods.add( mod );
	}
});