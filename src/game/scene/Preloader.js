
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
		this.load.bitmapFont('fontName', 'assets/' + BasicGame.screen + '/fontName/fontName.png', 'assets/' + BasicGame.screen + '/fontName/fontName.fnt');
		this.load.audio('bgLoop', ['assets/audio/primitive/bgLoop.mp3', 'assets/audio/primitive/bgLoop.ogg']);
		
		this.load.image('imageName','assets/' + BasicGame.screen + '/imageName.png');
		this.load.spritesheet('imageName', 'assets/' + BasicGame.screen + '/imageName.png', BasicGame.imageWidth, BasicGame.imageHeight, 3);  
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