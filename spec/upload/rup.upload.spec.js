import 'jquery';
import 'jasmine-jquery';
import 'blueimp-file-upload';
import 'rup.upload';

describe('Test Upload > ', () => {
    var $upload;
    beforeAll(() => {
        let html =   '<span class="btn btn-success fileinput-button">'
                +       '<i class="glyphicon glyphicon-plus"></i>'
                +       '<span>Seleccionar...</span>'
                +       '<input id="exampleUpload" type="file" name="files[]" data-url="../upload" multiple="multiple" />'
                +    '</span>'
                +    '<p id="txtVar"></p>';
        let props = {
            dataType: 'json',
            uploadTemplateId:false,
            downloadTemplateId:false
        };
        $('body').append(html);
        $('#exampleUpload').rup_upload(props);
        $upload = $('#exampleUpload');
    });
    afterAll(() => {
        $('body').html('');
    });
    describe('Creación > ', () => {/**
     * No se crea ningún cambio en el DOM que nos dé pistas de si se crea o no correctamente
     * el elmento rup. Consideramos que se pasa bien si los métodos públicos no fallan
     */});
    describe('Métodos públicos > ', () => {
        describe('Método add > ', () => {
            beforeAll(() => {
                $upload.rup_upload('add', () => {
                    $('#txtVar').addClass('add-worked');
                });
                /**
                 * No se puede añadir programáticamente archivos a un
                 * input type:"file"
                 *  https://stackoverflow.com/questions/15194365/appending-dropped-file-to-input-type-file-multiple
                 */
            });
            it('#txtVar debe tener la clase add-worked', () => {
                expect($('#txtVar')).toHaveClass('add-worked');
            });
        });
        describe('Método disable > ', () => {
            beforeAll(() => {
                $upload.rup_upload('disable');
            });
            afterAll(() => {
                $upload.rup_upload('enable');
            });
            it('Debe tener la clase que lo marca como deshabilitado', () => {
                expect($upload).toHaveClass('blueimp-fileupload-disabled');
            });
        });
        describe('Método enable > ', () => {
            beforeAll(() => {
                $upload.rup_upload('disable');
                $upload.rup_upload('enable');
            });
            it('No debe tener la clase que lo marca como deshabilitado', () => {
                expect($upload).not.toHaveClass('blueimp-fileupload-disabled');
            });
        });
        describe('Método destroy > ', () => {
            beforeAll(() => {
                $upload.rup_upload('destroy');
            });
            it('Intentar lanzar el método destroy por segunda vez debe lanzar un error', () => {
                expect(() => {
                    $upload.rup_upload('destroy');
                }).toThrowError();
            });
        });
    });
});