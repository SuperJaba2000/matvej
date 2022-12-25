//decoration block
class Overlay extends Block{
	constructor(name, color, settings){
		super(name, color, settings);
		
		this.speedMultiplier = 1.0;
	    this.canWalk = true;
	
	    this.group = "overlays";
    }
}