(function () {
    /**
     * 玩家类 150 × 294, / 3  = 50 * 98
     * 轴心 25 
     */
    function Player(){
        // 记录当前动作
        this.action = null;
        // 玩家
        this.body = null;
        // 跳 统计数
        this.jumpCount = 0;
        Player.__super.call(this);
        this.init();
    }
    // 玩家动作
    // 停留
    Player.STAY = 'PLAYER_STAY';
    // 跳跃
    Player.JUMP = 'PLAYER_JUMP';
    // 挂了
    Player.DIE = 'PLAYER_DIE';
     
    // Player
    Laya.class(Player, 'Player', laya.display.Sprite);
    
    var _proto = Player.prototype;
 
    // 是否缓存了
    Player.cached = false;
     
    _proto.init = function(){
        // 动画缓存起来
        if(!Player.cached){
            Player.cached = true;
            // 根据不同的动画 来创建动画模板
            laya.display.Animation.createFrames(['role/role_01.png','role/role_02.png'], Player.STAY);
            laya.display.Animation.createFrames(['role/role_11.png','role/role_12.png','role/role_13.png','role/role_14.png','role/role_15.png','role/role_16.png','role/role_17.png'], Player.JUMP);
            // laya.display.Animation.createFrames(['role/role_09.png','role/role_10.png','role/role_11.png','role/role_12.png'], Player.DIE);
        }
         
        if(this.body == null){
            this.body = new laya.display.Animation();
            // 动画间隔
            this.body.interval = 80;
            // 设置轴心
            this.body.pivot(25, 98);
            // this.body.scaleX = -1;
            console.log(this.body);
            this.addChild(this.body);

        }
        // 播放动作对应的动画
        this.playAction(Player.STAY);
        // 创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop)
    }
    /**
     * 播放动作对应的动画
     * action String 动作名称
     */
    _proto.playAction = function(action) {
        // 如果是重复的动作 不执行
        if(this.action == action) return;
        this.action = action;
        this.body.play(0, true, this.action);
    }
    _proto.onLoop = function() {
 
    }
    // 跳啊跳
    _proto.goJump = function() {
       this.playAction(Player.JUMP);
    }
    // 停留
    _proto.goStay = function() {
       this.playAction(Player.STAY);
    }

})();