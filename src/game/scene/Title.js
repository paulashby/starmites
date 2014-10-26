
BasicGame.Title = function (game) {

	

};

BasicGame.Title.prototype = {

	create: function () {
		this.woosh = this.game.add.audio('woosh');
		
		this.background = this.game.add.sprite(0,0, 'background');
		this.logoMain = this.game.add.sprite(BasicGame.gameWidth * 0.49, BasicGame.viewHeight * 0.43, 'logoMain');
		this.logoMain.anchor.setTo(0.5, 0.5);
		
		var playBttnBG = this.game.add.sprite(BasicGame.gameWidth * 0.77, BasicGame.viewY + (BasicGame.viewHeight * 0.66), 'playBttn');
		playBttnBG.inputEnabled = true; 
		playBttnBG.events.onInputDown.add(this.onPlay, this);
		
		var playLabel = this.game.add.bitmapText(this.textX, 0, 'LilitaPrime8', 'START', BasicGame.fntSize);
		playLabel.y = playBttnBG.y + ((playBttnBG.height - playLabel.height)/2);
		playLabel.x = playBttnBG.x + ((playBttnBG.width - playLabel.width)/2);
		
		this.foregroundElements = this.add.group();
		this.foregroundElements.add(this.logoMain);
		this.foregroundElements.add(playBttnBG);
		this.foregroundElements.add(playLabel);
		
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//Set up exit tweens first as y values will otherwise be mid-tween when exit values are set
		// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this.fgElementsTweenOut = this.addTransitionTween(this.foregroundElements, false, false);
		this.fgElementsTweenOut._lastChild.onComplete.add(function() { this.game.state.start('MainMenu'); }, this);
		
		this.fgElementsTweenIn = this.addTransitionTween(this.foregroundElements, true, true);
		this.fgElementsTweenIn.onComplete.add(function() { this.woosh.play(); }, this);
			
		this.fgElementsTweenIn.start();		
	},
	addTransitionTween: function(tweenedObj, tweenUp, entryTween) {
		var transTween = this.add.tween(tweenedObj);
		var tweenDir = tweenUp ? -1 : 1;
		var y1dir = entryTween ? tweenDir : tweenDir * -1; 
		var tweenY1 = tweenedObj.y + (BasicGame.gameHeight * 0.25 * y1dir);
		var tweenY2 = entryTween ? tweenedObj.y : (BasicGame.gameHeight + tweenedObj.height) * tweenDir;
		var tweenDuration = 150;
		transTween.to( { y: tweenY1}, tweenDuration, Phaser.Easing.Quadratic.InOut)
	  .to( { y: tweenY2 }, tweenDuration, Phaser.Easing.Quadratic.InOut);
		if(entryTween){
			tweenedObj.y = (BasicGame.gameHeight + tweenedObj.height) * - tweenDir;
		}
		return transTween;		
	},
	onPlay: function(eTarget) {
		this.fgElementsTweenOut.start(); 
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
		this.foregroundElements.destroy(true);
		this.removeSound(this.woosh);
		this.removeTween(this.fgElementsTweenIn);
		this.removeTween(this.fgElementsTweenOut);
	},
};
