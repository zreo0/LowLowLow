(function () {
    function RunGame(){
        this.bg = null;
        this.mapFloor = null;
        this.player = null;
        RunGame.__super.call(this);
        this.init();
    }
    Laya.class(RunGame,"RunGame", laya.display.Sprite);
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
        this.player.x = 32 * 8;
        this.player.y = 32 * 4;
        this.addChild(this.player);

    }
})();