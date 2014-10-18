BasicGame = {
		
};


BasicGame.Boot = function (game) {
};


BasicGame.Boot.prototype = {
	
		preload: function () {
			this.load.image('preloaderBackground', 'assets/preloader_background.png');
			this.load.image('preloaderBar', 'assets/preloader_bar.png');
		},

		create: function () {
			
			this.input.maxPointers = 1;
			this.stage.disableVisibilityChange = true;
			this.scaleStage();
			this.state.start('Preloader');

    },
    
		scaleStage:function(){
			if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.NO_BORDER;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }
        
        this.scale.minWidth = BasicGame.gameWidth/2;
        this.scale.minHeight = BasicGame.gameHeight/2;
        this.scale.maxWidth = BasicGame.gameWidth;
        this.scale.maxHeight = BasicGame.gameHeight;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize(true);
        
				if(this.scale.scaleMode==Phaser.ScaleManager.NO_BORDER){
						BasicGame.viewX = (this.scale.width/2 - window.innerWidth/2)*this.scale.scaleFactor.x;
						BasicGame.viewY = (this.scale.height/2 - window.innerHeight/2 - 1)*this.scale.scaleFactor.y;
						BasicGame.viewWidth = BasicGame.gameWidth-BasicGame.viewX;
						BasicGame.viewHeight = BasicGame.gameHeight-BasicGame.viewY;
				}
				else {
						BasicGame.viewX = 0;
						BasicGame.viewY = 0;
						BasicGame.viewWidth = BasicGame.gameWidth;
						BasicGame.viewHeight = BasicGame.gameHeight;
				}
	
			this.styleGameDiv();
    },

		gameResized: function (width, height) {
			this.styleGameDiv();
    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';
				this.scaleStage();
    }, 
		styleGameDiv: function () {
			document.getElementById("game").style.width = window.innerWidth+"px";
			document.getElementById("game").style.height = window.innerHeight-1+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
			document.getElementById("game").style.overflow = "hidden";
		},
};