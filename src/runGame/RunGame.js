(function () {
    function RunGame(){
        RunGame.__super.call(this);
        this.init();
    }
    Laya.class(RunGame,"RunGame", laya.display.Sprite);
    //定义RunGame的prototype
    var _proto = RunGame.prototype;
    
    //初始化
    _proto.init = function(){
        console.log('RunGame Init');
        //初始化背景
        var bg = new Background();
        this.addChild(bg);
    }
})();