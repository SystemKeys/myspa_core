/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function inicializar(){
    if (localStorage.getItem('MYSPA_CREDENCIAL') == null) {
        window.location = '../login.html';
    }
    var empleado = JSON.parse(localStorage.getItem('MYSPA_CREDENCIAL'));
    
    $('#spnEmpleadoNombre').html(empleado.persona.nombre +' ' + empleado.persona.apellidoPaterno);
}

function cargarModuloProducto(){
    $.ajax  (   
                {   type   :    "GET",
                    url    :   "producto/catalogo.html",
                    async  :    true
                }
            ).done(
                    function(data){
                      $('#divMainContainer').html(data);  
                      
                        actualizarTablaProductos();
                        }
                    );
                   
                    
}

function actualizarTablaProductos(){
    $.ajax( {
                                type   : "GET",
                                url    : "../rsproducto/getAllProducto",
                                async  : true
                              }).done(
                                        function(productos)
                                            {
                                                var str  = '';
                                                for (var i = 0; i < productos.length; i++)
                                                    str += '<tr>' + 
                                                                  '<td>' + productos[i].id + '</td>' +
                                                                  '<td>' + productos[i].nombre + '</td>' +
                                                                  '<td>' + productos[i].marca + '</td>' +
                                                                  '<td>' + productos[i].precioUso + '</td>' +
                                                            '</tr>';
                                                    $('#tbProductos').html(str);
                                                    $('#tbProductos').find('tr').click(function()
                                                          {
                                                            //alert('Renglon: ' + $(this).index());
                                                            //alert(productos[$(this).index()].nombre);
                                                            //this == 'tr'
                                                            $('#txtIdProducto').val(productos[$(this).index()].id);
                                                            $('#txtNombreProducto').val(productos[$(this).index()].nombre);
                                                            $('#txtMarcaProducto').val(productos[$(this).index()].marca);
                                                            $('#txtPrecioUsoProducto').val(productos[$(this).index()].precioUso);
                                                            $('#divModalProductoDetalle').modal();
                                                            });
                                                    
                                            }
                                     );           
}
function guardarProducto(){
    
    var rutaREST = null;
    var idProducto = 0;
    
    if($('#txtIdProducto').val().length > 0){
        rutaREST = '../rsproducto/updateProducto';
        idProducto = $('#txtIdProducto').val();
    }else{
        rutaREST = '../rsproducto/insertProducto';
    }
    
    $.ajax({
            type : "POST",
            asyn : true,
            url : rutaREST,
            data :{
                    idProducto : idProducto,
                    nombre : $('#txtNombreProducto').val(),
                    marca : $('#txtMarcaProducto').val(),
                    precioUso : $('#txtPrecioUsoProducto').val(),
                    //estatus : $('#chbEstatusProducto').prop('checked') ? 1 : 0
                    }                        
            }).done(function (data)
                    {
                     if (data.error != null){
                         swal("Error", data.error, 'warning');
                         return;
                     }
                     actualizarTablaProductos();
                     $('#txtIdProducto').val(data.result);  
                     swal('Realizado', 'Hecho', 'success');
                     return;
                    }                                
                    );
}

function limpiarCampos(){
    $('#txtIdProducto').val('');
    $('#txtNombreProducto').val('');
    $('#txtMarcaProducto').val('');
    $('#txtPrecioUsoProducto').val('');
    $('#chbEstatusProducto').prop('checked', false);
}

//Cliente
function cargarModuloCliente(){
    $.ajax  (   
                {   type   :    "GET",
                    url    :   "cliente/catalogo.html",
                    async  :    true
                }
            ).done(
                    function(data){
                      $('#divMainContainer').html(data);  
                      $('#tbProductos').find('tr').click(function()
                                                          {
                                                            alert('Renglon: ' + $(this).index());
                                                            }                              
                                                            );
                        actualizarTablaClientes();
                        }
                    );
                   
                    
}

