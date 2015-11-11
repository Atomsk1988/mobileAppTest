angular.module('starter.controllers', [])
.controller('compassCtrl', function($scope, $cordovaDeviceOrientation){
  console.log('baka');

  $scope.orientation = 360;
  $scope.direction=null;
  document.addEventListener("deviceready", function(){
    console.log('baka1');

    navigator.compass.watchHeading(onSuccess, onError);

    function onSuccess(heading) {

      var orientation = Math.floor(heading.magneticHeading/10)*10;
      $scope.$apply(function(){
        $scope.orientation = orientation;
      });
    }
    function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
      $scope.error = error.message;
       console.log(error.code);
    }
  });
})

.controller('DashCtrl', function($scope, pois,routes) {
  //https://a.tiles.mapbox.com/v4/brayser.cig0ypfno003wv2m61fy44k0n/features.json?access_token=pk.eyJ1IjoiYnJheXNlciIsImEiOiJjaWcweXBmd2gwMDN3djVraHY3c3R3dWJlIn0.LDYtiIP1pT6R8U6TYRJWYA
  $scope.poiservice = pois;
  pois.data.then(function(data){
      $scope.pois = data.data.features;
  });
  $scope.routes = routes;
  $scope.addToList = function(ind){
    $scope.routeId = pois.addToRoute($scope.pois[ind], $scope.routeId);
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
  /* -----*/
})

.controller('MapCtrl', function($scope) {
    //var map = L.map('map').setView([51.505, -0.09], 13);
    var layer = L.tileLayerCordova('https://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png', {
            // these options are perfectly ordinary L.TileLayer options
            maxZoom: 18,
            folder: 'bcndg',
            name:   'barcelona',
            debug:   true
        }, function() {
          updateStatus();
        }).addTo(MAP);
    } catch (e) {
        alert(e);
    }




    var layer = L.mapbox.map('map', 'brayser.cig0ypfno003wv2m61fy44k0n', {
    accessToken: 'pk.eyJ1IjoiYnJheXNlciIsImEiOiJjaWcweXBmd2gwMDN3djVraHY3c3R3dWJlIn0.LDYtiIP1pT6R8U6TYRJWYA',
    }).setView([41.399, 2.172], 16);
    layer.on('ready', function() {
      // the layer has been fully loaded now, and you can
      // call .getTileJSON and investigate its properties
      console.log('layer ready');
    });
    document.addEventListener("deviceready", function(){

    /* CUSTOM GPS pointer */
    L.GpsPointer = L.DivIcon.extend({
      options: {
        iconSize: [12, 12], // also can be set through CSS
        /*
        iconAnchor: (Point)
        popupAnchor: (Point)
        html: (String)
        bgPos: (Point)
        */
        className: 'leaflet-div-icon',
        html: false,
        id: null
      },
      createIcon: function (oldIcon) {
        var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
          options = this.options;
          if (options.html !== false) {
          div.innerHTML = options.html;
          } else {
            div.innerHTML = '';
          }
            if (options.bgPos) {
            div.style.backgroundPosition =
                    (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
          }
          this._setIconStyles(div, 'icon');
          div.id = options.id;
          this._elem = div;
          return div;
      },
      createShadow: function () {
        return null;
      }
    });

    L.gpsPointer = function (options) {
      return new L.GpsPointer(options);
    };
    $scope.gpsPointer = null;
    //LATLONG POSITION
    navigator.geolocation.watchPosition(onSuccessG, onErrorG);

    function onSuccessG(position) {
      /* ******************************************** */ 
      // Hacer que cree el icono solo si no existe
      /* ******************************************** */
        console.log('position');
        latlon = [position.coords.latitude , position.coords.longitude];
        if($scope.gpsPointer==null){
          var myIcon = L.gpsPointer(
            {
             className: 'direction',
             id: 'gpsPointer'
            }
          );
          $scope.gpsPointer = L.marker(latlon, {icon: myIcon}).addTo(layer);
        }
        $scope.gpsPointer.setLatLng(latlon);
        layer.panTo(latlon);
        navigator.compass.watchHeading(onSuccessH, onErrorH);

    }
    function onErrorG(error) {
      console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
      $scope.error = error.message;
    }
   
    //HEADING
    function onSuccessH(heading) {
      console.log($scope.gpsPointer.rotate);
      var orientation = Math.floor(heading.magneticHeading/10)*10;      
      document.getElementById('gpsPointer').style.transform='rotate('+orientation+'deg)';
    }
    function onErrorH(error) {
      alert('code: '    + error.code    + '\n' +
           'message: ' + error.message + '\n');
      $scope.error = error.message;
      console.log(error.code);
    }
});
});

