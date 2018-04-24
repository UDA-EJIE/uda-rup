import 'jquery';
import 'jasmine-jquery';
import 'rup.toolbar';

describe('Test ToolBar > ', () => {
    var $toolbar;
    beforeAll(() => {
        $('body').html('');
        let html = '<div id="exampleToolbar"></div>';
        let options = {
            buttons:[
                {id:'searchBtn',i18nCaption:'buscar'},
                {id: "mbutton1", i18nCaption:"botones", buttons:[
                    {id:'searchMBtn',i18nCaption:'buscar'},
                    {id:'editMBtn',i18nCaption:'editar'},
                    {id:'copyMBtn',i18nCaption:'copiar'}
                ]}
            ]
        };

        $('body').append(html);
        $('#exampleToolbar').rup_toolbar(options);
        $toolbar = $('#exampleToolbar');
    });

    describe('Creación > ', () => {
        it('Debe tener la clase', () => {
            expect($toolbar).toHaveClass('rup-toolbar ui-widget-header ui-widget ui-widget-content');
        });
        describe('Comprobamos los hijos >', () => {
            it('Debe tener 2 hijos ', () => {
                expect($toolbar.children().length).toBe(2);
            });
            it('Los hijos tienen que ser los botones declarados en options', () => {
                expect($toolbar.children()[0].id).toBe('exampleToolbar##searchBtn');
                expect($toolbar.children()[1].id).toBe('exampleToolbar##mbutton1-mbutton-group');
            });
        });
    });
    describe('Métodos Públicos > ', () => {
        describe('Método addButton >' , () => {
            let $btnSelector;
            beforeAll(() => {
                let button = {
                    id:'randomBtn1',
                    i18nCaption:'random1',
                    click: () => {alert('click randomBtn1')}
                };
                $toolbar.rup_toolbar('addButton', button);
                $btnSelector = $('[id="exampleToolbar##randomBtn1"]');
            });
            it('Debe existir', () => {
                expect($btnSelector.length).toBe(1);
            });
            it('Debe ser hijo de $toolBar', () => {
                expect($btnSelector.parent()[0].id).toBe('exampleToolbar');
            });
        });
        describe('Método addMNutton >', () => {
            let $mBtnSelector;
            beforeAll(() => {
                let mButton = {
                    id: "randomMbutton1", i18nCaption:"randomM1", buttons:[
                        {i18nCaption:"nuevo", css:"nuevo", click: () => {alert('click randomMBtn1:nuevo');}},
                        {i18nCaption:"editar", css:"editar", click: () => {alert('click randomMBtn1:editar');}},
                        {i18nCaption:"cancelar", css:"cancelar", click: () => {alert('click randomMBtn1:cancelar');}}
                    ]
                };
                $toolbar.rup_toolbar('addMButton', mButton);
                $mBtnSelector = $('[id="exampleToolbar##randomMbutton1-mbutton-group"]');
            });
            it('Debe existir', () => {
                expect($mBtnSelector.length).toBe(1);
            });
            it('Debe ser hijo de $toolBar', () => {
                expect($mBtnSelector.parent()[0].id).toBe('exampleToolbar');
            });
            it('Debe tener 3 botones hijos', () => {
                expect($($mBtnSelector).children('ul').children().length).toBe(3);
            });
        });
        describe('Método addButtonsToMButton >', () => {
            let $mBtnSelector;
            beforeAll(() => {
                let btns = [
                    {id:'added1', i18nCaption:'addedBtn1', click:() => {alert('click added1')}},
                    {id:'added2', i18nCaption:'addedBtn2', click:() => {alert('click added2')}}
                ];
                $toolbar.rup_toolbar('addButtonsToMButtons', 'mbutton1', btns);
                $mBtnSelector = $('[id="exampleToolbar##randomMbutton1-mbutton-group"]');
            });
            it('Deben estar en el mButton especificado', () => {
                expect($($mBtnSelector).children('ul').children()[3].id)
                    .toBe('exampleToolbar##randomMbutton1-mbutton-group##addedBtn1');
                expect($($mBtnSelector).children('ul').children()[4].id)
                    .toBe('exampleToolbar##randomMbutton1-mbutton-group##addedBtn2');
            });
        });
        describe('Método showMButton >', () => {
            //Imagino que sirve para mostrar los button en los MButtons
            beforeAll(() => {
                //Para asegurarse de que no estén ya abiertos
                $('body').click();
                $toolbar.rup_toolbar('showMButtons');
            });
            it('Los botones deben ser visibles', () => {
                expect($('.rup-mbutton-container').is(':visible')).toBeTruthy();
            });
        });
        describe('Método disableButton >',     () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('disableButton','exampleToolbar##searchBtn');
            });
            //No funciona en ejie.eus asi que no sé si se deshabilita añadiendo 
            //una clase o de alguna otra manera.
            // TODO: 
            it('Debe estar deshabilitado', () => {});
        });
        describe('Método enableButton >' ,     () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('enableButton','exampleToolbar##searchBtn');
            });
            //No funciona en ejie.eus asi que no sé si se habilita quitando 
            //una clase o de alguna otra manera.
            // TODO: 
            it('Debe estar habilitado', () => {});
        });
        describe('Método pressButton >',       () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('pressButton','exampleToolbar##searchBtn', 'pressed-button');
            });
            //Tampoco funciona en ejie pero imagino que es para añadir una clase al botón.
            it('Debe haber añadido la clase', () => {
                expect($('[id="exampleToolbar##searchBtn"]')).toHaveClass('pressed-button');
            });
        });
        describe('Método unpressButton >',     () => {
            beforeAll(() => {
                $toolbar.rup_toolbar('unpressButton','exampleToolbar##searchBtn', 'pressed-button');
            });
            //Tampoco funciona en ejie pero imagino que es para quitar una clase al botón.
            it('Debe haber quitado la clase', () => {
                expect($('[id="exampleToolbar##searchBtn"]')).not.toHaveClass('pressed-button');
            });
        });
        describe('Método togglePressButton >', () => {
            let hayClase;
            beforeAll(() => {
                hayClase = $('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button');
                $toolbar.rup_toolbar('togglePressButton', 'exampleToolbar##searchBtn', 'pressed-button');
            });
            it('Debe hace toggle con la clase', () => {
                expect($('[id="exampleToolbar##searchBtn"]').hasClass('pressed-button')).not.toBe(hayClase);
            });
        });
        describe('Método refreshButton >',     () => {
            beforeAll(() =>{
                $toolbar.rup_toolbar('disableButton', 'exampleToolbar##searchBtn');
                $toolbar.rup_toolbar('refreshButton', 'exampleToolbar##searchBtn');
            });
            //Compo no funciona en ejie.eus no se la condicion para que el botón este habilitado
            it('Debe estar habilitado', () => {});
        });
        describe('Método hideMButtons  >',     () => {
            //Imagino que sirve para ocultar los button en los MButtons
            beforeAll(() => {
                //Para asegurarse de que no estén ya abiertos
                $toolbar.rup_toolbar('showMButtons');
                $toolbar.rup_toolbar('hideMButtons');
            });
            it('Los botones deben ser visibles', () => {
                expect($('.rup-mbutton-container').is(':visible')).toBeFalsy();
            });
        });
    });
});