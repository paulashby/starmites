
BasicGame.MainMenu = function (game) {

	

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.gameAssets = [ 
		[ ['It\'s ants vs gravity and', 'the ants are losing. Use', 'your sense of timing to', 'save the little guys', 'from the frazzler!'], 'stackAntyGravity', 'http://www.primitive.co/antygravity/'],
		[ ['Baby grubs look cute,', 'but appearances can be', 'deceptive. Get them', 'before they get you!'], 'stackSpotted', 'http://www.primitive.co/spotted/'],
		[ ['This lively little larva', 'is too close to the lava.', 'If he persits with gem–', 'based risks, he\'ll end', 'up a cadaver.'], 'stackHotLarva', 'http://www.primitive.co/hotlarva/']
		];
		this.textX = undefined;
		this.lineHeight = undefined;
		
		this.background = this.game.add.sprite(0,0, 'background');
		this.nextBttn = this.game.add.sprite(BasicGame.gameWidth * 0.9, BasicGame.viewHeight * 0.1, 'next');
		this.nextBttn.inputEnabled = true; 
		this.nextBttn.events.onInputDown.add(this.onNext, this);
		this.gameDetails = this.add.group();
		this.gameGroups = [];
		this.allGames = this.add.group();
		
		// =======================================================================================================
		// = Add group for each game, populate with content then offset horizontally to make space for next game =
		// =======================================================================================================
		
		for(i = 0; i < this.gameAssets.length; i++){
			this.gameGroups[i] = this.add.group();
			this.setGameText(i);

			var playBttnBG = this.game.add.sprite(this.textX, this.gameGroups[i].getTop().y + this.lineHeight * 1.3, 'playBttn');
			playBttnBG.inputEnabled = true; 
			playBttnBG.events.onInputDown.add(this.onPlay, this);
			playBttnBG.gameURL = this.gameAssets[i][2];
			
			var playLabel = this.game.add.bitmapText(this.textX, 0, 'Lilita', 'PLAY', BasicGame.fntSize);
			playLabel.y = playBttnBG.y + ((playBttnBG.height - playLabel.height)/2);
			playLabel.x = playBttnBG.x + ((playBttnBG.width - playLabel.width)/2);
			this.gameGroups[i].add(playBttnBG);
			this.gameGroups[i].add(playLabel);

			this.gameGroups[i].add(this.game.add.sprite(BasicGame.gameWidth * 0.025, BasicGame.gameHeight * 0.35, this.gameAssets[i][1]));
			this.gameGroups[i].x = BasicGame.gameWidth * i +1;
			this.allGames.add(this.gameGroups[i]);
		}
	},
	setGameText: function(gameNum) {
		
		// ==========================================================
		// = Populate group with content for this.gameAssets[gameNum] =
		// ==========================================================
		
		this.textX = BasicGame.gameWidth * 0.57;
		this.lineHeight;
		for(j = 0; j < this.gameAssets[gameNum][0].length; j++){
			if(j == 0){
				this.gameGroups[gameNum].add(this.game.add.bitmapText(this.textX, BasicGame.viewHeight * 0.42, 'Lilita', this.gameAssets[gameNum][0][j], BasicGame.fntSize));
				this.lineHeight = this.gameGroups[gameNum].getTop().height * 1.25;
			}
			else{
				this.gameGroups[gameNum].add(this.game.add.bitmapText(this.textX, this.gameGroups[gameNum].getTop().y + this.lineHeight, 'Lilita', this.gameAssets[gameNum][0][j], BasicGame.fntSize));
			}
		}
	},
	shutdown: function(){
	},
	onNext: function() {
		this.nextTween = this.game.add.tween(this.allGames).to({x: this.allGames.x - BasicGame.gameWidth}, 300, Phaser.Easing.Cubic.InOut, true);
		this.nextTween.onComplete.add(this.onNextTweenComplete, this);		
	},
	onNextTweenComplete: function() {
		var justViewed = this.allGames.getBottom();
		justViewed.x += this.gameAssets.length * BasicGame.gameWidth;
		this.allGames.bringToTop(justViewed);
	},
	onPlay: function(eTarget) { 
		window.location.href = eTarget.gameURL;
	}
};
