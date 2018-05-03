(function () {
    function RunGame(){
        this.bg = null;
        this.mapFloor = null;
        this.player = null;
        RunGame.__super.call(this);
        this.init();
    }
    Laya.class(RunGame, 'RunGame', laya.display.Sprite);
    // 定义RunGame的prototype
    var _proto = RunGame.prototype;
    
    // 初始化
    _proto.init = function(){
        console.log('RunGame Init');
        // 初始化背景
        this.bg = new Background();
        this.addChild(this.bg);
        // 添加地板集合
        this.mapFloor = new MapFloor();
        this.addChild(this.mapFloor);
        // 玩家
        this.player = new Player();
        this.player.x = GAME_WIDTH / 2;
        this.player.y = GAME_HEIGHT - 50;
        this.addChild(this.player);
        // 监听事件
		Laya.stage.on(laya.events.Event.MOUSE_DOWN, this, this.onMouseDown);

    }
    // 点击事件
    _proto.onMouseDown = function(e) {
        // 中间线
        let middleX = GAME_WIDTH / 2;
        // 当前点击
        let currentX = e.target.mouseX;
        // 点击区域
        let touchPart = currentX <= middleX ? 'left' : 'right';
        // ---
        console.log(touchPart);

        if (touchPart == 'left') {
            this.player.goStay();
        } else {
            this.player.goJump();
        }
		// this.player.run();
	}
})();