const UI = {
    update(gameState){
		this.updateVisibleElements(gameState.visibleElements);
		
		//update scene bluring in menu
		this.get('scene').style.filter = gameState.blurScene ? 'blur(3px)' : 'none';
		
		/*this.get('fps-box').innerHTML = (1000/frameTime).toFixed(1) + ' fps';*/
	},
	
	updateVisibleElements(list){
		this.visibleElements = list;
		
		for(let elementId of this.allElements){
			var element = this.get(elementId);
			element.style.visibility = this.visibleElements.includes(elementId) ? 'visible' : 'hidden';
		}   
	},
	
	get(id){
		return document.getElementById(id);
	},
	
	allElements: [
	    'menu-box', 
		    'font-box', 
			
			'main-menu-box',
			    'logo-box',
				'main-menu-buttons',
				    'main-menu-button-play',
					'main-menu-button-settings',
			
			'play-menu-box',
			    'play-menu-exit',
				'play-menu-buttons',
				    'play-menu-button-singleplayer',
					'play-menu-button-load',
					'play-menu-button-multyplayer',
			
			'settings-menu-box',
			    'settings-menu-exit',
				
			'version-box',
		
		'scene-box',
		    'scene',
			'button-pause',
			//'joystick-box',
			
			'debug-box'
    ],
}

/* setting actions on html elements */

UI.get('main-menu-button-play').onclick = () => {
    Vars.changeable.gameState = new GameStates().playMenu;
};

UI.get('main-menu-button-settings').onclick = () => {
    Vars.changeable.gameState = new GameStates().settingsMenu;
};

UI.get('play-menu-exit').onclick = UI.get('settings-menu-exit').onclick = () => {
	Vars.changeable.gameState.exit();
};

UI.get('play-menu-button-singleplayer').onclick = () => {
	Vars.changeable.gameState = new GameStates().playingNow;
};

UI.get('button-pause').onclick = () => {
	Vars.changeable.gameState.exit();
};

/*document.addEventListener('keydown', (event) => {
	if(event.code == 'Escape')
		Vars.changeable.gameState.exit();
});

window.onbeforeunload = () => {
  return "Есть несохранённые изменения. Всё равно уходим?";
};*/

window.onload = () => {
	UI.get('version-box').innerHTML = Vars.version.name;
};