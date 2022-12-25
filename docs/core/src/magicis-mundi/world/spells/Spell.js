class Spell{
        constructor(name, color, mana, onUse){
		this.name = name;
		this.mana = mana;
		
		this.onUse = onUse;
	}
	
	use(user, target, level){
		if(user.mana < this.mana)
			return;
		
		user.mana -= this.mana;
		
		if(target == undefined)
			target = null;
		
		this.onUse(user, target);
	}
}