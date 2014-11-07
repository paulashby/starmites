(function () {
	
	"use strict";
	
	PrimeEight.StarMites.Title = function (game) {
		return this;
	};

	PrimeEight.StarMites.Title.prototype = {

		create: function () {
			this.woosh = this.game.add.audio('woosh');
		
			this.background = this.game.add.sprite(0,0, 'background');
			this.logoMain = this.game.add.sprite(PrimeEight.StarMites.gameWidth * 0.49, PrimeEight.StarMites.viewHeight * 0.43, 'logoMain');
			this.logoMain.anchor.setTo(0.5, 0.5);
		
			var playBttnBG = this.game.add.sprite(PrimeEight.StarMites.gameWidth * 0.77, PrimeEight.StarMites.viewY + (PrimeEight.StarMites.viewHeight * 0.66), 'playBttn'),
			playLabel;
			playBttnBG.inputEnabled = true; 
			playBttnBG.events.onInputDown.add(this.onPlay, this);
		
			playLabel = this.game.add.bitmapText(this.textX, 0, 'LilitaPrime8', 'START', PrimeEight.StarMites.fntSize);
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
			var transTween = this.add.tween(tweenedObj),
			tweenDir = tweenUp ? -1 : 1,
			y1dir = entryTween ? tweenDir : tweenDir * -1,
			tweenY1 = tweenedObj.y + (PrimeEight.StarMites.gameHeight * 0.25 * y1dir),
			tweenY2 = entryTween ? tweenedObj.y : (PrimeEight.StarMites.gameHeight + tweenedObj.height) * tweenDir,
			tweenDuration = 150;
			transTween.to( { y: tweenY1}, tweenDuration, Phaser.Easing.Quadratic.InOut)
		  .to( { y: tweenY2 }, tweenDuration, Phaser.Easing.Quadratic.InOut);
			if(entryTween){
				tweenedObj.y = (PrimeEight.StarMites.gameHeight + tweenedObj.height) * - tweenDir;
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
		}
	};
}());