(function () {
	
	"use strict";
	
	PrimeEight.StarMites.Preloader = function (game) {

		this.background = null;
		this.preloadBar = null;

		this.ready = false;

	};

	PrimeEight.StarMites.Preloader.prototype = {

		preload: function () {
			this.background = this.add.sprite(0, 0, 'preloaderBackground');
			this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
			this.background.width = PrimeEight.StarMites.srx;
			this.preloadBar.width = PrimeEight.StarMites.srx;
			this.load.setPreloadSprite(this.preloadBar);
				
			this.load.bitmapFont('LilitaPrime8', 'assets/' + PrimeEight.StarMites.screen + '/LilitaPrime8/LilitaPrime8.png', 'assets/' + PrimeEight.StarMites.screen + '/LilitaPrime8/LilitaPrime8.fnt');
		
			this.load.audio('swoosh', ['assets/audio/primitive/swoosh.mp3', 'assets/audio/primitive/swoosh.ogg']);
			this.load.audio('woosh', ['assets/audio/primitive/woosh.mp3', 'assets/audio/primitive/woosh.ogg']);
		
			this.load.image('background','assets/' + PrimeEight.StarMites.screen + '/background.png');
			this.load.image('creditsbg','assets/creditsbg.png');
			this.load.image('logoMain','assets/' + PrimeEight.StarMites.screen + '/logoMain.png');
			this.load.image('logo','assets/' + PrimeEight.StarMites.screen + '/logo.png');
			this.load.image('playBttn','assets/' + PrimeEight.StarMites.screen + '/playBttn.png');
			this.load.image('next','assets/' + PrimeEight.StarMites.screen + '/next.png');
			this.load.image('stackAntyGravity','assets/' + PrimeEight.StarMites.screen + '/stackAntyGravity.png');
			this.load.image('stackSpotted','assets/' + PrimeEight.StarMites.screen + '/stackSpotted.png');
			this.load.image('stackHotLarva','assets/' + PrimeEight.StarMites.screen + '/stackHotLarva.png');  
		},

		create: function () {
			this.ready = true;
			var referringPg = document.referrer;
			if (referringPg && this.justPlayed(referringPg)) {
				this.state.start('MainMenu');
			}
			else{
				this.state.start('Title');
			}
		},
		justPlayed: function(referringPg) {
			return 	referringPg === 'http://www.primitive.co/games/antygravity/' ||
							referringPg === 'http://www.primitive.co/games/spotted/' ||
							referringPg === 'http://www.primitive.co/games/hotlarva/';
		}

	};
}());