(function () {
    /**
     * 玩家类
     */
    function Player(){
        //记录当前动作
        this.action = null;
        //玩家
        this.body = null;
 
        //跳 统计数
        this.jumpCount = 0;
        //跳 最大次数 如果想三连跳 改成 3 即可
        this.jumpCountMax = 2;
        Player.__super.call(this);
        this.init();
    }
    //玩家动作
 
    //跑
    Player.RUN = "player_run";
    //飞
    Player.FLY = "player_fly";
    //暂时没有用到的动作
    Player.HERT = "player_hert";
    //跳
    Player.JUMP = "player_jump";
 
    //状态
    Player.DIE = "player_die";
     
    //Player
    Laya.class(Player,"Player", laya.display.Sprite);
     
    var _proto = Player.prototype;
 
    //是否缓存了
    Player.cached = false;
     
    _proto.init = function(){
        //动画缓存起来
        if(!Player.cached){
            Player.cached = true;
            //根据不同的动画 来创建动画模板
            laya.display.Animation.createFrames(['player/chara_01.png','player/chara_02.png','player/chara_03.png','player/chara_04.png'], Player.RUN);
            laya.display.Animation.createFrames(['player/chara_05.png','player/chara_06.png','player/chara_07.png','player/chara_08.png'], Player.FLY);
            //Animation.createFrames(['player/chara_09.png','player/chara_10.png','player/chara_11.png','player/chara_12.png'], Player.HERT);
            laya.display.Animation.createFrames(['player/chara_13.png','player/chara_14.png','player/chara_15.png','player/chara_16.png'], Player.JUMP);
        }
         
        if(this.body == null){
            this.body = new laya.display.Animation();
            this.body.x = -48;
            this.body.y = -90;
            this.body.interval = 100;
            this.addChild(this.body);
             
        }
        //播放动作对应的动画
        this.playAction(Player.RUN);
        //创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop)
    }
    /**
     * 播放动作对应的动画
     * action String 动作名称
     */
    _proto.playAction = function(action){
        //如果是重复的动作 不执行
        if(this.action == action)return;
        this.action = action;
        this.body.play(0, true, this.action);
    }
    _proto.onLoop = function(){
 
    }
    //开始跳
    _proto.gotoJump = function(){
       this.playAction(Player.JUMP);
    }
    //开始跑
    _proto.gotoRun = function(){
       this.playAction(Player.RUN);
    }
    //开始飞
    _proto.gotoFly = function(){
        this.playAction(Player.FLY);
    };
    /**
     * 触发跳（二连跳）
     */
    _proto.jump = function(){
        this.gotoJump();
    }
     //跳结束重置
    _proto.jumpReset = function(){
        
    }
})();