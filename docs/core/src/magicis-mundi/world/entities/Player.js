class Player extends Entity{	
	
	constructor(){
		super("player", 100);
	}
			
    damage(amout){
                if(this.health <= 0){
			this.isDead = true;
		}else{
			this.health -= amout;
							
			if(this.health <= 0)this.isDead = true;
	        }
	}
	
	
}