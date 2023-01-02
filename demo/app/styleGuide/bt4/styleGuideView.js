
define(['marionette',
	'./styleGuideTemplate.hbs', 'rup.button','rup.combo'], function(Marionette, StyleGuideTemplate){

	var StyleGuideView = Marionette.View.extend({
		template: StyleGuideTemplate,
		bt4BaseUrl: 'https://getbootstrap.com/docs/4.6/components/',
		btComponents:[
			'alerts',
			'badge',
			'breadcrumb',
			'buttons',
			'button-group',
			'card',
			'carousel',
			'collapse',
			'dropdowns',
			'forms',
			'input-group',
			'jumbotron',
			'list-group',
			'modal',
			'navs',
			'navbar',
			'pagination',
			'popovers',
			'progress',
			'scrollspy',
			'tooltips'

		],
		ui:{
			bt4examples: '#bt4examples'
		},
		onDomRefresh: fncOnDomRefresh
	});

	function fncOnDomRefresh(){
		var $div, $self = this;

		for(var i=0; i<this.btComponents.length;i++){
			$div = $('<div>').addClass('row') ;
			$div.load(this.bt4BaseUrl + this.btComponents[i] + ' .bd-content', null, function(){
				$self.ui.bt4examples.find('.bd-content').attr('class', 'col-md-9 bd-content');
				$self.ui.bt4examples.find('#markdown-toc').remove();
				$self.ui.bt4examples.find('#contents').remove();

			});



			this.ui.bt4examples.append($div);
		}

	}

	return StyleGuideView;

});
