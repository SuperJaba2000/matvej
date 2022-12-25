class spells{
	load(){
                //region basic
	 
	       /*this.light = new Spell('Illuminatum', '#FFFFFF', 0, (user, target, level) => {
	       	user.viewDistance += 20;		
	       	setTimeout(180, () => user.viewDistance-= 20);
		
	       	let lightSphere = new LighteEntity();
	      	lightSphere.position.set(user.position.x, user.position.y);
		   	lightSphere.rotation = user.rotation;
		       
		   	lightSphere.speed = 4;
		   	Vars.changeable.activeMap.getActiveWorld().getActiveDimension().entities.push(lightSphere);
		
		   	setTimeout(180, () => {
		   		//delete sphere
		   		//Vars.changeable.activeMap.getActiveWorld().getActiveDimension().entities.pop(lightSphere);
		   	});
	   	});*/

           	this.fire = new Spell('Inflammatio', '#FF3521', 10, (user, target, level) => {
		   	let tiles = Vars.changeable.activemap.getActiveWorld().getActiveDimension().tiles;
                   	
                 	  switch(level) {
                    	       case 1:
		   			let fireball = Entities.fireballSmall;
			   		//fireball.speed
			   	        break;
			
			   	case 2:
			
			      	     break;
					
			   	case 3:
			
			          	 break;
		   	} 
	   	});
        }
};

const Spells = new spells();
Spells.load();