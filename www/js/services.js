angular.module('starter.services', [])
/*
.provider('offlinemap', function setOfflinemapsProvider() {
  
  
  
})*/
.service('pois', function($http, $q){
  
  var that = this;
  //https://a.tiles.mapbox.com/v4/brayser.cig0ypfno003wv2m61fy44k0n/features.json?access_token=pk.eyJ1IjoiYnJheXNlciIsImEiOiJjaWcweXBmd2gwMDN3djVraHY3c3R3dWJlIn0.LDYtiIP1pT6R8U6TYRJWYA
  this.data = $http.get('/js/features.json')
  //Service_methods

  this.getPOIs = function(){
    that.data.then(function(data){
      that.pois = data.data.features;
    });
    return that.pois;
  }
  this.getPOI = function(index){
    return 'hello';
  }
})
.service('routes', function(){
  //GETSAVE DATA ON LOCALSTORAGE??
  this.routes=[];
  that = this;
  this.setPoint = function(index, point){
    console.log(index,point, that);
    //bad index
    if(that.routes[index]==null){
      that.routes[index]=[];
    }
    that.routes[index].push(point);
    return that.routes[index].length;
  }
  this.deletePoint = function(index, point){

  } 
})
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
