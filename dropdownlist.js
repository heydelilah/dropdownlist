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
			'label':'标签',
			'search':false
		},config);
		this.$firstToggle = true;

		this.build();
	},
	build: function(){
		var c = this.config;
		var doms = this.doms = {};

		if(c.label){
			$('<label class="DropdownlistTitle"/>').text(c.label).appendTo(c.target);
		}

		var tmp = $('<div class="Dropdownlist"><div class="DropdownlistHeader"><div class="arrow"></div></div></div>').appendTo(c.target);
		doms.result = $('<div class="result"><div>').text(c.default).prependTo(tmp.find(".DropdownlistHeader"));
		doms.wrap = tmp;
		tmp.on('click',".DropdownlistHeader",this,this.eventToggleList);
	},
	// 下拉菜单显示-隐藏响应事件
	eventToggleList: function(ev){
		var me = ev.data;
		var c = me.config;
		var doms = me.doms;
		if(me.$firstToggle){
			me.buildOptions(c.options);
			me.$firstToggle = false;
		}

		doms.list.toggle();
	},
	setData: function(data){
		this.buildOptions(data);
	},
	getData: function(){
		return this.doms.result.text();
	},
	reset: function(){
	},
	// 构建选项
	buildOptions: function(data){
		var doms = this.doms;
		var c = this.config;
		var list = doms.list = $('<div class="DropdownlistList">').appendTo(doms.wrap);
		if(c.search){
			// @todo 样式还需微调
			var search = $('<div class="search option"><i></i></div>').appendTo(list);
			$('<input type="text"/>').width(c.width-12).prependTo(search);
		}
		if(typeof data === 'object'){
			for(var i in data){
				var elm = data[i];
				var a = $('<a class="option"/>').attr('key',elm.id).text(elm.name).appendTo(list);
				a.on('click',{self:this,elm:a},this.eventOptionSelect);
			}
		}else{
			$('<a class="option"/>').text('--- 无数据 ---').appendTo(list);
		}
		this.$firstToggle = false;
	},
	// 选择选项响应事件
	eventOptionSelect: function(ev){
		var doms = ev.data.self.doms;
		var elm = ev.data.elm;

		doms.result.text(elm.text());
		doms.result.attr('key',elm.attr('key'));
		doms.list.toggle();
		elm.addClass('act').siblings().removeClass('act');
	}
};