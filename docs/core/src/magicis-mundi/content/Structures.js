const Structures = new ContentList(
	function load(){
	    this.mine = new Structure('mine', {width: 3, height: 3}, [
		    [{block: Blocks.mine.getWithVariant(0)}, {block: Blocks.mine.getWithVariant(1)}, {block: Blocks.mine.getWithVariant(2)}],
			[{block: Blocks.mine.getWithVariant(3)}, {block: Blocks.mine.getWithVariant(4)}, {block: Blocks.mine.getWithVariant(5)}],
			[{block: Blocks.mine.getWithVariant(6)}, {block: Blocks.mine.getWithVariant(7)}, {block: Blocks.mine.getWithVariant(8)}]
		]);
		
		this.tree = new Structure('tree', {width: 2, height: 3}, [
		    [{block: Blocks.tree.getWithVariant(0)}, {block: Blocks.tree.getWithVariant(1)}],
			[{block: Blocks.tree.getWithVariant(2)}, {block: Blocks.tree.getWithVariant(3)}],
			[{block: Blocks.tree.getWithVariant(4)}, {block: Blocks.tree.getWithVariant(5)}]
	    ]);
	}, false
);