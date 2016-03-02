/**
 * x轴滚动轮播图
 *
 */
 !(function($,window,document,undefined){

     /**
      * 默认参数： prevBtn:左运动按钮
      *           nextBtn 右运动按钮
                  width:每次运动多少个像素
                  speed:轮播速度
                  time:自动轮播时间间隔
                  autorun: //是否启动自动轮播
      */
     var defaultOpt = {
             prevBtn:'.prev',
             nextBtn:'.next',
             innerWrap:'.imglist',
             width:'880',
             speed:450,
             autoRun:true,
             time:5000
     }

     var imgXDrawing = function(obj,opt)
     {
         //最外层包裹整个轮播图的父级元素
         this.obj = obj;
         //合并参数
         this.options  = $.extend(defaultOpt,opt);
         //左按钮
         this.prevBtn     = this.obj.find(this.options.prevBtn);
         //右按钮
         this.nextBtn     = this.obj.find(this.options.nextBtn);
         //包裹图片的父元素
         this.innerWrap = this.obj.find(this.options.innerWrap);
         //每个列表元素
         this.innerEles = this.innerWrap.find('li');
         //轮播图片的个数
         this.imgNumber = this.innerEles.length;
         //最大索引
         this.imgMaxIndex = this.imgNumber - 2;
         //当前left的值
         this.cLeft     = this.innerWrap.position().left;
         //默认当前第一个子元素，中间的那个图片
         this.cIndex    = 1;
         //自动记数flag变量
         this.flag = 0;

     }

     //自动将子元素找到最中间的元素将他居中
     imgXDrawing.prototype.autoCenter = function()
     {
         var centerOffsetLeft = -this.options.width;
         this.innerWrap.css({'left':centerOffsetLeft});
     }


     /**
        向左轮播
      */
     imgXDrawing.prototype.leftRun = function()
     {
         var that = this;
         this.prevBtn.click(function(){
             that._singleMove(that,'left');
         })
     }

     /**
        向右轮播
      */
     imgXDrawing.prototype.rightRun = function()
     {
         var that = this;
         this.nextBtn.click(function(){
             that._singleMove(that,'right');
         })
     }



     //单方向移动方法
     imgXDrawing.prototype._singleMove = function(that,direction)
     {
         var movePx = '';
         if(direction == 'left'){
             movePx = '+=' + that.options.width;
             this.cIndex -= 1;
         }else if(direction == 'right'){
             movePx = '-=' + that.options.width;
             this.cIndex += 1;
         }
         this._runAnimate(that,movePx);
     }


    //向右边移动元素
    imgXDrawing.prototype._seamlessMoveEle = function()
    {
        //右无缝
        if(this.cIndex > this.imgMaxIndex)
        {
            var movePx = this.options.width * 1;
            this.innerWrap.css('left',-movePx);
            this.cIndex = 1;
        }
        //左无缝
        if(this.cIndex == 0)
        {
            var movePx = this.options.width * this.imgMaxIndex;
            this.innerWrap.css('left',-movePx);
            this.cIndex = this.imgMaxIndex;
        }
    }

     //动画效果
     imgXDrawing.prototype._runAnimate = function(that,movePx)
     {
         if(!that.innerWrap.is(':animated'))
         {
            that.innerWrap.stop().animate({'left':movePx},that.options.speed,function(){
                that._seamlessMoveEle();
            });
         }
     }

     //清除自动轮播
     imgXDrawing.prototype.clearAutoRun = function()
     {
         var that = this;
         that.obj.mouseenter(function(){
             clearInterval(that.flag);
         }).mouseleave(function() {
             that.autoRun();
         });
     }

     /*
        自动轮播
    */
    imgXDrawing.prototype.autoRun = function()
    {
        //先清除计数再重新设置计数防止叠加
        clearInterval(this.flag);
        var that = this;
        this.flag = setInterval(function(){
            that._singleMove(that,'right');
        },this.options.time);
    }




     //绑定事件
     imgXDrawing.prototype.addEvent = function()
     {
         //自动将第一张轮播图放到最中间
         this.autoCenter();
         //注册左按钮
         this.leftRun();
         //注册右按钮
         this.rightRun();
         //启动自动轮播
         if(this.options.autoRun)
         {
            this.autoRun();
            //注册当鼠标移动上，清除叠加
            this.clearAutoRun();
         }
     }


     //插件初始化方法
     imgXDrawing.prototype.run = function()
     {
         this.addEvent();
     }





    $.fn.imgXDrawing = function(opt)
    {
        var XDraw = new imgXDrawing(this,opt);
        XDraw.run();
        return this;
    }

 })(jQuery,window,document);
