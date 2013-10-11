function Dropdownlist(){
}

Dropdownlist.prototype ={
	init: function(config){
		this.config = $.extend({
			target: document.body
		},config);

		this.build();
	},
	build: function(){
		var c = this.config;
		$('<div class="Dropdownlist">').text("ddd").appendTo(c.target);

	}
};