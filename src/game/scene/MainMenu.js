
BasicGame.MainMenu = function (game) {

	this.music = null; 

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.gameText = [['It\'s ants vs gravity and', 'the ants are losing. Use', 'your sense of timing to', 'save the little guys', 'from the frazzler!'],
		['Sleepy grubs look cute', 'but appearances can be', 'deceptive. Get them', 'before they get you!'],
		['This lively little larva', 'doesn’t like the lava,', 'but he can’t resist', 'risking it to raid the', 'shiny jewels.']];
		this.textX = undefined;
		this.lineHeight = undefined;
		
		this.background = this.game.add.sprite(0,0, 'background');
		this.background.inputEnabled = true;
		this.background.events.onInputDown.add(this.onTap, this);
		this.gameDetails = this.add.group();
		this.gameGroups = [];
		
		// =======================================================================================================
		// = Add group for each game, populate with content then offset horizontally to make space for next game =
		// =======================================================================================================
		
		for(i = 0; i < this.gameText.length; i++){
			this.gameGroups[i] = this.add.group();
			this.setGameText(i);
			//this.agPlayBttnBG = this.game.add.sprite(this.textX, this.gameGroups[i].getTop().y + this.lineHeight * 1.3, 'playBttn');
			//this.agPlayLabel = this.game.add.bitmapText(this.textX, 0, 'Lilita', 'Play', BasicGame.fntSize);
			//this.agPlayLabel.y = this.agPlayBttnBG.y + ((this.agPlayBttnBG.height - this.agPlayLabel.height)/2);
			//this.agPlayLabel.x = this.agPlayBttnBG.x + ((this.agPlayBttnBG.width - this.agPlayLabel.width)/2);
		}
		
		//this.stackAntyGravity = this.game.add.sprite(BasicGame.gameWidth * 0.025, BasicGame.gameHeight * 0.35, 'stackAntyGravity');
		// this.stackSpotted = this.game.add.sprite(this.stackAntyGravity.x + BasicGame.gameWidth,0, 'stackSpotted');
		//this.stackHotLarva = this.game.add.sprite(this.stackAntyGravity.x + BasicGame.gameWidth * 2,0, 'stackHotLarva');
	},
	setGameText: function(gameNum) {
		
		// ==========================================================
		// = Populate group with content for this.gameText[gameNum] =
		// ==========================================================
		
		this.textX = BasicGame.gameWidth * 0.57;
		this.lineHeight;
		for(i = 0; i < this.gameText[gameNum].length; i++){
			if(i == 0){
				this.gameGroups[gameNum].add(this.game.add.bitmapText(this.textX, BasicGame.viewHeight * 0.42, 'Lilita', this.gameText[gameNum][i], BasicGame.fntSize));
				this.lineHeight = this.gameGroups[gameNum].getTop().height * 1.25;
			}
			else{
				this.gameGroups[gameNum].add(this.game.add.bitmapText(this.textX, this.gameGroups[gameNum].getTop().y + this.lineHeight, 'Lilita', this.gameText[gameNum][i], BasicGame.fntSize));
			}
		}
	},
	shutdown: function(){
	},
	onTap: function() {
	window.location.href = 'http://www.primitive.co/antygravity/';	
	},
	onPlay: function(game) { 

	}
};
