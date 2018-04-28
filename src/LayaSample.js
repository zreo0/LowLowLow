// 全局变量
var GAME_WIDTH  = 320;
var GAME_HEIGHT = 568;
//laya初始化
var layaCanvas = Laya.init(GAME_WIDTH, GAME_HEIGHT, Laya.WebGL);
layaCanvas.style.position  = 'relative';
//FPS
Laya.Stat.show(0,0);
// //设置适配模式
// Laya.stage.scaleMode = 'exactfit';
// //设置居中对齐
Laya.stage.alignH = 'center';
// ======加载资源======
var asset = [];
// 单个资源
asset.push({
    url : [
        "res/background.png",
        "res/floor.png"
    ],
    type : Laya.Loader.IMAGE
});
//加载图集资源
asset.push({
    url:"res/role.json",
    type : Laya.Loader.ATLAS
});
asset.push({
    url:"res/floors.json",
    type : Laya.Loader.ATLAS
});
//加载图集资源
Laya.loader.load(asset, laya.utils.Handler.create(this, onLoaded), laya.utils.Handler.create(this, onLoading, null, false));
// ======加载资源======

// 加载进度
function onLoading(progress) {
    console.log('onLoading' + progress);
}

// 加载完毕
function onLoaded () {
    console.log("onLoaded");

    // 实例化RunGame
    var runGame = new RunGame();
    // 添加到舞台
    Laya.stage.addChild(runGame);
}
