'use strict';
var app=angular.module('seedApp')
.controller('MainController', ['$scope','$filter','parametro','actividadEconomica','sucursal','usuario','tc','rubro','ciudad','plandecuenta','ingresoproducto','trabajador','departamento','cargo','upload',
  //lista los productos

  function($scope,$filter,parametro,actividadEconomica,sucursal,usuario,tc,rubro,ciudad,plandecuenta,ingresoproducto,trabajador,departamento,cargo,upload) {
	var dir="./public/img/";
  //PARAMETRO
    $scope.parametros = [];
    parametro.get({}, function(response) {
    $scope.parametros = response;
    });
    $scope.parametros = {};

    // Modifica  Parametro
  $scope.parametro_modifica = function(parametro,id_parametro) {
    $scope.parametro=parametro;
    $scope.parametro.fecha_vencimiento=$filter('date')(parametro.fecha_vencimiento,'yyyy-MM-dd');
    $scope.parametro.logotipo=parametro.logotipo;
    $scope.parametro.$update({'id_parametro':$scope.parametro.id_parametro}, function(response){});
    console.log($scope.parametro.fecha_vencimiento);
  }
  //ACTIVIDAD ECONOMICA
    $scope.actividadEconomicas = [];
    actividadEconomica.get({}, function(response) {
    $scope.actividadEconomicas = response;
    });
    $scope.actividadEconomicas = {};

  $scope.saveactividadEconomica = function(item) {    
    actividadEconomica.save(item, function(response) {
    $scope.actividadEconomicas.push(response);
    });
  }
  $scope.deleteactividadEconomica = function (actividadEconomica,index) {
    actividadEconomica.$delete({"id_actividadEconomica": actividadEconomica.id_actividadEconomica}, function (success) {
    $scope.actividadEconomicas.splice($scope.actividadEconomicas.indexOf(actividadEconomica),1);
    });
  }
//Sucursal
    $scope.sucursals = [];
    sucursal.get({}, function(response) {
    $scope.sucursals = response;
    });
    $scope.sucursals = {};
 //


  $scope.savesucursal = function(item) {
    item.fecha_limite_emision = $filter('date')(item.fecha_limite_emision,'yyyy-MM-dd');
    item.fecha_limite_emision_manual = $filter('date')(item.fecha_limite_emision_manual,'yyyy-MM-dd');
    console.log($scope.sucursal.fecha_limite_emision);
    sucursal.save(item, function(response) {
    $scope.sucursals.push(response);
    });
  }
  $scope.deletesucursal = function (sucursal,index) {
    sucursal.$delete({"id_sucursal": sucursal.id_sucursal}, function (success) {
    $scope.sucursals.splice(index, 1);
    });
  }
  $scope.sucursal_modal = function(sucursal) {
    console.log(sucursal);
    $scope.sucursal =sucursal
  }
  $scope.sucursal_modifica = function(sucursal,id_sucursal) {
    console.log("modif");
    $scope.sucursal.$update({'id_sucursal':$scope.sucursal.id_sucursal}, function(response){});
  }

  //USUARIO
    $scope.usuarios = [];
    usuario.get({}, function(response) {
    $scope.usuarios = response;
    });
    $scope.usuarios = {};

  $scope.saveusuario = function(item) {
    var name = $scope.name;
    var file = $scope.file;
    upload.saveImage(file).then(function(res)
    {})
    item.logotipo=dir+file.name;
    item.fecha_creacion = $filter('date')(new Date(),'yyyy-MM-dd');
    usuario.save(item, function(response) {
    $scope.usuarios.push(response);
    $scope.usuario={};
    });
  }
  $scope.deleteusuario = function (usuario,index) {
    usuario.$delete({"id_usuario": usuario.id_usuario}, function (success) {
    $scope.usuarios.splice(index, 1);
    });
  }
  $scope.usuario_modal = function(usuario) {
    $scope.usuario =usuario
  }
  $scope.usuario_modifica = function(usuario,id_usuario) {
    //console.log("modifica");
    try {
      var name = $scope.name;
      var file = $scope.file;
      upload.saveImage(file).then(function(res)
      {})
      usuario.logotipo=dir+file.name;
      $scope.usuario.$update({'id_usuario':$scope.usuario.id_usuario}, function(response){});
    }
    catch(e) {
      console.log("ERROR");
      $scope.usuario.$update({'id_usuario':$scope.usuario.id_usuario}, function(response){});
    } 
  }
  //Tasa De Cambio
  $scope.tcs = [];
  tc.get({}, function(response) {
  $scope.tcs = response;
  });
  $scope.tcs = {};

  $scope.tc_modifica = function(tc,id_tc) {
    $scope.tc=tc;
    $scope.tc.$update({'id_tc':$scope.tc.id_tc}, function(response){});
  }

  $scope.savetc = function(item) {
    console.log("guarda");
    console.log(item);
    tc.save(item, function(response) {
    $scope.tcs.push(response);
    });
  }
  $scope.deletetc = function (tc,index) {
    tc.$delete({"id_tc": tc.id_tc}, function (success) {
    $scope.tc.splice(index, 1);
    });
  }
  //RUBRO
  $scope.rubros = [];
  rubro.get({}, function(response) {
    $scope.rubros = response;
  });
  $scope.rubros = {};

  $scope.rubro_modifica = function(rubro,id_rubro) {
    $scope.rubro=rubro;
    $scope.rubro.$update({'id_rubro':$scope.rubro.id_rubro}, function(response){});
  }

  $scope.saverubro = function(item) {
    rubro.save(item, function(response) {
    $scope.rubros.push(response);
    });
  }
  $scope.deleterubro = function (rubro,index) {
    rubro.$delete({"id_rubro": rubro.id_rubro}, function (success) {
    $scope.rubro.splice(index, 1);
    });
  }
  //CIUDAD
    $scope.ciudads = [];
    ciudad.get({}, function(response) {
    $scope.ciudads = response;
    });
    $scope.ciudads = {};
       

    
    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1
    };

    $scope.formats = ['yyyy-MM-dd'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['yyyy-M!-d!'];

    $scope.popup1 = {
      opened: false
    };
    // date final

    // inicio tabpanel
    $scope.activeTab = 1;
    $scope.setActiveTab = function(tabToSet) {
    $scope.activeTab = tabToSet;
    }
    // fin tabpanel

    // inicio subtabpanel
    $scope.SubactiveTab = 1;
    $scope.setSubActiveTab = function(tabToSet1) {
    $scope.SubactiveTab = tabToSet1;
    }
    // fin subtabpanel
        
    $scope.getById = function(id) {
        var result = null;
        $scope.comunicados.forEach(function(comunicados) {
            if (comunicados.id == id) {
                result = comunicados;
            }
        });
        return result;
    }

   $scope.loadItem = function(id) {
      $scope.comunicados = $scope.getById(id_comunicados);
   }

    $scope.saveNoticia = function(item) {
    $scope.noticias = response;
  }


  //PLAN DE CUENTA
  $scope.plandecuentas = [];
  plandecuenta.get({}, function(response) {
  $scope.plandecuentas = response;
  //console.log($scope.plandecuenta.cuenta);
  });
  $scope.plandecuentas = {};


  $scope.saveplandecuenta = function(item) {
    plandecuenta.save(item, function(response) {
    $scope.plandecuentas.push(response);
    });
  }
  $scope.deleteplandecuenta = function (plandecuenta,index) {
    plandecuenta.$delete({"id_plandecuenta": plandecuenta.id_plandecuenta}, function (success) {
    $scope.plandecuenta.splice(index, 1);
    });
  }


//INGRESO DE PRODUCTO
  $scope.ingresoproductos = [];
  ingresoproducto.get({}, function(response) {
  $scope.ingresoproductos = response;
  //console.log($scope.ingresoproducto.cuenta);
  });
  $scope.ingresoproductos = {};


  $scope.saveingresoproducto = function(item) {
    ingresoproducto.save(item, function(response) {
    $scope.ingresoproductos.push(response);
    });
  }
  $scope.deleteingresoproducto = function (ingresoproducto,index) {
    ingresoproducto.$delete({"id_ingresoproducto": ingresoproducto.id_ingresoproducto}, function (success) {
    $scope.ingresoproducto.splice(index, 1);
    });
  }


// RRHH TRABAJADOR
    $scope.trabajadors = [];
    trabajador.get({}, function(response) {
    $scope.trabajadors = response;
    });
    $scope.trabajadors = {};

    $scope.savetrabajador = function(item) {
      console.log(item);
      trabajador.save(item, function(response) {
      $scope.trabajadors.push(response);
      console.log(response);
      });
    }
    $scope.deletetrabajador = function (trabajador,idx) {
    trabajador.$delete({ "id_trabajador": trabajador.id_trabajador}, function (success) {
    $scope.trabajadors.splice(idx, 1);
    });
    }
    $scope.trabajador_modal = function(trabajador) {
      console.log(trabajador);
      $scope.trabajador =trabajador
    }
    $scope.trabajador_modifica = function(trabajador,id_trabajadors) {
      $scope.trabajador.$update({'id_trabajadors':$scope.trabajador.id_trabajadors}, function(response){});
    }
    // RRHH departamento
    $scope.departamentos = [];
    departamento.get({}, function(response) {
    $scope.departamentos = response;
    });
    $scope.departamentos = {};  

  $scope.savedepartamento = function(item) {
    departamento.save(item, function(response) {
    $scope.departamentos.push(response);
    });
  }
    //departamento
    $scope.deletedepartamento = function (departamento,idx) {
    departamento.$delete({ "id_departamento": departamento.id_departamento}, function (success) {
    $scope.departamentos.splice(idx, 1);
    });
    }

    $scope.departamento_modal = function(departamento) {
      console.log(departamento);
      $scope.departamento =departamento
    }
    $scope.departamento_modifica = function(departamento,id_departamento) {
      $scope.departamento.$update({'id_departamento':$scope.departamento.id_departamento}, function(response){});
    }
  // RRHH cargo
    $scope.cargos = [];
    cargo.get({}, function(response) {
    $scope.cargos = response;
    });
    $scope.cargos = {};  

  $scope.savecargo = function(item) {
    cargo.save(item, function(response) {
    $scope.cargos.push(response);
    });
  }
    //cargo
    $scope.deletecargo = function (cargo,idx) {
    cargo.$delete({ "id_cargo": cargo.id_cargo}, function (success) {
    $scope.cargos.splice(idx, 1);
    });
    }

    $scope.cargo_modal = function(cargo) {
      $scope.cargo =cargo
    }

    $scope.cargo_modifica = function(cargo,id_cargo) {
      $scope.cargo.$update({'id_cargo':$scope.cargo.id_cargo}, function(response){});
    }

   

  }
])
.directive('uploaderModel', ["$parse", function ($parse) {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) 
		{
			iElement.on("change", function(e)
			{
				$parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
			});
		}
	};
}])

.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}])
.service('upload', ["$http", "$q", function ($http, $q) 
{
	this.saveImage = function(file, name)
	{
		var deferred = $q.defer();
		var formData = new FormData();
		formData.append("name", name);
		formData.append("file", file);
		return $http.post("./upload.php", formData, {
			headers: {
				"Content-type": undefined
			},
			transformRequest: angular.identity
		})
		.success(function(res)
		{
			deferred.resolve(res);
		})
		.error(function(msg, code)
		{
			deferred.reject(msg);
		})
		return deferred.promise;
	}	
}]);