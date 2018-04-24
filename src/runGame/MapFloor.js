(function () {
    /**
     * 地板管理类
     */
    function MapFloor(){
        MapFloor.__super.call(this);
        // 初始化出生位置
        this.addFloor(1);
        // 要移除的地板
        this.dieFloorList = [];
        this.init();
    }
    Laya.class(MapFloor, "MapFloor", laya.display.Sprite);
    // 定义MapFloor的prototype
    var _proto = MapFloor.prototype;
    
    // 初始化
    _proto.init = function(){
        console.log('MapFloor Init');
        // 添加地板
        this.addFloor();
        // 创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    _proto.onLoop = function(){
        // 监听有没有地板要移除
        while(this.dieFloorList.lenght > 0){
            var floor = this.dieFloorList.shift();
            floor.removeSelf();
        }
    }
    /**
     * 增加地板
     */
    _proto.addFloor = function(type){
        var floor = new Floor();
        floor.init(type);
        floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
    }
    /**
     * 获取地板
     */
    _proto.getFloor = function(floor){
         this.addFloor(2);
    }
    /**
     * 删除地板
     */
    _proto.delFloor = function(floor){
         this.dieFloorList.push(floor);
    }
})();