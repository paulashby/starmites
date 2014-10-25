
BasicGame.MainMenu = function (game) {

	

};

BasicGame.MainMenu.prototype = {

	create: function () {
		this.CREDITS_OFF_Y = BasicGame.viewHeight * 0.91;
		
		this.gameAssets = [ 
		[ ['It\'s ants vs gravity and', 'the ants are losing. Use', 'your sense of timing to', 'save the little guys', 'from the frazzler!'], 'stackAntyGravity', 'http://www.primitive.co/antygravity/', 'ANTY GRAVITY:\rFonts: Lightdot 7x6 by very kind\rpermission of Melissa Fernandes,\ravailable from dafont.com\rBoogalooPrime8, based on Boogaloo by John Vargas Beltran,\ravailable from Google Fonts: google.com/fonts\rPlease see accompanying license.\rMusic: mouse organ#2 used by very kind permission of Timbre\rDistributed by freesound.org.\rAll other sounds created at bfxr.net'],
		[ ['Baby grubs look cute,', 'but appearances can be', 'deceptive. Get them', 'before they get you!'], 'stackSpotted', 'http://www.primitive.co/spotted/', 'SPOTTED:\rFont: LuckiestGuyPrime8, based on Luckiest Guy\rby Brian J. Bonislawsky, available from\rGoogle Fonts: google.com/fonts\rPlease see accompanying license.\rMusic: Bugout by Paul Ashby.\rAll other sounds created at bfxr.net'],
		[ ['This lively little larva,', 'he\'s too close to the lava,', 'if he persits with gem', 'based risks, he\'ll end', 'up a cadaver!'], 'stackHotLarva', 'http://www.primitive.co/hotlarva/', 'HOT LARVA:\rFont: SlackeyPrime8, based on Slackey\rby Dave Cohen at Sideshow Foundry,\ravailable from Google Fonts: google.com/fonts\rPlease see accompanying license.\rMusic: SpaceBallDownTheWell by symphoid\rPop sound: Pop 2 by greenvwbeetle\rSizzle sound: cig_extinguish by the_semen_incident\rDying laugh: Jared Helm by oldedgar\rThe above sounds distributed by freesound.org and\rlicensed under creativecommons.org/publicdomain/zero/1.0\rAdditional sounds created at bfxr.net']
		];		
		this.bundleCreditsTxt = 
		'STAR MITES\rFonts:\rLilitaPrime8, based on Lilita by Juan Montoreano,\ravailable from Google Fonts: google.com/fonts.\rPlease see accompanying license.\rSwoosh sound: Multiple Swooshes by lsprings\rThe above sound distributed by freesound.org and\rlicensed under creativecommons.org/publicdomain/zero/1.0\rAll games created with Phaser HTML5 game framework.\rPhaser copyright (c) 2014 Richard Davey, Photon Storm Ltd.\rPhaser is released under the MIT License:\ropensource.org/licenses/MIT';
		
		this.textX = undefined;
		this.lineHeight = undefined;
		
		this.swoosh = this.game.add.audio('swoosh');
		
		this.background = this.game.add.sprite(0,0, 'background');
		this.logo = this.game.add.sprite(BasicGame.gameWidth * 0.055, BasicGame.viewY, 'logo');
		
		this.gameDetails = this.add.group();
		this.gameGroups = [];
		this.allGames = this.add.group();
		
		//this.bundleCredits = this.game.add.bitmapText(0, 0, 'LilitaPrime8', this.bundleCreditsTxt, BasicGame.fntSize * 0.8);
		
		
		// =======================================================================================================
		// = Add group for each game, populate with content then offset horizontally to make space for next game =
		// =======================================================================================================
		
		for(i = 0; i < this.gameAssets.length; i++){
			
			// place content in group so we can easily switch stacking order of content and credits
			this.gameGroups[i] = this.add.group();
			
			// Create a new group
			var gameInfo = this.add.group();
			
			// Add to current game group
			this.gameGroups[i].add(gameInfo);
			
			// Create a reference to the nested group
			this.gameGroups[i].gameInfo = this.gameGroups[i].getTop();
			
			this.gameGroups[i].gameInfo.name = 'gameInfo';
			
			this.setGameText(i);

			var playBttnBG = this.game.add.sprite(this.textX, this.gameGroups[i].gameInfo.getTop().y + this.lineHeight * 1.3, 'playBttn');
			playBttnBG.inputEnabled = true; 
			playBttnBG.events.onInputDown.add(this.onPlay, this);
			playBttnBG.gameURL = this.gameAssets[i][2];
			
			var playLabel = this.game.add.bitmapText(this.textX, 0, 'LilitaPrime8', 'PLAY', BasicGame.fntSize);
			playLabel.y = playBttnBG.y + ((playBttnBG.height - playLabel.height)/2);
			playLabel.x = playBttnBG.x + ((playBttnBG.width - playLabel.width)/2);
			this.gameGroups[i].gameInfo.add(playBttnBG);
			this.gameGroups[i].gameInfo.add(playLabel);
			this.addCredits(i);

			// Add image of game
			this.gameGroups[i].gameInfo.add(this.game.add.sprite(BasicGame.gameWidth * 0.025, BasicGame.gameHeight * 0.35, this.gameAssets[i][1]));
			
			// Set horizontal position of group
			this.gameGroups[i].x = BasicGame.gameWidth * i +1;
			
			this.allGames.add(this.gameGroups[i]);
			
			this.gameGroups[i].bringToTop(this.gameGroups[i].gameInfo);
		}
		
		// Credits label is completely separate from credit group as it remains in place until credits activated
		this.creditsLabel = this.game.add.bitmapText(0, 0, 'LilitaPrime8', 'credits', BasicGame.fntSize * 0.9);
		
		this.creditsLabel.x = BasicGame.viewWidth - this.creditsLabel.width * 1.2;
		this.creditsLabel.y = BasicGame.viewHeight - this.creditsLabel.height * 1.6;
		this.creditsLabel.alpha = 0.5;

		this.nextBttn = this.game.add.sprite(BasicGame.gameWidth * 0.9, BasicGame.viewY + BasicGame.viewHeight * 0.1, 'next');
		this.nextBttn.inputEnabled = true; 
		this.nextBttn.events.onInputDown.add(this.onNext, this);
		
		
		this.logoTweenIn = this.addTransitionTween(this.logo, false, true);
		this.logoTweenIn.onComplete.add(function() { this.swoosh.play(); }, this);
		this.nextBttnTweenIn = this.addTransitionTween(this.nextBttn, false, true);
		this.allGamesTweenIn = this.addTransitionTween(this.allGames, true, true);
		this.creditsLabelTweenIn = this.addTransitionTween(this.creditsLabel, true, true);

		this.logoTweenIn.start();
		this.nextBttnTweenIn.start();
		this.allGamesTweenIn.start();
		this.creditsLabelTweenIn.start();		
	},
	addTransitionTween: function(tweenedObj, tweenUp, entryTween) {
		var transTween = this.add.tween(tweenedObj);
		var tweenDir = tweenUp ? -1 : 1;
		var y1dir = entryTween ? tweenDir : tweenDir * -1; 
		var tweenY1 = tweenedObj.y + (BasicGame.gameHeight * 0.1 * y1dir);
		var tweenY2 = entryTween ? tweenedObj.y : (BasicGame.gameHeight + tweenedObj.height) * tweenDir;
		var tweenDuration = 150;
		transTween.to( { y: tweenY1}, tweenDuration*2, Phaser.Easing.Quadratic.InOut)
	  .to( { y: tweenY2 }, tweenDuration, Phaser.Easing.Quadratic.InOut);
		if(entryTween){
			tweenedObj.y = (BasicGame.gameHeight + tweenedObj.height) * - tweenDir;
		}
		return transTween;		
	},
	setGameText: function(gameNum) {
		
		// ==========================================================
		// = Populate group with content for this.gameAssets[gameNum] =
		// ==========================================================
		
		this.textX = BasicGame.gameWidth * 0.57;
		this.lineHeight;
		for(j = 0; j < this.gameAssets[gameNum][0].length; j++){
			if(j == 0){
				this.gameGroups[gameNum].gameInfo.add(this.game.add.bitmapText(this.textX, BasicGame.viewHeight * 0.4, 'LilitaPrime8', this.gameAssets[gameNum][0][j], BasicGame.fntSize));
				this.lineHeight = this.gameGroups[gameNum].gameInfo.getTop().height * 1.25;
			}
			else{
				this.gameGroups[gameNum].gameInfo.add(this.game.add.bitmapText(this.textX, this.gameGroups[gameNum].gameInfo.getTop().y + this.lineHeight, 'LilitaPrime8', this.gameAssets[gameNum][0][j], BasicGame.fntSize));
			}
		}
	},
	addCredits: function(gameNum) {
		// ==================================================================================
		// = Add credits for this game - once set will be positioned below bottom of screen =
		// ==================================================================================
		// Create a new group
		var gameCredits = this.add.group();
		
		// Add to current game group
		this.gameGroups[i].add(gameCredits);
		
		// Create a reference to the nested group
		this.gameGroups[i].gameCredits = this.gameGroups[i].getTop();
		
		this.gameGroups[i].gameCredits.name = 'gameCredits';
		
		this.initCredits(i);
	},
	initCredits: function(gameNum) {
		this.makeCreditGroups(gameNum);
		this.setCreditContent(gameNum, this.gameGroups[gameNum].gameCredits.currGameCredits);
		this.setCreditContent(gameNum, this.gameGroups[gameNum].gameCredits.bundleCredits);
	},
	makeCreditGroups: function(gameNum) {
		// ===============================================================================================
		// = Add nested groups (for game credits and bundle credits) to current game's gameCredits group
		// = These will be shuffled when 'next' button is clicked in credits view =
		// ===============================================================================================
		var currGameCredits = this.add.group();
		this.gameGroups[gameNum].gameCredits.add(currGameCredits);
		
		// Create a reference to the nested group
		this.gameGroups[gameNum].gameCredits.currGameCredits = currGameCredits;
		
		var bundleCredits = this.add.group();
		this.gameGroups[gameNum].gameCredits.add(bundleCredits);
		
		// Create a reference to the nested group
		this.gameGroups[gameNum].gameCredits.bundleCredits = bundleCredits;		
	},
	setCreditContent: function(gameNum, cGroup) {
		
		var creditsPanel = this.game.add.sprite(BasicGame.viewX-1, this.CREDITS_OFF_Y, 'creditsbg');
		creditsPanel.width = BasicGame.viewWidth + 2;
		creditsPanel.height = BasicGame.viewHeight + this.CREDITS_OFF_Y;
		creditsPanel.inputEnabled = true; 
		creditsPanel.events.onInputDown.add(this.onCreditPanelTap, this);
		cGroup.add(creditsPanel);
		
		var creditsText = this.makeCreditBmapTxt(this.gameAssets[gameNum][3]);
		var bundleCreditsText = this.makeCreditBmapTxt(this.bundleCreditsTxt);
		
		this.gameGroups[i].gameCredits.currGameCredits.add(creditsText);
		
		// Create a reference to the credits text
		this.gameGroups[i].gameCredits.currGameCredits.creditsText = creditsText;
		
		this.gameGroups[i].gameCredits.bundleCredits.add(bundleCreditsText);
		
		// Create a reference to the bundle text
		this.gameGroups[i].gameCredits.bundleCredits.bundleCreditsText = bundleCreditsText;
		
		this.gameGroups[i].gameCredits.bundleCredits.x = BasicGame.viewWidth;
	},
	makeCreditBmapTxt: function(txt) {
		var bmapTxt = this.game.add.bitmapText(BasicGame.viewWidth * 0.05, 0, 'LilitaPrime8', txt, BasicGame.fntSize * 0.9);
		bmapTxt.y = BasicGame.viewHeight * 1.95 - bmapTxt.height;
		return bmapTxt;		
	},
	onNext: function() {
		if (this.creditsLabel.visible){
			var nextTween = this.game.add.tween(this.allGames).to({x: this.allGames.x - BasicGame.gameWidth}, 300, Phaser.Easing.Cubic.InOut, true);
			nextTween.onComplete.add(this.onNextTweenComplete, this, this.allGames);
		}	
		else{
			var currCredits  = this.allGames.getAt(0).getAt(1);
			var nextTween = this.game.add.tween(currCredits).to({x: currCredits.x - BasicGame.gameWidth}, 300, Phaser.Easing.Cubic.InOut, true);
			nextTween.onComplete.add(this.onNextTweenComplete, this, currCredits);
		}	
	},
	onNextTweenComplete: function(tweenedGroup) {
		// ========================
		// = cycle group children =
		// ========================
		var justViewed = tweenedGroup.getBottom();
		justViewed.x += tweenedGroup.length * BasicGame.gameWidth;
		tweenedGroup.bringToTop(justViewed);
		this.swoosh.play();
	},
	onCreditPanelTap: function(creditsPanel) {
		// ========================
		// = Toggles credit panel =
		// ========================
		if (this.creditsLabel.visible) {
			this.creditsLabel.visible = false;
			creditsPanel.parent.parent.parent.bringToTop(creditsPanel.parent.parent);
			this.creditsPanelOnTween = this.game.add.tween(creditsPanel.parent.parent).to({y: -BasicGame.viewHeight}, 150, Phaser.Easing.Cubic.InOut, true);
			this.creditsPanelOnTween.onComplete.add(function() { this.swoosh.play(); }, this);
		}
		else{
			this.creditsPanelOffTween = this.game.add.tween(creditsPanel.parent.parent).to({y: 0}, 150, Phaser.Easing.Cubic.InOut, true);
			this.creditsPanelOffTween.onComplete.add(function() { this.creditsLabel.visible = true; creditsPanel.parent.parent.parent.bringToTop(creditsPanel.parent.parent.parent.gameInfo); }, this);
			if(creditsPanel.parent.parent.getAt(0) === creditsPanel.parent.parent.bundleCredits){
				this.onNextTweenComplete(creditsPanel.parent.parent);
				creditsPanel.parent.parent.x -= BasicGame.viewWidth;
			}
			else{
				this.creditsPanelOffTween.onComplete.add(function() { this.swoosh.play(); }, this);
			}
		}
	},
	onPlay: function(eTarget) { 
		window.location.href = eTarget.gameURL;
	},
	removeSound: function(_sound) {
		_sound.stop();
		_sound = null;		
	},	
	removeTween: function(_tween) {
		if (_tween) {
			_tween.onComplete.removeAll();
			_tween.stop();
			_tween = null;
		}
	},	
	shutdown: function(){
		this.background.destroy();
		this.allGames.destroy();
		this.gameGroups.destroy();
		this.gameDetails.destroy();
		this.nextBttn.destroy();
		this.creditsLabel.destroy();
		this.logo.destroy();
		this.removeTween(this.logoTweenIn);
		this.removeTween(this.nextBttnTweenIn);
		this.removeTween(this.allGamesTweenIn);
		this.removeTween(this.creditsLabelTweenIn);
		this.removeSound(this.swoosh);
	},
};
