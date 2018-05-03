(function () {
    /**
     * 地板管理类
     */
    function MapFloor () {
        MapFloor.__super.call(this);
        // 要移除的地板
        this.dieFloorList = [];
        // map config
        this.mapConfig = {
            initFloorCount: 8,                  // 初始地板数量
            wrongProb: [0.5, 0.2, 0.2, 0.1]     // 不同障碍的概率
        };
        // 无障碍数组
        this.commonFloors = [];
        // 障碍数组
        this.wrongFloors  = [];
        this.init();
        console.log('正常', this.createRandomDirection(this.mapConfig.initFloorCount));
        console.log('障碍', this.createRandomInt_1(this.mapConfig.wrongProb, this.mapConfig.initFloorCount));
    }
    Laya.class(MapFloor, 'MapFloor', laya.display.Sprite);
    // 定义MapFloor的prototype
    var _proto = MapFloor.prototype;

    // 初始化
    _proto.init = function () {
        console.log('MapFloor Init');
        // 添加地板
        this.addFloor();
        // 创建一个帧循环处理函数
        Laya.timer.frameLoop(1, this, this.onLoop);
    }
    _proto.onLoop = function () {
        // 监听有没有地板要移除
        while(this.dieFloorList.lenght > 0){
            var floor = this.dieFloorList.shift();
            floor.removeSelf();
        }
    }

    /**
     * 获取随机数
     */
    _proto.getRandom = function (a, b) {
        return Math.random() * (b - a) + a
    }
    
    _proto.getRandomInt = function (min, max) {
        return Math.floor(this.getRandom(min, max));
    }

    /**
     * 生成普通地板的数组
     */
    _proto.createRandomDirection = function (len) {
        var result = [];
        if (1 === len) {
            return this.getRandomInt(0, 2);
        }
        for (var i = 0; i < len; i++) {
            result.push(this.getRandomInt(0, 2));
        }
        return result;
    }

    /**
     * 工具
     */
    _proto.shuffle = function (t) {
        for (var e = t.length; e > 0; e--) {
            var i = this.getRandomInt(0, e);
            [t[e - 1],t[i]] = [t[i], t[e - 1]]
        }
        return t
    }
    _proto.getGCD = function (t, e) {
        var i, s, r;
        for (i = t > e ? t : e,
        s = t < e ? t : e; i % s; )
            r = i % s,
            i = s,
            s = r;
        return s
    }
    _proto.getLCM = function (t) {
        for (var e = 1; e < t.length; e++) {
            var i = t[0]
              , s = t[e]
              , r = this.getGCD(i, s);
            t[0] = i * s / r
        }
        return t[0]
    }
    _proto.getFracDeno = function (t, e) {
        for (var i = 1, s = 1; Math.abs(i / s - t) > e; )
            i / s > t ? s++ : i / s < t && i++;
        return s
    }
    _proto.createRandomInt_1 = function (t, e) {
        for (var i = [], s = 0; s < t.length; s++)
            i[s] = this.getFracDeno(t[s], .001);
        for (var r = [], a = this.getLCM(i), n = 0, o = 0; o < i.length; o++)
            for (var h = a * i[o] + n; n < h; )
                r[n] = o,
                n++;
        if (1 === e) {
            var c = this.getRandomInt(0, r.length);
            return r[c]
        }
        for (var l = [], d = 0; d < e; d++) {
            var g = this.getRandomInt(0, r.length);
            l.push(r[g])
        }
        return l
    }
    _proto.createRandomInt_2 = function (t, e) {
        if (1 === e)
            return this.shuffle(t),
            t[0];
        for (var i = [], s = 0; s < e; s++)
            this.shuffle(t),
            i.push(t[0]);
        return i
    }

    /**
     * 增加地板
     */
    _proto.addFloor = function () {
        var floor = new Floor();
        floor.init(-1, 0);
        floor.once(Floor.OUT_COMPLETE, this, this.getFloor);
        floor.once(Floor.OUT_DIE, this, this.delFloor);
        this.addChild(floor);
    }
    /**
     * 获取地板
     */
    _proto.getFloor = function (floor) {
         this.addFloor(2);
    }
    /**
     * 删除地板
     */
    _proto.delFloor = function (floor) {
         this.dieFloorList.push(floor);
    }
})();