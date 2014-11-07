//namespace
var PrimeEight = {
};

(function () {
	
	"use strict";
	
	PrimeEight.StarMites = {
	};


	PrimeEight.StarMites.Boot = function (game) {
		return this;
	};

	
	PrimeEight.StarMites.Boot.prototype = {
	
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
        
	        this.scale.minWidth = PrimeEight.StarMites.gameWidth/2;
	        this.scale.minHeight = PrimeEight.StarMites.gameHeight/2;
	        this.scale.maxWidth = PrimeEight.StarMites.gameWidth;
	        this.scale.maxHeight = PrimeEight.StarMites.gameHeight;
	        this.scale.pageAlignHorizontally = true;
	        this.scale.pageAlignVertically = true;
	        this.scale.setScreenSize(true);
        
					if(this.scale.scaleMode===Phaser.ScaleManager.NO_BORDER){
							PrimeEight.StarMites.viewX = (this.scale.width/2 - window.innerWidth/2)*this.scale.scaleFactor.x;
							PrimeEight.StarMites.viewY = (this.scale.height/2 - window.innerHeight/2 - 1)*this.scale.scaleFactor.y;
							PrimeEight.StarMites.viewWidth = PrimeEight.StarMites.gameWidth-PrimeEight.StarMites.viewX;
							PrimeEight.StarMites.viewHeight = PrimeEight.StarMites.gameHeight-PrimeEight.StarMites.viewY;
					}
					else {
							PrimeEight.StarMites.viewX = 0;
							PrimeEight.StarMites.viewY = 0;
							PrimeEight.StarMites.viewWidth = PrimeEight.StarMites.gameWidth;
							PrimeEight.StarMites.viewHeight = PrimeEight.StarMites.gameHeight;
					}
	
				this.styleGameDiv();
	    },

			gameResized: function (width, height) {
				this.styleGameDiv();
	    },

	    enterIncorrectOrientation: function () {

	        PrimeEight.StarMites.orientated = false;

	        document.getElementById('orientation').style.display = 'block';

	    },

	    leaveIncorrectOrientation: function () {

	        PrimeEight.StarMites.orientated = true;

	        document.getElementById('orientation').style.display = 'none';
					this.scaleStage();
	    }, 
			styleGameDiv: function () {
				document.getElementById("game").style.width = window.innerWidth+"px";
				document.getElementById("game").style.height = window.innerHeight-1+"px";//The css for body includes 1px top margin, I believe this is the cause for this -1
				document.getElementById("game").style.overflow = "hidden";
			}
	};
}());