class Controls{
	constructor(){
		this.keys = [
		{
			key: 'ArrowUp',
			action: function(player, tiles){
				if(player.orientation != 1){
                    player.orientation = 1;		
				}else{
					let x = player.position.x;
					let y = player.position.y - 1;
					
					if(!tiles.valid(x, y+1) || !tiles.get(x, y+1).floor || !tiles.get(x, y+1).floor.canWalk)
						return;
					
					let nextTile = tiles.get(x, y);
					let nextBottomTile = tiles.get(x, y+1);
					
					if(nextTile.block)
						nextTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextBottomTile.block)
						nextBottomTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextTile.block || nextBottomTile.block)
						return;
					
		            player.position.y--;
					Vars.changeable.camera.update();
				}
			}
		},
		
	    {
		    key: 'ArrowDown',
			action: function(player, tiles){
				if(player.orientation != 3){
                    player.orientation = 3;		
				}else{
					let x = player.position.x;
					let y = player.position.y + 1;
					
					if(!tiles.valid(x, y+1) ||  !tiles.get(x, y+1).floor || !tiles.get(x, y+1).floor.canWalk)
						return;
					
					let nextTile = tiles.get(x, y);
					let nextBottomTile = tiles.get(x, y+1);
					
					if(nextTile.block)
						nextTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextBottomTile.block)
						nextBottomTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextTile.block || nextBottomTile.block)
						return;
					
		            player.position.y++;
					Vars.changeable.camera.update();
				}
			}
		},
		
		{
		    key: 'ArrowRight',
			action: function(player, tiles){
				if(player.orientation != 2){
                    player.orientation = 2;		
				}else{
					let x = player.position.x + 1;
					let y = player.position.y;
					
					if(!tiles.valid(x, y+1) ||  !tiles.get(x, y+1).floor || !tiles.get(x, y+1).floor.canWalk)
						return;
					
					let nextTile = tiles.get(x, y);
					let nextBottomTile = tiles.get(x, y+1);
					
					if(nextTile.block)
						nextTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextBottomTile.block)
						nextBottomTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextTile.block || nextBottomTile.block)
						return;
					
		            player.position.x++;
					Vars.changeable.camera.update();
				}
			}
		},
		
		{
		    key: 'ArrowLeft',
			action: function(player, tiles){
				if(player.orientation != 4){
                    player.orientation = 4;		
				}else{
					let x = player.position.x - 1;
					let y = player.position.y;
					
					if(!tiles.valid(x, y+1) ||  !tiles.get(x, y+1).floor || !tiles.get(x, y+1).floor.canWalk)
						return;
					
					let nextTile = tiles.get(x, y);
					let nextBottomTile = tiles.get(x, y+1);
					
					if(nextTile.block)
						nextTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextBottomTile.block)
						nextBottomTile.block.playerEntered(player, Vars.changeable.activeMap);
					
					if(nextTile.block || nextBottomTile.block)
						return;
					
		            player.position.x--;
					Vars.changeable.camera.update();
				}
			}
		}
		];

	    this.lastKey = null;
	}
	
	
	
	init(){
		Vars.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		
		if(Vars.isMobile){
			let screenSize = Vars.graphics.drawer.getTilesScreen();
			let joystickSize = Math.min(screenSize.width*Vars.tileSize, screenSize.height*Vars.tileSize)/5;
			
			this.joystick = new JoyStick('joystick-box',{
                title: 'joystick-canvas',
                width: joystickSize, height: joystickSize,
                internalFillColor: '#0000FF',
                externalFillColor: '#0000FF',
                internalLineWidth: 2,
                internalStrokeColor: '#000033',
                externalLineWidth: 2,
                externalStrokeColor: '#0000FF',
                autoReturnToCenter: true   
            }, null);
			
			UI.get('joystick-box').style.visibility = 'visible';
		    UI.get('joystick-box').style.width = UI.get('joystick-box').style.height = `${joystickSize}px`;
		}
		
		var context = this;
		var keys = this.keys;
		
		document.onkeydown = (event) => {
			var instructionIndex = keys.findIndex(instruction => instruction.key == event.key);
			
			if(instructionIndex == -1)
				return false;
		        
			context.lastKey = instructionIndex;
		}
	}
	
    update(){
		let playerx = Vars.changeable.player.position.x;
		let playery = Vars.changeable.player.position.y+1;
		let player_biome = Vars.changeable.activeMap.getActiveWorld().getActiveDimension().tiles.get(playerx, playery).biome;
		
	    UI.get('debug-box').innerHTML = `x: ${playerx}; y: ${playery}; <br>biome: ${player_biome}`;
		
		if(Vars.isMobile && Core.time % 5 == 0){
			switch(this.joystick.GetDir()){
				case 'N': this.lastKey = this.keys.findIndex(i => i.key == 'ArrowUp');
                    break;
					
				case 'NW':
				    if(Math.abs(this.joystick.GetY()) > Math.abs(this.joystick.GetX())){
						this.lastKey = this.keys.findIndex(i => i.key == 'ArrowUp');
					}else{
						if(Math.abs(this.joystick.GetY()) < Math.abs(this.joystick.GetX())){
							this.lastKey = this.keys.findIndex(i => i.key == 'ArrowLeft');
						}else{
							this.lastKey = (Core.time % 4 == 0 || Core.time % 4 == 1) ? this.keys.findIndex(i => i.key == 'ArrowUp') :
							    this.keys.findIndex(i => i.key == 'ArrowLeft');
						}
					}

			        break;
					
				case 'NE':
		            if(Math.abs(this.joystick.GetY()) > Math.abs(this.joystick.GetX())){
						this.lastKey = this.keys.findIndex(i => i.key == 'ArrowUp');
					}else{
						if(Math.abs(this.joystick.GetY()) < Math.abs(this.joystick.GetX())){
							this.lastKey = this.keys.findIndex(i => i.key == 'ArrowRight');
						}else{
							this.lastKey = (Core.time % 4 == 0 || Core.time % 4 == 1) ? this.keys.findIndex(i => i.key == 'ArrowUp') :
							    this.keys.findIndex(i => i.key == 'ArrowRight');
						}
					}
					
			        break;
		
		        case 'S': this.lastKey = this.keys.findIndex(i => i.key == 'ArrowDown');
			        break;
					
				case 'SW':
		            if(Math.abs(this.joystick.GetY()) > Math.abs(this.joystick.GetX())){
						this.lastKey = this.keys.findIndex(i => i.key == 'ArrowDown');
					}else{
						if(Math.abs(this.joystick.GetY()) < Math.abs(this.joystick.GetX())){
							this.lastKey = this.keys.findIndex(i => i.key == 'ArrowLeft');
						}else{
							this.lastKey = (Core.time % 4 == 0 || Core.time % 4 == 1) ? this.keys.findIndex(i => i.key == 'ArrowDown') :
							    this.keys.findIndex(i => i.key == 'ArrowLeft');
						}
					}
			        break;
					
				case 'SE':
		            if(Math.abs(this.joystick.GetY()) > Math.abs(this.joystick.GetX())){
						this.lastKey = this.keys.findIndex(i => i.key == 'ArrowDown');
					}else{
						if(Math.abs(this.joystick.GetY()) < Math.abs(this.joystick.GetX())){
							this.lastKey = this.keys.findIndex(i => i.key == 'ArrowRight');
						}else{
							this.lastKey = (Core.time % 4 == 0 || Core.time % 4 == 1) ? this.keys.findIndex(i => i.key == 'ArrowDown') :
							    this.keys.findIndex(i => i.key == 'ArrowRight');
						}
					}
			        break;
			
		        case 'W': this.lastKey = this.keys.findIndex(i => i.key == 'ArrowLeft');
			        break;
			
		        case 'E': this.lastKey = this.keys.findIndex(i => i.key == 'ArrowRight');
			        break;
			}
		}
		
		/* no instructions */
		if(this.lastKey == null)
			return;
		
		var player = Vars.changeable.player;
		var tiles = Vars.changeable.activeMap.getActiveWorld().getActiveDimension().tiles;
		
		this.keys[this.lastKey].action(player, tiles);
		
		this.lastKey = null;
	}
}
