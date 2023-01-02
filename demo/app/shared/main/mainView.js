
/**
 * @exports MainView
 */
define(['marionette',
	'./mainTemplate.hbs',
	'shared/header/headerView',
	'shared/language/languageView',
	'shared/footer/footerView',
	'shared/menu/menuView',
	'rup.breadCrumb'
], function(Marionette, MainTemplate, HeaderView, LanguageView, FooterView, MenuView){

	'use strict';

	/**
     * Vista principal.
     *
     * Define el layout de la página y las diferentes regiones en las que se van a cargar las vistas que van a componer la pantalla.
     *
     *
     * @class
     * @augments Backbone.View
     * @constructor
     * @name MainView
     *
     */
	var MainView = Marionette.View.extend({/** @lends MainView.prototype */
		el: 'body',
		template: MainTemplate,
		regions:{
			Header:'#header',
			Language: '#language',
			Menu: '#menu',
			BreadCrumb: '#breadCrumb',
			Container:'#container',
			Footer:'#footer'
		},
		onRender: fncOnRender,
		initialize: fncInitialize

	});





	function fncOnRender(){
		var $mainView = this;

		// Header
		$mainView.showChildView('Header', new HeaderView());
		$mainView.showChildView('Language', new LanguageView());
		$mainView.showChildView('Menu', new MenuView());
		$mainView.showChildView('Footer', new FooterView());

		//  window.history.pushState({
		//  	urlPath: '/x21aResponsive/patrones/ptrUno'
		//  }, "", '/x21aResponsive/patrones/ptrUno');

		$('#breadCrumb').rup_breadCrumb({
			"breadCrumb": {
				"patrones": {
					//Literal mostrado:
					"i18nCaption": "Varios patrones",
					//Elementos:
					"ptrUno": {
						"i18nCaption": "ptrUno"
					},
					"ptrDos": {
						"i18nCaption": "ptrDos"
					},
					"ptrTres": {
						"i18nCaption": "ptrTres"
					},
					//Sublevel
					"subLevel": [{
						"i18nCaption": "ptrUno",
						"url": "./patrones/ptrUno"
					},
					{
						"i18nCaption": "ptrDos",
						"url": "./patrones/ptrDos"
					},
					{
						"i18nCaption": "ptrTres",
						"url": "./patrones/ptrTres"
					}
					]
				}
			}
		});
	}

	function fncInitialize(){
	}

	return MainView;
});
