/**
 * //使用方法  btns按钮列表
    imgRuning({imgArea:'.imgul'})
    参数imgArea:包裹图片的父元素
    参数time:每次运行秒数
        $('.btns').imgRuning({
            'imgArea':'.imgul',
            'time':5000
        });
 */

!(function($){

        //构造函数
        var imgs = function(opt){
            this.imgId = $(opt.imgArea);
            this.btns = $(opt.listBtn);
            this.time = opt.time;  //每多少秒走一次
            this.btnLis = this.btns.find('li');
            this.imgLis = this.imgId.find('li');
            this.cindex = 0;
            this.maxIndex = this.imgLis.length-1;
            this.flag; //计时器
        }

        //给按钮绑定事件
        imgs.prototype.bindEvent = function(){

            this.eventHandle(this.btnLis);
            this.eventHandle(this.imgLis);
        }

        //事件
        imgs.prototype.eventHandle = function(ele)
        {
            var that = this;
            ele.mouseenter(function() {
                //判断是否存在自动播放标记
                clearInterval(that.flag);
                var index = $(this).index();
                setTimeout(function(){
                    that.switchImg(index)
                },200);
            }).mouseleave(function(){
                var index = $(this).index();
                that.autoRun();
            });
        }

        //切换图片
        imgs.prototype.switchImg =  function(menuIndex)
        {
            //当前走到第几张图片
            this.cindex = menuIndex;
            var cImg  = this.imgLis.eq(menuIndex);
            var cMenu = this.btnLis.eq(menuIndex);
            cMenu.addClass('active').siblings().removeClass('active');
            cImg.stop().fadeIn('fast').siblings().hide();
        }

        //自动播放
        imgs.prototype.autoRun = function(){
            var that = this;
            this.flag = setInterval(function(){
                that.cindex++;
                if(that.cindex>that.maxIndex)
                {
                    that.cindex = 0;
                }
                that.switchImg(that.cindex);

            },that.time);
        }

        //初始化方法
        imgs.prototype.run = function(){
            this.bindEvent();
            this.autoRun();
        }

        $.fn.imgRuning = function(opt){
            var dopt = {
                'imgArea':opt.imgArea,
                'time':opt.time,
                'listBtn':$(this)
            }
            var igs = new imgs(dopt);
            igs.run();
            return this;
        }

    })(jQuery);
