/* eslint-env jquery,amd */
define(['jquery', 'marionette',
    './listTemplate.hbs',
    'rup.list',
    'rup.select'
], function ($, Marionette, ListTestTemplate) {
    var ListTestView = Marionette.View.extend({
        template: ListTestTemplate,
        ui: {
            list: '#list'
        },
        onAttach: fncOnAttach,
        initialize: function () {}
    });

    function fncOnAttach() {
        window.$ = $;

        // Preparamos los eventos de la pantalla
        $('#listFilterLimpiar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#listFilterForm').find('input').val('');
            $('#rup-list').rup_list('filter');
        });
        $('#listFilterAceptar').on('click', (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            $('#rup-list').rup_list('filter');
        });

        //Generamos el componente
        $('#rup-list').rup_list({
            action: '/demo/list/filter',
            filterForm: 'listFilterForm',
            feedback: 'rup-list-feedback',
            // createFooter: false,
            visiblePages: 3,
            key: 'codigoPK',
            selectable: {
                multi: true,
                el: '.list-item'
            },
            sidx: {
                source: [{
                    value: 'USUARIO',
                    i18nCaption: 'Usuario'
                }, {
                    value: 'EDAD',
                    i18nCaption: 'Edad'
                }, {
                    value: 'CODCLIENTE',
                    i18nCaption: 'Codigo cliente'
                }],
                value: 'EDAD'
            },
            sord: 'asc',
            rowNum: {
                source: [{
                    value: '5',
                    i18nCaption: 'Cinco'
                }, {
                    value: '10',
                    i18nCaption: 'Diez'
                }, {
                    value: '20',
                    i18nCaption: 'Veinte'
                }],
                value: '5'
            },
            isMultiSort: true,
            // isScrollList: true,
            // isHeaderSticky: true,
            // isSuperSelect: true,
            // isMultiFilter: true,
            // show: {
            //     animation: 'fade',
            //     delay: 1000
            // },
            // hide: {
            //     animation: 'fade',
            //     delay: 500
            // },
            // print: './print.css',
            // loader: (ui) => {
            //     ui.children().remove();
            //     ui.append('loading...').css('text-align', 'center');
            // },
            modElement: (ev, item, json) => {
                var userVal = item.find('#usuario_value_' + json.codigoPK);
                userVal.text(userVal.text() + ' :D');
            },
            load: () => {},
        });

        $('#rup-list').on('initComplete', () => {
            $('#rup-list').rup_list('filter');
        });
    }

    return ListTestView;
});