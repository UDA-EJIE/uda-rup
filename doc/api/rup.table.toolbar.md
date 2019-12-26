<a name="module_rup_table/toolbar"></a>

## rup_table/toolbar
Genera una botonera asociada a la tabla con la finalidad de agrupar los controles que permiten realizar acciones sobre los registros de la misma.

**Summary**: Plugin de toolbar del componente RUP Table.  
**Example**  
```js
$("#idComponente").rup_table({
```

* [rup_table/toolbar](#module_rup_table/toolbar)
    * [~options](#module_rup_table/toolbar..options)
    * [~preConfigureToolbar(settings)](#module_rup_table/toolbar..preConfigureToolbar)
    * [~postConfigureToolbar(settings)](#module_rup_table/toolbar..postConfigureToolbar)

<a name="module_rup_table/toolbar..options"></a>

### rup_table/toolbar~options
Propiedades de configuración del plugin toolbar del componente RUP Table.

**Kind**: inner property of [<code>rup_table/toolbar</code>](#module_rup_table/toolbar)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [id] | <code>string</code> |  | En caso de que se vaya a utilizar un identificador diferente al esperado por defecto, se deberá de indicar mediante esta propiedad. |
| [createDefaultToolButtons] | <code>boolean</code> | <code>true</code> | Determina (true/false) si se deben visualizar los botones correspondientes a las operaciones por defecto del componente. |
| [showOperations] | <code>object</code> |  | Permite indicar que operaciones definidas de manera global van a ser mostradas como botones. Cada operación puede tomar uno de los siguientes valores:  true: Valor por defecto. Se mostrará la operación como opción en la botonera.  true: Valor por defecto. Se mostrará la operación como opción en la  false: La operación no se mostrará como opción en la botonera. |
| [deleteOptions] | <code>object</code> |  | Propiedades de configuración de la acción de borrado de un registro. |
| [buttons] | <code>object</code> |  | Permite definir nuevos botones que se mostrarán en la toolbar. Los nuevos botones se especificarán del mismo modo que se describe en el componente rup_toolbar. |

<a name="module_rup_table/toolbar..preConfigureToolbar"></a>

### rup_table/toolbar~preConfigureToolbar(settings)
Metodo que realiza la pre-configuración del plugin toolbar del componente RUP Table.

**Kind**: inner method of [<code>rup_table/toolbar</code>](#module_rup_table/toolbar)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |

<a name="module_rup_table/toolbar..postConfigureToolbar"></a>

### rup_table/toolbar~postConfigureToolbar(settings)
Metodo que realiza la post-configuración del plugin toolbar del componente RUP Table.

**Kind**: inner method of [<code>rup_table/toolbar</code>](#module_rup_table/toolbar)  
**Emits**: [<code>rupTable_feedbackClose</code>](#module_rup_table+event_rupTable_feedbackClose)  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>object</code> | Parámetros de configuración del componente. |