function actualizarTablaClientes(){
    $.ajax( {
                                type   : "GET",
                                url    : "../rscliente/getAllCliente",
                                async  : true
                              }).done(
                                        function(clientes)
                                            {
                                                var str  = '';
                                                for (var i = 0; i < clientes.length; i++)
                                                    str += '<tr>' + 
                                                                  '<td>' + clientes[i].id + '</td>' +
                                                                  '<td>' + clientes[i].persona.nombre +
                                                                  ' ' + clientes[i].persona.apellidoPaterno +
                                                                  ' ' + clientes[i].persona.apellidoMaterno + '</td>' +
                                                                  '<td>' + clientes[i].persona.genero + '</td>' +
                                                                  '<td>' + clientes[i].persona.domicilio + '</td>' +
                                                                  '<td>' + clientes[i].persona.telefono + '</td>' +
                                                                  '<td>' + clientes[i].persona.rfc + '</td>' +
                                                                  '<td>' + clientes[i].numeroUnico + '</td>' +
                                                                  '<td>' + clientes[i].correo + '</td>' +
                                                            '</tr>';
                                                    $('#tbClientes').html(str);
                                                    $('#tbClientes').find('tr').click(function()
                                                          {
                                                            $('#txtIdCliente').val(clientes[$(this).index()].id);
                                                            $('#txtIdUsuarioCliente').val(clientes[$(this).index()].usuario.id);
                                                            $('#txtIdPersonaCliente').val(clientes[$(this).index()].persona.id);
                                                            $('#txtNumeroUnicoCliente').val(clientes[$(this).index()].numeroUnico);
                                                            $('#txtNombreCliente').val(clientes[$(this).index()].persona.nombre);
                                                            $('#txtApellidoPaternoCliente').val(clientes[$(this).index()].persona.apellidoPaterno);
                                                            $('#txtApellidoMaternoCliente').val(clientes[$(this).index()].persona.apellidoMaterno);
                                                            $('#txtGeneroCliente').val(clientes[$(this).index()].persona.genero);
                                                            $('#txtDomicilioCliente').val(clientes[$(this).index()].persona.domicilio);
                                                            $('#txtTelefonoCliente').val(clientes[$(this).index()].persona.telefono);
                                                            $('#txtRFCCliente').val(clientes[$(this).index()].persona.rfc);
                                                            $('#txtCorreoCliente').val(clientes[$(this).index()].correo);
                                                            $('#txtNombreUsuarioCliente').val(clientes[$(this).index()].usuario.nombreUsuario);
                                                            $('#txtContraseniaCliente').val(clientes[$(this).index()].usuario.contrasenia);
                                                            $('#chbEstatusProducto').prop('checked', true);
                                                            $('#divModalClienteDetalle').modal();
                                                            }                              
                                                            );
                                            }
                                     );           
}
function guardarCliente(){
    
    var rutaREST = null;
    var idCliente = 0;
    var idPersona = 0;
    var idUsuario = 0;
    
    if($('#txtIdCliente').val().length > 0){
        rutaREST = '../rscliente/updateCliente';
        idCliente = $('#txtIdCliente').val();
        idUsuario = $('#txtIdUsuarioCliente').val();
        idPersona = $('#txtIdPersonaCliente').val();
    }else{
        rutaREST = '../rscliente/insertCliente';
    }
    
    $.ajax({
            type : "POST",
            asyn : true,
            url : rutaREST,
            data :{
                    idCliente : idCliente,
                    idUsuario : idUsuario,
                    idPersona : idPersona,
                    nombre : $('#txtNombreCliente').val(),
                    apellidoPaterno : $('#txtApellidoPaternoCliente').val(),
                    apellidoMaterno : $('#txtApellidoMaternoCliente').val(),
                    genero : $('#txtGeneroCliente').val(),
                    domicilio : $('#txtDomicilioCliente').val(),
                    telefono : $('#txtTelefonoCliente').val(),
                    rfc : $('#txtRFCCliente').val(),
                    correo : $('#txtCorreoCliente').val(),
                    nombreUsuario : $('#txtNombreUsuarioCliente').val(),
                    contrasenia : $('#txtContraseniaCliente').val(),
                    }                        
            }).done(function (data)
                    {
                     if (data.error != null){
                         swal("Error", data.error, 'warning');
                         return;
                     }
                     actualizarTablaClientes();
                     $('#txtIdCliente').val(data.id);
                     $('#txtIdUsuarioCliente').val(data.usuario.id);
                     $('#txtIdPersonaCliente').val(data.persona.id);
                     $('#txtNumeroUnicoCliente').val(data.numeroUnico);
                     swal('Realizado', 'Hecho', 'success');
                    }                                
                    );
}

function eliminarCliente(){
    
    var rutaREST = null;
    
    if($('#txtIdCliente').val().length > 0){
        rutaREST = '../rscliente/deleteCliente';
    }else{
        swal("Error", "no hay id", 'warning');
        return;
    }
    
    $.ajax({
            type : "POST",
            asyn : true,
            url : rutaREST,
            data :{
                    idCliente : $('#txtIdCliente').val()
                    }                        
            }).done(function (data)
                    {
                     if (data.error != null){
                         swal("Error", data.error, 'warning');
                         return;
                     }
                     actualizarTablaClientes();
                     swal('Realizado', 'Hecho', 'success');
                    }                                
                    );
}

