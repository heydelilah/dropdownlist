// 下拉框模块
function Dropdownlist(){
}
Dropdownlist.prototype ={
	init: function(config){
		this.config = $.extend({
			'target': document.body,
			'default':'请选择',
			'options':'',
			'key':'id',
			'name':'name',
			'width':200,
			'height': 20,
			'label':''
		},config);
		this.$firstToggle = true;

		this.build();
	},
	build: function(){
		var c = this.config;
		var doms = this.doms = {};

		if(c.label){
			$('<div class="label"/>').text(c.label).appendTo(c.target);
		}

		var tmp = $('<div class="Dropdownlist"><div class="header"><div class="arrow"></div></div></div>').appendTo(c.target);
		doms.result = $('<div class="result"><div>').text(c.default).prependTo(tmp.find(".header"));
		doms.wrap = tmp;
		tmp.on('click',".header",this,this.eventToggleList);
	},
	// 下拉菜单显示-隐藏响应事件
	eventToggleList: function(ev){
		var me = ev.data;
		var c = me.config;
		var doms = me.doms;
		if(me.$firstToggle){
			me.buildOptions();
			me.$firstToggle = false;
		}else{
			doms.list.toggle();
		}
	},
	setData: function(data){
	},
	getData: function(){
	},
	reset: function(){
	},
	// 构建选项
	buildOptions: function(){
		var c = this.config;
		var doms = this.doms;
		var list = doms.list = $('<div class="list">').appendTo(doms.wrap);
		for(var i in c.options){
			var elm = c.options[i];
			var a = $('<a class="option"/>').attr('key',elm.id).text(elm.name).appendTo(list);
			a.on('click',{self:this,elm:a},this.eventOptionSelect);
		}
	},
	// 选择选项响应事件
	eventOptionSelect: function(ev){
		var doms = ev.data.self.doms;
		var elm = ev.data.elm;

		doms.result.text(elm.text());
		doms.list.toggle();
		elm.addClass('act').siblings().removeClass('act');
	}
};