
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.background.width = BasicGame.srx;
		this.preloadBar.width = BasicGame.srx;
		this.load.setPreloadSprite(this.preloadBar);
				
		this.load.bitmapFont('LilitaPrime8', 'assets/' + BasicGame.screen + '/LilitaPrime8/LilitaPrime8.png', 'assets/' + BasicGame.screen + '/LilitaPrime8/LilitaPrime8.fnt');
		
		this.load.audio('swoosh', ['assets/audio/primitive/swoosh.mp3', 'assets/audio/primitive/swoosh.ogg']);
		
		this.load.image('background','assets/' + BasicGame.screen + '/background.png');
		this.load.image('creditsbg','assets/creditsbg.png');
		this.load.image('logo','assets/' + BasicGame.screen + '/logo.png');
		this.load.image('playBttn','assets/' + BasicGame.screen + '/playBttn.png');
		this.load.image('next','assets/' + BasicGame.screen + '/next.png');
		this.load.image('stackAntyGravity','assets/' + BasicGame.screen + '/stackAntyGravity.png');
		this.load.image('stackSpotted','assets/' + BasicGame.screen + '/stackSpotted.png');
		this.load.image('stackHotLarva','assets/' + BasicGame.screen + '/stackHotLarva.png');  
	},

	create: function () {
		this.ready = true;
		this.state.start('MainMenu');
	},

	update: function () {

		if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};