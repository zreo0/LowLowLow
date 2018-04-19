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
// Laya.stage.alignH = 'center';
// 加载图片
Laya.loader.load(
    ['res/background.png', 'res/floor.png'],
    laya.utils.Handler.create(this, onLoaded), 
    laya.utils.Handler.create(this, onLoading, null, false)
);

// 加载进度
function onLoading(progress) {
    console.log('onLoading' + progress);
}

// 加载完毕
function onLoaded () {
    console.log('onLoaded');
    // // 从资源来表中获取加载好的background图片纹理
    // var texture = Laya.loader.getRes('res/background.png');
    // // 创建一个bg显示对象
    // var bg = new laya.display.Sprite();
    // // 将上面的texture纹理绘制到bg图像里面
    // bg.graphics.drawTexture(texture, 0, 0, 320, 568);
    // // 将bg添加到舞台
    // Laya.stage.addChild(bg);
    console.log("onLoaded");
    // 实例化RunGame
    var runGame = new RunGame();
    // 添加到舞台
    Laya.stage.addChild(runGame);
}