function limpiarCamposCliente(){
    $('#txtIdCliente').val('');
    $('#txtNombreCliente').val('');
    $('#txtApellidoPaternoCliente').val('');
    $('#txtApellidoMaternoCliente').val('');
    $('#txtGeneroCliente').val('Genero');
    $('#txtDomicilioCliente').val('');
    $('#txtTelefonoCliente').val('');
    $('#txtRFCCliente').val('');
    $('#txtCorreoCliente').val('');
    $('#txtNombreUsuarioCliente').val('');
    $('#txtContraseniaCliente').val('');
    $('#txtIdUsuarioCliente').val('');
    $('#txtIdPersonaCliente').val('');
    $('#txtNumeroUnicoCliente').val('');
    $('#chbEstatusProducto').prop('checked', false);
    }
    
    function cargarModuloSala() {
    $.ajax(
            {type: "GET",
                url: "sala/catalogoSala.html",
                async: true
            }
    ).done(
            function (data) {
                $('#divMainContainer').html(data);
                $('#tbSalas').find('tr').click(function () {
                    alert('Renglon:' + $(this).index());
                });
                actualizarTablaSalas();
            }
    );
}
function actualizarTablaSalas() {
    $.ajax({
        type: "GET",
        url: "../rssala/getAllSala",
        async: true
    }).done(
            function (salas)
            {
                var str = '';
                for (var i = 0; i < salas.length; i++)
                    str += '<tr>' +
                            '<td>' + salas[i].id + '</td>' +
                            '<td>' + salas[i].nombre + '</td>' +
                            '<td>' + salas[i].descripcion + '</td>' +
                            '<td>' + salas[i].sucursal.nombre + '</td>' +
                            '</tr>';
                $('#tbSalas').html(str);
                $('#tbSalas').find('tr').click(function()
                                                          {
                                                            $('#txtSalaId').val(salas[$(this).index()].id);
                                                            $('#txtSalaNombre').val(salas[$(this).index()].nombre);
                                                            $('#txtSalaDescripcion').val(salas[$(this).index()].descripcion);
                                                            $('#imgSalaFoto').prop('src', 'data:image/png;base64, ' + salas[$(this).index()].foto);
                                                            }                              
                                                            );
            }
    );
}



function guardarSala() {
    var rutaREST = null;
    var idSala = 0;
    if ($('#txtSalaId').val().length > 0) {
        rutaREST = '../rssala/updateSala';
        idSala = $('#txtSalaId').val();
    } else {
        rutaREST = '../rssala/insertSala';
    }
    $.ajax({
        type: "POST",
        async: true,
        url: rutaREST,
        data: {
            id: idSala,
            nombre: $('#txtSalaNombre').val(),
            descripcion: $('#txtSalaDescripcion').val(),
            foto: $('#txtFoto').val(),
            rutaFoto: $('#txtrutaFoto').val(),
            idSucursal: $('#cmbSucursal').val(),
            // estatus:$('#chbSalaEstatus').prop('checked')?1:0
        }
    }).done(function (data) {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaSalas();
        $('#txtSalaId').val(data.result);
        swal('Movimiento realizado', '', 'success');
    });
}
function eliminarSala(){
//    var rutaREST=null;
//    var idSala=0;
//     if ($('#txtSalaId').val().length > 0) {
//        rutaREST = '../rssala/updateSala';
//        idSala = $('#txtSalaId').val();
//    } else {
//        rutaREST = '../rssala/deleteSala';
//    }
    $.ajax({
        type: "POST",
        async: true,
        url: "../rssala/deleteSala",
        data: {
            id:$('#txtSalaId').val() 
//            nombre: $('#txtSalaNombre').val(),
//            descripcion: $('#txtSalaDescripcion').val(),
//            foto: $('#txtFoto').val(),
//            rutaFoto: $('#txtrutaFoto').val(),
//            idSucursal: $('#cmbSucursal').val(),
            // estatus:$('#chbSalaEstatus').prop('checked')?1:0
        }
    }).done(function (data) {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaSalas();
        swal('Movimiento realizado', '', 'success');
    });
}
function actualizarSala(){
   
    $.ajax({
        type: "POST",
        async: true,
        url: "../rssala/updateSala",
        data: {
            id: $('#txtSalaId').val(),
            nombre: $('#txtSalaNombre').val(),
            descripcion: $('#txtSalaDescripcion').val(),
            foto: $('#txtFoto').val(),
            rutaFoto: $('#txtrutaFoto').val(),
            idSucursal: $('#cmbSucursal').val(),
          estatus:$('#chbSalaEstatus').prop('checked')?1:0
        }
    }).done(function (data) {
        if (data.error != null)
        {
            swal('Error', data.error, 'warning');
            return;
        }
        actualizarTablaSalas();

    swal('Movimiento realizado', '', 'success');
    });
} 
    
function limpiarCamposSala() {
    $('#txtSalaId').val('');
    $('#txtSalaNombre').val('');
    $('#txtSalaDescripcion').val('');
    $('#txtFoto').val('');
    $('#txtRutaFoto').val('');
    $('#chbSalaEstatus').prop('checked', false);
}