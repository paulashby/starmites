
BasicGame.MainMenu = function (game) {

	this.music = null; 

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.background = this.game.add.sprite(0,0, 'background');
		this.background.inputEnabled = true;
		this.background.events.onInputDown.add(this.onTap, this);
		this.gameDetails = this.add.group();
		
		this.stackAntyGravity = this.game.add.sprite(BasicGame.gameWidth * 0.025, BasicGame.gameHeight * 0.35, 'stackAntyGravity');
		this.stackSpotted = this.game.add.sprite(this.stackAntyGravity.x + BasicGame.gameWidth,0, 'stackSpotted');
		this.stackHotLarva = this.game.add.sprite(this.stackAntyGravity.x + BasicGame.gameWidth * 2,0, 'stackHotLarva');
		
		this.textX = BasicGame.gameWidth * 0.57;
		this.agLine1 = this.game.add.bitmapText(this.textX, BasicGame.viewHeight * 0.42, 'Lilita', 'It\'s ants vs gravity and', BasicGame.fntSize);
		this.lineHeight = this.agLine1.height * 1.25;
		this.agLine2 = this.game.add.bitmapText(this.textX, this.agLine1.y + this.lineHeight, 'Lilita', 'the ants are losing. Use', BasicGame.fntSize);
		this.agLine3 = this.game.add.bitmapText(this.textX, this.agLine2.y + this.lineHeight, 'Lilita', 'your sense of timing to', BasicGame.fntSize);
		this.agLine4 = this.game.add.bitmapText(this.textX, this.agLine3.y + this.lineHeight, 'Lilita', 'save the little guys', BasicGame.fntSize);
		this.agLine5 = this.game.add.bitmapText(this.textX, this.agLine4.y + this.lineHeight, 'Lilita', 'from the frazzler!', BasicGame.fntSize);
		
		this.agPlayBttnBG = this.game.add.sprite(this.textX, this.agLine5.y + this.lineHeight * 1.3, 'playBttn');
		this.agPlayLabel = this.game.add.bitmapText(this.textX, 0, 'Lilita', 'Play', BasicGame.fntSize);
		this.agPlayLabel.y = this.agPlayBttnBG.y + ((this.agPlayBttnBG.height - this.agPlayLabel.height)/2);
		this.agPlayLabel.x = this.agPlayBttnBG.x + ((this.agPlayBttnBG.width - this.agPlayLabel.width)/2); 
		  
	},
	shutdown: function(){
	},
	onTap: function() {
	window.location.href = 'http://www.primitive.co/antygravity/';	
	},
	onPlay: function(game) { 

	}
};
