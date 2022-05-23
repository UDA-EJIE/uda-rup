# Componentes RUP – Combo


<!-- MDTOC maxdepth:6 firsth1:1 numbering:0 flatten:0 bullets:1 updateOnSave:1 -->

   - [1 Introducción](#1-introducción)   
   - [2 Ejemplo](#2-ejemplo)   
   - [3 Casos de uso](#3-casos-de-uso)   
   - [4 Infraestructura](#4-infraestructura)   
      - [4.1 Ficheros](#41ficheros)   
      - [4.2 Dependencias](#42-dependencias)   
      - [4.3 Versión minimizada](#43-versión-minimizada)   
   - [5 Invocación](#5-invocación)   
   - [6 API](#6-api)   
   - [7 Comunicación remota](#7-comunicación-remota)   
      - [7.1 Option Groups Remotos](#71option-groups-remotos)   
   - [8 Combos enlazados](#8-combos-enlazados)   
      - [8.1 Local](#81-local)   
      - [8.2 Remoto](#82remoto)   
   - [9 Precarga de datos](#9-precarga-de-datos)   
      - [9.1 Carga a partir del elemento HTML select](#91carga-a-partir-del-elemento-html-select)   
      - [9.2 Carga a partir de un objeto JSON](#92carga-a-partir-de-un-objeto-json)   
   - [10 Sobreescritura del theme](#10-sobreescritura-del-theme)   
   - [11 Integración con UDA](#11integración-con-uda)   
      - [11.1 Propiedades adicionales](#111-propiedades-adicionales)   
   - [12 Aspectos a tener en cuenta](#12-aspectos-a-tener-en-cuenta)   

<!-- /MDTOC -->




## 1 Introducción
La descripción del **Componente Combo**, visto desde el punto de vista de RUP, es la siguiente:
*Permite al usuario recuperar un elemento de una gran lista de elementos o de varias listas dependientes de forma sencilla y ocupando poco espacio en la interfaz.*

## 2 Ejemplo
Se presentan a continuación un ejemplo de este componente:
![Selección simple](img/rup.combo_1.png)
Selección Simple

![Selección múltiple](img/rup.combo_2.png)
Selección Múltiple

## 3 Casos de uso
Se aconseja la utilización de este componente:
+ Cuando la entrada de datos dependa de una selección de información previa. El ejemplo más común es la selección de provincia y municipio.


## 4 Infraestructura
A continuación se comenta la infraestructura necesaria para el correcto funcionamiento del componente.
+ Únicamente se requiere la inclusión de los ficheros que implementan el componente (js y css) comentados en los apartados *Ficheros y Dependencias*.

### 4.1	Ficheros
Ruta Javascript: rup/scripts/
Fichero de plugin: **rup.combo-x.y.z.js**
Ruta theme: rup/css/
Fichero CSS del theme: **theme.rup.combo-x.y.z.css**

### 4.2 Dependencias
Por la naturaleza de desarrollo de los componentes (patrones) como plugins basados en la librería JavaScript **jQuery**, es necesaria la inclusión del esta. La versión elegida para el desarrollo ha sido la versión **3.4.1**.
+ **jQuery 3.4.1**: http://jquery.com/

La gestión de la ciertas partes visuales de los componentes, se han realizado mediante el plugin jQuery UI que se basa en *jQuery* y se utiliza para construir aplicaciones web altamente interactivas. Este plugin, proporciona abstracciones de bajo nivel de interacción y animación, efectos avanzados de alto nivel, componentes personalizables (estilos) ente otros. La versión utilizada en el desarrollo ha sido la **1.12.0**.

+ **jQuery UI 1.12.0:** http://jqueryui.com/


Los ficheros necesarios para el correcto funcionamiento del componente son:
```
        jquery-3.4.1.js
        jquery.ui.selectmenu.js
        rup.base-x.y.z.js
        rup.combo-x.y.z.js
        theme.rup.combo-x.y.z.css
```

### 4.3 Versión minimizada
A partir de la versión v2.4.0 se distribuye la versión minimizada de los componentes RUP. Estos ficheros contienen la versión compactada y minimizada de los ficheros javascript y de estilos necesarios para el uso de todos los compontente RUP.
Los ficheros minimizados de RUP son los siguientes:
+ **rup/scripts/min/rup.min-x.y.z.js**
+ **rup/css/rup.min-x.y.z.css**

Estos ficheros son los que deben utilizarse por las aplicaciones. Las versiones individuales de cada uno de los componentes solo deberán de emplearse en tareas de desarrollo o depuración.

## 5 Invocación
Este componente se invocará mediante un selector que indicará todos los elementos sobre los que se va a aplicar el componente Combo. Por ejemplo:
```javascript
$("#id_input").rup_combo(properties);
```
Donde el parámetro *“properties”* es un objeto *( var properties = {}; )* o bien directamente la declaración de lo valores directamente. Sus posibles valores se detallan en el siguiente apartado.

## 6 API
Para ver en detalle la API del componente vaya al siguiente [documento](../api/rup.combo.md).

## 7 Comunicación remota
El componente Combo permite recuperar los datos almacenados en base de datos. En el método del *controller* que recibe la petición se invocará  al servicio encargado de recuperar los datos. Como no se va a realizar ningún filtrado por algún campo de la entidad ni se requiere de paginación, los parámetros serán **null, null:**
```java
@RequestMapping(value = "combo/remote", method=RequestMethod.GET)
	public @ResponseBody List<Patrones> getRemoteCombo(){
			return patronesService.findAll(null, null);
}
```
El método devuelve una lista de entidades en este caso *List<Patrones>* donde cada entidad tendrá todos y cada uno de los atributos cargados con los valores de la Base de Datos. Al devolver la lista con la anotación *@ResponseBody*, entrará en funcionamiento Jackson (parseador de JSON de Spring) para convertir la lista JAVA en una lista JSON:
+ JAVA:

	+ patronesList :
 		+ patronesList [0]
 			+ code = Autocomplete
     		+ descEs = Autocomplete_es
     		+ descEu = Autocomplete_eu
     		+  css = filter

 		+ patronesList [1]

			+ code = Combo
			+ descEs = Combo_es
			+ descEu = Combo_eu
    		+ css = print


+ JSON:
	```javascript
	[
		{
			code="Autocomplete", 
			descEs="Autocomplete_es",
			descdescEu="Autcomplete_eu", 
			css="filter"
		},
		{
			code="Combo", 
			descEs="Combo_es",
			descEu="Combo_eu", 
			css="print"
		},
		...
	]
	```
Como se ha explicado en anteriormente en el atributo ***source*** en el apartado 8 (propiedades) el componente requiere de una estructura de terminada para cargar el combo:
```javascript
[
	{label: "Autocomplete_es", value:"Autocomplete", style:"aaa"},
	{label: "Combo_es", value:"Combo ", style:"bbb"},
	{label: "Dialog_es", value:"Dialog", style:"ccc"},
	...
]
```
La traducción entre la estructura devuelta por el *controller* y la que espera el componente se realiza mediante un serializador propio de UDA. Para que este entre en funcionamiento simplemente se deberá configurar el fichero **mvc-config** del WAR *(/xxxWAR/WebContent/WEB-INF/spring/mvc-config.xml)* indicando que el modelo utilizado utilice el serializador de **UDA**:
```xml
<bean id="jacksonJsonCustomSerializerFactory" class="com.ejie.x38.serialization.CustomSerializerFactoryRegistry">
   <property name="serializers">
     <map>
       <entry key="com.ejie.x21a.model.Patrones" value-ref="customSerializer" />
        ...
     </map>
   </property>
</bean>
```
NOTA: Al generar el código con el *plugin* de **UDA**, se añade este serializador para todos los objetos del modelo creados.

### 7.1	Option Groups Remotos
El uso de *“option groups remotos”* requiere de un pequeño esfuerzo por parte del desarrollador ya que se deben recuperar los diferentes grupos a incluir en el combo invocando a sus respectivos servicios y agruparlos en la estructura que espera el componente Combo. Ejemplo:
```javascript
[
	{"Futbol" : [
		{label: "Alaves", value:"alaves", style:"aaa"},
		{label: "Athletic", value:"ath", style:"bbb"},
		{label: "Real Sociedad", value:"real", style:"ccc"}
	]},
	{"Baloncesto" : [
		{label: "Caja Laboral", value:"laboral", style:"ddd"},
		{label: "BBB", value:"bilbao", style:"eee"},
		{label: "Lagun aro", value:"lagun aro", style:"fff"}
	]},
	{"Formula 1" : [
		{label: "Fernando Alonso", value:"falonso"},
		{label: "Lewis Hamilton", value:"hamilton"},
		{label: "Sebastián Vettel", value:"vettel"}
	]}
]
```
El método encargado de recuperar los datos devolverá una lista que contiene un mapa por cada uno de los grupos. Dicho mapa, tendrá como clave el literal a mostrar en la cabecera del grupo y como valor una lista de entidades. La lista de entidades se traducirá a la estructura que espera el componente mediante el serializador de UDA explicado en el apartado anterior.
A continuación se muestra un ejemplo de cómo debería ser el *controller* encargado de devolver un *“option group remoto”* en el que se cargarán las entidades de Provincia, Comarca, Localidad y Patrones:

```java
@RequestMapping(value = "combo/remoteGroup", method=RequestMethod.GET)
public @ResponseBody List<HashMap<String, List<?>>> getRemoteComboGrupos() {

	//Idioma
	Locale locale = LocaleContextHolder.getLocale();

	//Retorno del método
	List<HashMap<String, List<?>>> retorno = new
	ArrayList<HashMap<String, List<?>>>();

	//Nombres de los grupos según idioma
   	String provincia = null, comarca = null,
	localidad = null, patrones = null;

	if (com.ejie.x38.util.Constants.EUSKARA.equals(locale.getLanguage())) {
		provincia = "Provincia_eu";
		comarca = "Comarca_eu";
		localidad = "Localidad_eu";
		patrones = "Patrones_eu";
	} else {
		provincia = "Provincia";
		comarca = "Comarca";
		localidad = "Localidad";
		patrones = "Patrones";
	}

	//Provincia
	HashMap<String, List<?>> group = new HashMap<String, List<?>>();
	group.put(provincia, provinciaService.findAll(null, null));
	retorno.add(group);

	//Comarca
	group = new HashMap<String, List<?>>();
	group.put(comarca, comarcaService.findAll(null, null));
	retorno.add(group);

	//Localidad
	group = new HashMap<String, List<?>>();
	group.put(localidad, localidadService.findAll(null, null));
	retorno.add(group);

	//Patrones
	group = new HashMap<String, List<?>>();
	group.put(patrones, patronesService.findAll(null, null));
	retorno.add(group);

	return retorno;
}
```
Un ejemplo de la respuesta devuelta por este método del controlador sería la siguiente:
```javascript
[
	{"Provincia_eu":[
		{"style":"","value":"1","label":"Araba"},
		{"style":"","value":"2","label":"Bizkaia"},
		{"style":"","value":"3","label":"Gipuzkoa"}
	]},
	{"Comarca_eu":[
		{"style":"","value":"3","label":"A-Zona3"},
		{"style":"","value":"2","label":"A-Zona2"},
		{"style":"","value":"1","label":"A-Zona1"},
		{"style":"","value":"9","label":"Ezkerraldea"},
		{"style":"","value":"8","label":"Eskumaldea"},
		{"style":"","value":"7","label":"Bilbo Haundia"},
		{"style":"","value":"6","label":"G-Zona3"},
		{"style":"","value":"5","label":"G-Zona2"},
		{"style":"","value":"4","label":"G-Zona1"}
	]},
	{"Localidad_eu":[
		{"style":"","value":"3","label":"Galdakao"},
		{"style":"","value":"2","label":"Basauri"},
		{"style":"","value":"1","label":"Bilbo"},
		{"style":"","value":"6","label":"Getxo"},
		{"style":"","value":"5","label":"Areeta"},
		{"style":"","value":"4","label":"Leioa"},
		{"style":"","value":"9","label":"Barakaldo"},
		{"style":"","value":"8","label":"Portugalete"},
		{"style":"","value":"7","label":"Sestao"}
	]},
	{"Patrones_eu":[
		{"style":"filter","value":"Autocomplete","label":"Autocomplete_eu"},
		{"style":"print","value":"Combo","label":"Combo_eu"},
		{"style":"delete","value":"Dialog","label":"Dialog_eu"},
		{"style":"filter","value":"Feedback","label":"Feedback_eu"},
		{"style":"print","value":"Grid","label":"Grid_eu"},
		{"style":"delete","value":"Maint","label":"Maint_eu"},
		{"style":"filter","value":"Menu","label":"Menu_eu"},
		{"style":"print","value":"Message","label":"Message_eu"},
		{"style":"delete","value":"Tabs","label":"Tabs_eu"},
		{"style":"filter","value":"Toolbar","label":"Toolbar_eu"},
		{"style":"print","value":"Tooltip","label":"Tooltip_eu"}
	]}
]
```

## 8 Combos enlazados
Mediante el uso del componente Combo, se pueden encadenar dos o más combos de tal manera que los valores que se cargarán en uno dependan directamente del valor seleccionado en el otro. Es decir, crear combos enlazados (también conocidos como combos dependientes).

Estos combos enlazados, pueden ser tanto locales o remotos. Para indicar que un combo depende directamente del valor de otro se utilizará el atributo ***parent***, que será un *array* con los identificador(es) del padre(s). Veamos un ejemplo:
```javascript
parent: [ "departamento", "provincia" ],
```
Las dependencias entre los combos pueden encadenarse de tal manera que se tenga un combo que depende de otro combo que a su vez depende de otro combo y así sucesivamente (incluso se pueden combinar combos locales con remotos indistintamente). Además es posible que un combo dependa a su vez de dos combos o más y no se cargará ni se activará hasta que todos sus padres hayan tomado un valor determinado.

Al ser combos enlazados, si un combo elimina su selección (elige la opción por defecto “Seleccione un elemento” o elige una opción de cuyo valor no dependa ningún dato) todos sus combos hijos se vaciarán y se deshabilitarán. Además si un combo se deshabilita (o se inicializa deshabilitado), todos sus hijos se cargarán pero se mostrarán deshabilitados.

A continuación veremos como se configuran/utilizan los combos enlazados locales y los remotos:

### 8.1 Local
Cuando se desea utilizar el componente Combo enlazando datos locales se deben realizar una serie de configuraciones que se detallan a continuación:
1.	La propiedad ***source*** del combo hijo, debe tener la siguiente estructura:
	```javascript
	source: {"v1":[xxx], "v2":[yyy], "v3":[zzz] }
	```
	+ v1, v2, v3 : posible valor seleccionable en el combo padre
	+ [xxx], [yyy], [zzz] : estructura que posee un combo no dependiente (ver atributo o).

2.	El combo hijo debe indicar en su configuración que depende del combo padre mediante la propiedad parent:
	```javascript
	parent: [ "comboPadre" ]
	```

### 8.2	Remoto
Cuando se desea utilizar el componente Combo enlazando datos remotos, se deben realizar una serie de configuraciones que se detallan a continuación:
1. 	El combo padre debe incluir en su código *HTML* el atributo ***name*** que define el nombre del parámetro que se va a enviar en la petición de carga del combo dependiente.
2.	El combo hijo debe indicar en su configuración que depende del combo padre mediante la propiedad ***parent***.
3.	El método del *controller* que recibe la petición de carga del hijo, contendrá en su signatura el atributo con el valor seleccionado en el combo padre y se utilizará como filtro en la búsqueda de datos.
4.	Configurar el serializador de **UDA**.

+	Código HTML:
	+	El **combo padre** debe definir el nombre del parámetro en la petición de carga del combo hijo:
		```xml
		<select id="comboPadreRemoto" name="provincia" class="rup-combo"></select>
		```
	+	El **combo hijo**:
		```xml
		<select id="comboHijoRemoto" class="rup-combo"></select>
		```
+	Configuración js:
	+	El **combo padre**:
		```javascript
		$('#comboPadreRemoto').rup_combo({
			source : "comboEnlazado/remoteEnlazadoProvincia",
				...
		});
		```

	+	El **combo hijo** debe indicar cual/cuales son sus padre/s:
		```javascript
		$('#comboHijoRemoto').rup_combo({
			parent: [ "comboPadreRemoto" ],
			source : "comboEnlazado/remoteEnlazadoComarca",
			...
		})
		```

+	Controller:
	+	El método para la petición del **combo padre**:
		```java
		@RequestMapping(value = "comboEnlazado/remoteEnlazadoProvincia", method=RequestMethod.GET)
		public @ResponseBody List<Provincia> getEnlazadoProvincia() {
			return provinciaService.findAll(null, null);
		}
		```

	+	El método para la petición del **combo hijo** debe declarar el parámetro donde se recibe el elemento seleccionado en el padre:

		```java
		@RequestMapping(value = "comboEnlazado/remoteEnlazadoComarca", method=RequestMethod.GET)
		public @ResponseBody List<Comarca> getEnlazadoComarca(
		@RequestParam(value = "provincia", required = false) BigDecimal provincia_code) {

			//Convertir parámetros en entidad para búsqueda
			Provincia provincia = new Provincia();
			provincia.setCode(provincia_code);
			Comarca comarca = new Comarca();
			comarca.setProvincia(provincia);

			return comarcaService.findAll(comarca, null);
		}
		```
+	Serializador:
	Se indica que las entidades utilizadas se serialicen en el retorno del controller a la ***JSP***:
	```xml
	<bean id="jacksonJsonCustomSerializerFactory" class="com.ejie.x38.serialization.CustomSerializerFactoryRegistry">
	<property name="serializers">
		<map>
			<entry key="com.ejie.x21a.model.Provincia" value-ref="customSerializer" />
			<entry key="com.ejie.x21a.model.Comarca" value-ref="customSerializer" />
			...
		</map>
	</property>
	</bean>
	```

## 9 Precarga de datos
La recuperación los datos proporcionados por el servidor de aplicaciones, se realiza mediante una petición AJAX. Con el objeto de minimizar el número de peticiones realizadas por el componente combo, se posibilita el realizar una precarga de los datos que va a presentar el combo sin necesidad de realizar la primera petición AJAX.
Se proporcionan dos mecanismos para permitir realizar la carga inicial de los datos del combo:

### 9.1	Carga a partir del elemento HTML select
En este caso el componente combo toma los valores existentes en los tag option del elemento select como valores a precargar. En el caso de que el componente deba de actualizar los datos en base a una acción del usuario, se realizará mediante una petición AJAX.

A continuación se muestra un ejemplo de la implementación que se debería de realizar para que una invocación al componente combo utilice los datos existentes en un combo HTML para inicializarse.

Suponemos que se desea cargar en un componente RUP combo, los datos de provincias. En el controller que realizará la navegación a la entrada del tiles correspondiente se realiza lo siguiente:

```java
@RequestMapping(value = "maint", method = RequestMethod.GET)
public String getMaint(Model model) {
	List<Provincia> listaProvincias = provinciaService.findAll(null, null);
	model.addAttribute("provincias",listaProvincias);

	return "maint";
}
```

La ejecución de este método del controller añadirá al atributo provincia del model la lista de provincias obtenidas a partir de la consulta a base de datos. Esto nos permitirá realizar la carga de datos del combo en la jsp.
El siguiente paso es implementar en la jsp el combo HTML en el que se van a cargar los datos. Estos datos serán los utilizados para inicializar el componente RUP combo.

```html
<div class="form-groupMaterial">
	<label for="provincia">Provincia</label>
	<form:select path="provincia.id" class="formulario_linea_input" id="provincia">
		<form:options items="${provincias}" itemLabel="dsO" itemValue="id"/>
	</form:select>
</div>
```

Por último se deberá de realizar la invocación del componente RUP combo en el fichero js correspondiente a la página.
```javascript
jQuery("#provincia").rup_combo({
	source: "../provincia",
	sourceParam: {label:"dsO", value:"id"},
	width: '100%',
    customClasses: ['select-material'],
	blank: "",
	loadFromSelect: true
});
```
La invocación del componente se realizará de modo normal, indicando mediante el parámetro source una URL mediante la cual se podrá realizar una recarga de los datos. Entre los parámetros de configuración se debe de indicar mediante loadFromSelect:true que se utilice el contenido del combo HTML para la inicialización del componente.

### 9.2	Carga a partir de un objeto JSON
De manera alternativa se puede proporcionar al componente de los datos con los que debe de inicializarse mediante un objeto JSON. Este objeto puede ser inicializado directamente o generado dinámicamente tanto en cliente como en el servidor de aplicaciones. El objeto json debe consistir en un *array*

## 10 Sobreescritura del theme
El componente combo se presenta con una apariencia visual definida en el fichero de estilos theme.rup.combo-x.y.z.css.

Si se quiere modificar la apariencia del componente, se recomienda redefinir el/los estilos necesarios en un fichero de estilos propio de la aplicación situado dentro del proyecto de estáticos *(codAppStatics/WebContent/codApp/styles)*.

Los estilos del componente se basan en los estilos básicos de los widgets de jQuery UI, con lo que los cambios que se realicen sobre su fichero de estilos manualmente o mediante el uso de la herramienta Theme Roller podrán tener repercusión sobre todos los componentes que compartan esos mismos estilos (pudiendo ser el nivel de repercusión general o ajustado a un subconjunto de componentes).

Ejemplo base de la estructura generada por el componente para selección simple:

```xml
<a aria-owns=" id-menu" aria-haspopup="true" tabindex="0" href="#" role="button" id=" id-button" class="ui-selectmenu ui-widget ui-state-default ui-selectmenu-dropdown ui-corner-all" style="width: 300px;" aria-disabled="false">
	<span class="ui-selectmenu-status">item1</span>
	<span class="ui-selectmenu-icon ui-icon ui-icon-triangle-1-s"></span>
</a>

<!-- at end of body-->
<ul id="speedA_menu_318" role="menu" aria-labelledby="speedA_button_318" class="ui-selectmenu-menu ui-widget ui-widget-content ui-corner-all ui-selectmenu-menu-popup ui-selectmenu-open" style="width: 147px; left: 184.017px; top: 136.95px;">
    <li class="whoo ui-corner-top ui-selectmenu-item-selected ui-state-active">
		<a aria-selected="true" role="option" tabindex="-1" href="#">item1</a>
    </li>
    <li>
		<a aria-selected="false" role="option" tabindex="-1" href="#">item2</a>
    </li>
    <li>
		<a aria-selected="false" role="option" tabindex="-1" href="#">item3</a>
    </li>
</ul>
```

Ejemplo base de la estructura generada por el componente para selección simple:
```xml
<button type="button" class="ui-multiselect ui-widget ui-state-default ui-corner-all ui-state-active" aria-haspopup="true" style="width: 406px;" aria-disabled="false">
	<span class="ui-icon ui-icon-triangle-1-s"></span>
	<span>2 seleccionado(s)</span>
</button>
<!-- at end of body-->
<div id="rup-multiCombo_multicombo" class="ui-multiselect-menu ui-widget ui-widget-content ui-corner-all" style="width: 398px; top: 291.9px; left: 63.15px; display: block;">
	<div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">
		<ul class="ui-helper-reset">
			<li>
				<a href="#" class="ui-multiselect-all" oldtitle="Seleccionar todos los elementos" aria-describedby="ui-tooltip-4">
					<span class="ui-icon ui-icon-check"></span>
					<span>Seleccionar todo</span>
				</a>
			</li>
			<li>
				<a href="#" class="ui-multiselect-none" oldtitle="Deseleccionar todos los elementos" aria-describedby="ui-tooltip-5">
					<span class="ui-icon ui-icon-closethick"></span>
					<span>Deseleccionar todo</span>
				</a>
			</li>
			<li class="ui-multiselect-close">
				<a class="ui-multiselect-close" href="#">
					<span class="ui-icon ui-icon-circle-close"></span>
				</a>
			</li>
		</ul>
	</div>
	<ul class="ui-multiselect-checkboxes ui-helper-reset" style="height: 175px;">
		<li class="">
			<label class="ui-corner-all" title="" for="ui-multiselect-multicombo-option-0">
				<input type="checkbox" checked="checked" title="ruby" value="ruby_value" name="multiselect_multicombo" id="ui-multiselect-multicombo-option-0"/>
				<span>ruby</span>
			</label>
		</li>
		...
	</ul>
</div>
```
Estilos para colorear elementos pares e impares:

+	**.rup-combo_odd**  → Elementos impares
+	**.rup-combo_even** → Elementos pares
+	**.rup-combo_groupOdd** → Cabecera de grupo impar
+	**.rup-combo_groupEven** → Cabecera de grupo par


##  11	Integración con UDA
En el caso de que el componente combo utilice datos obtenidos de una fuente remota, la comunicación con el servidor de aplicaciones se realizaría del siguiente modo:

El componente Combo necesita que los datos remotos que le son servidos sigan la siguiente estructura:
```javascript
[
	{"style":"print","value":"1","label":"Alava"},
	{"style":"print","value":"2","label":"Vizcaya"},
	{"style":"print","value":"3","label":"Gipuzcoa"}
]
```
Para este fin, el componente envía en la petición una cabecera de **RUP** con la información necesaria para realizar la serialización.
```javascript
{"label":"descEs","value":"code","style":"css"}
```
Para realizar la serialización de los datos enviados como respuesta desde el servidor, se deberá de configurar el serializador de **UDA** para que genere la estructura JSON correcta para que el componente presente los datos.
```xml
<bean id="jacksonJsonCustomSerializerFactory" class="com.ejie.x38.serialization.CustomSerializerFactoryRegistry">
   <property name="serializers">
    	<map>
      		<entry key="com.ejie.x21a.model.Provincia" value-ref="customSerializer" />
    	</map>
   </property>
</bean>
```
En el serializador deberá de declararse el model correspondiente a los datos que se envían desde el servidor.

### 11.1 Propiedades adicionales
```javascript
onLoadError: null
```
Función de callback a ejecutar en caso de que se produzca un error en la petición de obtención de la lista de elementos a mostrar.
&nbsp;
```javascript
width: '100%'
```
Determina el tamaño del combo. Su valor por defecto es `200` para la selección simple. En el caso de selección múltiple su declaración es obligatoria. Puede establecerse un porcentaje para que el combo sea responsivo.
&nbsp;
```javascript
blank: null
```
Se utiliza para declarar un valor independiente de la lógica de negocio y en ocasiones se representa como "Seleccione un elemento". Permite establecer un mensaje independiente por cada combo haciendo uso de `$.rup.i18n.app.id._blank` (sustituyendo id por el propio de cada combo) o uno genérico por aplicación haciendo uso de `$.rup.i18n.app.rup_combo.blank`. En caso de no definir ninguno, se usará el genérico de UDA: `$.rup.i18n.base.rup_combo.blankNotDefined`.
&nbsp;
```javascript
style: dropdown
```
Tipo de visualización de la lista de opciones del combo.
&nbsp;
```javascript
showValue: false
```
Determina si el combo debe mostrar el valor asociado concatenado al literal (sólo selección simple).
&nbsp;
```javascript
token: "|"
```
Define el separador a utilizar cuando se muestra el valor asociado al combo concatenado al literal.
&nbsp;
```javascript
multiValueToken: "##"
```
Define el separador a utilizar en combos enlazados locales.
&nbsp;
```javascript
ordered: true
```
Indica si el combo debe ordenarse.
&nbsp;
```javascript
orderedByValue: false
```
Indica si el la ordenación del combo debe realizarse por el valor de los elementos en lugar de por el texto.
&nbsp;
```javascript
onLoadSuccess: null
```
Función de callback a ejecutar en el caso de que la petición de carga de datos se haya producido correctamente.
&nbsp;
```javascript
loadFromSelect: false
```
Determina si se debe de utilizar los elementos `option` del elemento HTML sobre el que se inicializa el componente para inicializar los datos del elemento.
&nbsp;
```javascript
multiselect: false
```
Indica si el combo permite la selección múltiple.
&nbsp;
```javascript
multiOptgroupIconText: false
```
Indica si se desea que en la selección múltiple con grupos, el nombre del grupo tenga descripción en los iconos para seleccionar/deseleccionar los elementos del grupo.
&nbsp;
```javascript
submitAsString: false
```
Indica si el envío de los elementos seleccionados en la selección múltiple se realiza como un literal separados por coma.
&nbsp;
```javascript
submitAsJSON: false
```
Indica si el envío de los elementos seleccionados en la selección múltiple se realiza como un array JSON donde el nombre del mapa será el nombre del combo. En el caso de que el nombre contenga notación dot se tomará el último literal. Por ejemplo: [{id:1}, {id:2}, …].
&nbsp;
```javascript
readAsString: false
```
Determina si la asignación de un valor inicial se va a realizar a partir de un `string` con los identificadores de los elementos separados por comas en vez de un array de JSON.
&nbsp;
```javascript
rowStriping: false
```
Indica si se debe aplicar un estilo diferente a las filas pares e impares para poder distinguirlas mediante un color diferente.
&nbsp;
```javascript
typeAhead=false
```
Especifica en milisegundos el tiempo de espera que toma el componente antes de procesar los eventos de escritura realizados por el usuario.
&nbsp;
```javascript
legacyWrapMode: false
```
Determina si se emplea el método obsoleto a la hora de empaquetar en objetos JSON los elementos seleccionados. Su propósito es mantener la retrocompatibilidad.
&nbsp;
```javascript
open: function( event, ui )
```
Por defecto, se usa para calcular el ancho del combo y se lo aplica al menú que despliega al pulsar sobre él. Puede sobrescribirse, pero se perdería la funcionalidad anteriormente descrita.
&nbsp;
```javascript
source: "../provincia"
```
Establece el endpoint al que el componente solicitará los datos.
&nbsp;
```javascript
sourceParam: {label:"dsO", value:"id"}
```
Permite definir los campos a usar para el label mostrado por el componente y su valor, por ejemplo, en vez de mostrar el identificador de un alumno, podría mostrarse su nombre completo pero el valor seguiría siendo el identificador, permitiendo así tener formularios sencillos de usar.
&nbsp;
```javascript
customClasses: ['select-material']
```
Añade clases personalizadas al elemento generado por el componente. Se recomienda usar la clase mostrada en el ejemplo para así estilizar el elemento con los estilos material de UDA.
&nbsp;
```javascript
selected: ""
```
Permite seleccionar uno de los elementos de manera predeterminada a partir del valor.
&nbsp;
```javascript
appendTo: "body"
```
Permite especificar el elemento del DOM al que se añadirá el menú desplegable del componente.

## 12 Aspectos a tener en cuenta
Cuando no se usen los formularios dinámicos de la tabla (propiedad `enableDynamicForms`), es necesario establecer el valor de la propiedad `appendTo` del componente a **body** u otro elemento que no sea el por defecto (a continuación del componente). Esto evitará la creación de un scroll vertical interno en el formulario.