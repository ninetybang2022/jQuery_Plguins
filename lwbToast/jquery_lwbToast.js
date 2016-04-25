/*
    jquery toast

*/
;(function($,window,document,undefine){
    var cache;
    var defaultOpt = {
        'wrap':'body',
        'text':'这是一个测试',
        'animated':true,
        'className':'toast',
        'idName'   :'toast',
        'showCallback':'',
        'hideCallback':'',
        'autoHide':2000,
    }
    var flag;
    var _toast = function(opt)
    {
        defaultOpt = $.extend(defaultOpt,opt);
        this.TOASTOBJ = $('<div>',{'class':defaultOpt.className,'id':defaultOpt.idName});
        this.TOASTOBJ.html(defaultOpt.text);
        $(defaultOpt.wrap).append(this.TOASTOBJ);
    }
    //显示
    _toast.prototype.show = function()
    {
        var that = this;
        if(!flag)
        {
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
        this.TOASTOBJ.stop().fadeOut('slow',function(){
            if(defaultOpt.hideCallback instanceof Function)
            {
                defaultOpt.hideCallback();
            }
            flag = false;
            return ;
        });
    }

    //插件名
    $.fn.lwbToast = function(opt)
    {
        this.click(function(){
            if(!cache)
            {
                cache = new _toast(opt);
            }
            cache.show();
        })
        return this;
    }


})(jQuery,window,document);
