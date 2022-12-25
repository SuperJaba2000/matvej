class GameState{
	constructor(name, parameters, visibleElements){
		this.name = name;
		
		this.pause = parameters.isPause != undefined ? parameters.isPause : false;
		this.blurScene = parameters.blurScene != undefined ? parameters.blurScene : false;
		this.updateGraphics = parameters.updateGraphics != undefined ? parameters.updateGraphics : true;
		
		this.visibleElements = visibleElements;
		
		if(parameters.parent)
			this.parentGameState = parameters.parent;
	}
	
	exit(){
		if(!this.parentGameState)
			window.close();
		
		Vars.changeable.gameState = this.parentGameState;
	}
}

class GameStates{
	constructor(){
		this.init();
	}
	
	init(){
		/* create game states */
		
		/* the player is in the main menu with the game logo */
		this.mainMenu = new GameState('in-main-menu', { 
		    isPause: true, 
			blurScene: true 
		  },[
		    'menu-box', 'font-box', 
			  'main-menu-box', 'logo-box', 'main-menu-buttons',
				'main-menu-button-play', 'main-menu-button-settings',
			  'version-box',
			'scene-box', 'scene'
		]);
		
		/* the player is in the game mode selection menu */
		this.playMenu = new GameState('in-play-menu', { 
		    isPause: true, 
			blurScene: true, 
			parent: this.mainMenu 
		  },[
            'menu-box', 'font-box',
              'play-menu-box', 'play-menu-exit', 'play-menu-buttons',
				'play-menu-button-singleplayer', 'play-menu-button-load', 'play-menu-button-multyplayer',
		      //hide version???
		    'scene-box', 'scene'
	    ]);
		
		/* the player is in the game settings menu */
		this.settingsMenu = new GameState('in-settings-menu', { 
		    isPause: true, 
			blurScene: true, 
			parent: this.mainMenu
		  },[
		    'menu-box', 'font-box', 
              'settings-menu-box', 'settings-menu-exit',
              'version-box',
            'scene-box', 'scene',
		]);
		
		/* the player is in the menu of creating a new map */
		this.mapCreatingMenu = new GameState('in-map-creating-menu', { 
		    isPause: true, 
			blurScene: true,
			parent: this.playMenu
		  },[
		    //finish it later
		]);
		
		/* the game is currently active*/
		this.playingNow = new GameState('in-game-now', {
			parent: this.mainMenu
		  },[
		    'scene-box', 'scene', 'button-pause', 'debug-box'
			//later I will attach here a check for a mobile device from Vars or Controls
			
		]);
		
		if(true)
			this.playingNow.visibleElements.push('debug-box');
	}
}