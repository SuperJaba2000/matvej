class Structure{
	
	width = 15;
	height = 15;
	
	offSetY = 0; offSetX = 0;
	
	//array of structure tiles
	plan = [];
	
	constructor(name, width, height){
	        this.name = name;
		this.width = width;
		this.height = height;
	}
	
	set(tiles, x, y){
		var tilesCopy = tiles;
		
		y -= this.offSetY;
		x -= this.offSetX;
		
		for(var y2 = 0; y2 < this.height; y2++){
			for(var x2 = 0; x2 < this.width; x2++){
				if( (y+y2 >= 0 && y+y2 < tilesCopy.length) && (x+x2 >= 0 && x+x2 < tilesCopy[0].length) ){
				        let mapTile = tilesCopy[y+y2][x+x2];
				        let planTile = this.plan[y2][x2];
				
				        if(planTile !== 0) mapTile = Object.assign(mapTile, planTile);
				
				        tilesCopy[y+y2][x+x2] = mapTile;
				}
			}
		}
		
		return tilesCopy;
	}
}

const spawnShip = new Structure("spawn-ship", 5, 12);
spawnShip.offSetY = 7; spawnShip.offSetX = 2;

spawnShip.plan = [
        [                   0,                                     0,                  {floor: planksFloor},                   0,                                    0,                   ],
        [                   0,                                     0,                  {floor: planksFloor},                   0,                                    0,                   ],
	[                   0,                  {floor: planksFloor},{floor: planksFloor},{floor: planksFloor},                   0,                  ],
	[                   0,                  {floor: planksFloor},{floor: planksFloor},{floor: planksFloor},                   0,                  ],
	[                   0,                  {floor: planksFloor},{floor: planksFloor},{floor: planksFloor},                   0,                  ],
	[                   0,                  {floor: planksFloor},{floor: planksFloor},{floor: planksFloor},                   0,                  ],
	[{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},],
	[{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},],
	[{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},],
	[{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},{floor: planksFloor},],
	[                   0,                  {floor: planksFloor},{floor: planksFloor},{floor: planksFloor},                   0,                  ],
	[                   0,                  {floor: planksFloor},{floor: planksFloor},{floor: planksFloor},                   0,                  ],
];

const test_tree = new Structure("test-tree", 3, 3);
test_tree.offSetY = 1; test_tree.offSetX = 1;

test_tree.plan = [
        [{block: leavesBlock},{block: leavesBlock},{block: leavesBlock}],
        [{block: leavesBlock},  {block: woodBlock},  {block: leavesBlock}],
	[{block: leavesBlock},{block: leavesBlock},{block: leavesBlock}],
];