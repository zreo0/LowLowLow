(function () {
    /**
     * 背景类
     */
    function Background() {
        // 图片宽度
        this.BG_WIDTH  = 320;
        // 图片高度
        this.BG_HEIGHT = 568;
        // 背景1
        this.bg1 = null;
        // 背景2
        this.bg2 = null;
        // 速度
        this.bgSpeed = 3;
        Background.__super.call(this);
        this.init();
    }
    // Background 是一个显示对象 继承此 Sprite
    Laya.class(Background, "Background", laya.display.Sprite);
    var _proto = Background.prototype;
    _proto.init = function() {
        var texture1 = Laya.loader.getRes('res/background.png');
        // 创建背景1
        this.bg1 = new laya.display.Sprite();
        // 绘制背景图1
        this.bg1.graphics.drawTexture(texture1, 0, 0, 320, 568);
        // 把背景1添加到当前容器对象里。
        this.addChild(this.bg1);
        // 创建背景2
        this.bg2 = new laya.display.Sprite();
        // 绘制背景图2
        this.bg2.graphics.drawTexture(texture1, 0, 0, 320, 568);
        // 设置背景2 的坐标。
        this.addChild(this.bg2);
        // 把第二个背景放到第一个背景屁股后面紧跟着
        this.bg2.pos(0, this.BG_HEIGHT);
        // 创建一个帧循环处理函数，用于背景位置的更新，实现背景滚动效果。
        // Laya.timer.frameLoop(1, this, this.onLoop);

    }

    _proto.onLoop = function() {
        // 移动
        this.y -= this.bgSpeed;
        this.moveY = Math.abs(this.y);
        // 当背景1向上移动出游戏的显示区域 568，则将背景1的y轴坐标,向下移动 568*2.
        if (this.moveY - this.bg1.y >= this.BG_HEIGHT) {
            this.bg1.y += this.BG_HEIGHT * 2;
        }
        // 当背景2向左移动出游戏的显示区域 568，则将背景2的y轴坐标,向下移动 568*2.
        if (this.moveY - this.bg2.y >= this.BG_HEIGHT) {
            this.bg2.y += this.BG_HEIGHT * 2;
        }
    }


})();