/*
    jquery toast
*/
;(function($,window,document,undefine){
    var cache;
    var defaultOpt = {
        'text':'这是一个测试',
        'animated':true,
        'className':'toast',
        'idName'   :'toast',
        'showCallback':'',
        'hideCallback':'',
        'autoHide':2000,
        'isRemove':true,
        'wrapObj':$('body')
    }
    var flag;
    var _toast = function(opt)
    {
        defaultOpt = $.extend(defaultOpt,opt);
        this.TOASTOBJ = $('<div>',{'class':defaultOpt.className,'id':defaultOpt.idName});
        this.TOASTOBJ.html(defaultOpt.text);
        defaultOpt.wrapObj.append(this.TOASTOBJ);
    }


    _toast.prototype.setInit = function(opt)
    {
        defaultOpt = $.extend(defaultOpt,opt);
        this.show();
    }

    //设置文本
    _toast.prototype.setText = function()
    {
        this.TOASTOBJ.html(defaultOpt.text);
    }

    //显示
    _toast.prototype.show = function()
    {
        var that = this;
        if(!flag)
        {
            if(defaultOpt.isRemove)
            {
                this.setText();
                defaultOpt.wrapObj.append(this.TOASTOBJ);
            }
            flag = true;
            this.TOASTOBJ.stop().fadeIn('slow',function(){
                if(defaultOpt.showCallback instanceof Function)
                {
                    defaultOpt.showCallback();
                }
                if(defaultOpt.autoHide)
                {
                    setTimeout(function(){
                        that.hide();
                    },defaultOpt.autoHide);
                }
                return ;
            });
        }
    }
    //隐藏
    _toast.prototype.hide = function()
    {
        var that = this;
        this.TOASTOBJ.stop().fadeOut('slow',function(){
            if(defaultOpt.hideCallback instanceof Function)
            {
                defaultOpt.hideCallback();
            }
            flag = false;
            if(defaultOpt.isRemove)
            {
                that.TOASTOBJ.remove();
            }
            return ;
        });
    }

    //插件名
    $.fn.lwbToast = function(opt)
    {
        opt.wrap = this;
        if(!cache)
        {
            cache = new _toast(opt);
        }
        cache.setInit();
        return this;
    }
})(jQuery,window,document);
