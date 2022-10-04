define(['marionette',
	'./menuTemplate.hbs',
	'rup.menu','rup.lang','rup.navbar'], function(Marionette, MenuTemplate){

	var MenuView = Marionette.View.extend({
		template: MenuTemplate,
		redirectNavLink: fncRedirectNavLink,
		ui:{
			// menuElement: "#x21aResponsiveWar_menu",
			// menuMixedElement: "#x21aResponsiveWar_menu"
			languageTool: '#languageDropdown',
			navbar: '#navbarResponsive',
			navLink : '[data-redirect-navLink]'
			// navLinkBt4: "#navLinkBt4",
			// navLinkBt3: "#navLinkBt3",
			// navLinkJQui: "#navLinkJQui"
		},
		events: {
			'click @ui.navLink': 'redirectNavLink'
		},
		onAttach : fncOnAttach
	});

	function fncOnAttach(){
		this.ui.languageTool.rup_language({languages: jQuery.rup.AVAILABLE_LANGS_ARRAY});
		this.ui.navbar.rup_navbar();
	}

	function fncRedirectNavLink(event){


		var newIndex = $(event.target).attr('data-redirect-navLink');

		window.location.href = _replaceIndex(newIndex);

	}

	function _replaceIndex(newIndex){
		var pathname = window.location.pathname,
			splitPathname = pathname.split('/'),
			index = splitPathname[splitPathname.length-1],
			href = window.location.href,
			splitHref = href.split(index);

		return splitHref[0] + newIndex +(splitHref.length>1?splitHref[splitHref.length-1]:'');

	}

	return MenuView;
});
