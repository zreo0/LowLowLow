(function () {
    /**
     * 地板类
     */
    function Floor(){
        // 背景贴图纹理
        this.bgTexture = null;
        // 背景
        this.bg = null;
        // 是否已经生成过新地板了
        this.newFloor = false;
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
    _proto.init = function(type){
        console.log('Floor Init');
        // 如果不开启autoSize 父容器的宽度和高度无法获取
        this.autoSize = true;
        // 初始化的时候将坐标放到屏幕下边
        // this.y = 568;

        // 随机一个范围值 最小的也有3个块
        var floorWidth = 0;
        // 初始化的时候将坐标放到屏幕下边
        if (type == 1) {
            // 刚开始的地板，放在上面
            this.y = 100;
            // 从左侧初始化
            this.x = 0; 
            // 出生位置地板不生成新地板
            this.newFloor = true;
            // 出生位置地板宽度
            floorWidth = 135;
        } else {
            // 其他地板 正常从下方生成
            this.y = GAME_HEIGHT;
            // y坐标取一个随机值 为什么是32 因为我们的整个素材是 32 * 20 拼起来的
            // this.y = 32 * 6 + 32 * parseInt(8 * Math.random());
            // x取一个随机值 现在是320以内的
            this.x = parseInt(Math.random () * GAME_WIDTH);
            // 随机生成地板宽度
            floorWidth = 32 * (3 + parseInt(19 * Math.random()));
        }

        if(this.bg == null){
            // 贴图纹理
            this.bgTexture = Laya.loader.getRes('res/floor.png');
            this.bg = new laya.display.Sprite();
            this.bg.graphics.clear();
            // 将当前的坐标向上移动32 方便后面处理人物的位置
            this.bg.y = -32;
            this.addChild(this.bg);
        }
        

        // this.bg.graphics.drawTexture(this.bgTexture, 0, 0, 960, 84); 96
        // 这里用到了 Texture.createFromTexture 就是根据宽度和高度来截取一个图片并且返回一个Texture对象
        this.bg.graphics.drawTexture(laya.resource.Texture.createFromTexture(this.bgTexture, 0, 0, floorWidth, 45), 0, 0, floorWidth, 45);
        //创建一个帧循环处理函数
        // Laya.timer.frameLoop(1, this, this.onLoop);
    }
    //在地板上面添加物品
    _proto.addItem = function(){
        
    }
    //获取当前地板上面的所有物品
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
        } else if (!this.newFloor && this.y < GAME_HEIGHT - 84 * 2) {
            console.log('create new floor');
            this.newFloor = true;
            this.event(Floor.OUT_COMPLETE, this);
        }
    }
})();