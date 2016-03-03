/*
    jquery模态框

*/
!(function($,window,document,undefine){


    /*
        wrapModal:模态框元素
    */
    var defaultOptions = {
        modalInnerBox:'.modal-inner-box',
        closeModalBtn:'#modal-close-btn',
        wrapModalBox :'wrap-modal',
        modalBg:'modal-bg'
    }


    var lwbModal = function(obj,options)
    {
        this.innerObj = obj; //要进行包裹的元素
        //合并参数
        this.options = $.extend(defaultOptions,options);
        //外部模态框父元素
        this.wrapModal = this._createModalView();
        //内部需要模态的内容元素
        this.modalInnerBox = this.innerObj.addClass('modal-inner-box').clone(true);


        //
    }

    //创建模态框背景对象
    lwbModal.prototype._createModalView = function()
    {
        //当前整个页面的高
        var bodyHeight = $('html').height();
        return $('<div>',{id:this.options.wrapModalBox,style:"height:"+bodyHeight+'px;"'})
                .html($('<div>',{"class":this.options.modalBg,style:"height:"+bodyHeight+'px;"'}));
    }



    //将要包裹的元素追加到内部 并添加上居中class
    lwbModal.prototype.initModalView = function()
    {
        this.wrapModal.append(this.modalInnerBox);
        $('body').append(this.wrapModal);
    }

    //添加关闭按钮
    lwbModal.prototype.closeHandle = function()
    {
        var that = this;
        this.modalInnerBox.find(this.options.closeModalBtn).click(function(){
            $('#'+that.options.wrapModalBox).remove();
        })
    }

    //添加关闭按钮
    lwbModal.prototype.addEvent = function()
    {
        this.closeHandle();
    }

    lwbModal.prototype.run = function()
    {
        this.addEvent();
        this.initModalView();
    }


    //插件名
    $.fn.lwbModal = function(opt)
    {
        var modal = new lwbModal(this,opt);
        modal.run();
        return this;
    }


})(jQuery,window,document);
