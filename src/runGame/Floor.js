(function () {
    /**
     * 地板类   147 * 124 / 3 -> 49 * 42
     * /2 73 * 62
     */
    function Floor(){
        // 背景贴图纹理
        this.bgTexture = null;
        // 背景
        this.bg = null;
        Floor.__super.call(this);
    }
    // 事件名称
    // 超过屏幕一定值出发新的floor事件
    Floor.OUT_COMPLETE = 'floor_out_complete';
    // 整个地板都不在屏幕里面事件
    Floor.OUT_DIE = 'floor_out_die';

    Laya.class(Floor, "Floor", laya.display.Sprite);
    //定义Floor的prototype
    var _proto = Floor.prototype;
    
    //初始化
    _proto.init = function(direction, type) {
        console.log('Floor Init');
        // 如果不开启autoSize 父容器的宽度和高度无法获取
        this.autoSize = true;
        // 设置轴心
        // this.pivot(36.5, 31);
        this.pivot(24.5, 21);
        // 宽度
        var floorWidth  = 49;
        var floorHeight = 42;
        // direction为方向，type为类型
        if (direction == -1) {
            // 初始的地板 在脚下
            this.x = GAME_WIDTH / 2;
            this.y = GAME_HEIGHT - 55;
        } else {
            // 非初始化地板
            
        }

        if(this.bg == null){
            // 贴图纹理
            this.bgTexture = Laya.loader.getRes('floors/floors_01.png');
            this.bg = new laya.display.Sprite();
            this.bg.graphics.clear();
            // 将当前的坐标向上移动32 方便后面处理人物的位置
            // this.bg.y = -32;
            this.addChild(this.bg);
        }
        this.bg.graphics.drawTexture(this.bgTexture, 0, 0, floorWidth, floorHeight);
        // 这里用到了 Texture.createFromTexture 就是根据宽度和高度来截取一个图片并且返回一个Texture对象
        // this.bg.graphics.drawTexture(laya.resource.Texture.createFromTexture(this.bgTexture, 0, 0, floorWidth, 41), 0, 0, floorWidth, 41);
        // 创建一个帧循环处理函数
        // Laya.timer.frameLoop(1, this, this.onLoop);
    }
    // 在地板上面添加物品
    _proto.addItem = function(){
        
    }
    // 获取当前地板上面的所有物品
    _proto.getItems = function(){
        return ;
    }
    // 循环
    _proto.onLoop = function(){
        // 移动地板
        this.y -= 3;
        
        if ((this.y + this.height) < 0){
            // 判断整个floor是否不在屏幕里面了 如果不在了 移除当前floor
            Laya.timer.clear(this, this.onLoop);
            this.visible = false;
            // this.removeSelf();
            this.event(Floor.OUT_DIE, this);
            console.log('floor destory');
        } else if (this.y < GAME_HEIGHT - 84 * 2) {
            console.log('create new floor');
            this.event(Floor.OUT_COMPLETE, this);
        }
    }
})();