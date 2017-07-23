 var app = angular.module('BudgetApp', ['ngRoute','ngAnimate','ui.bootstrap','firebase']);

var fb = null;

fb = new Firebase("https://resourcemantra-35118.firebaseio.com");

console.log(fb);

app.controller('MainController', ['users','$scope', function (users,$scope) {
    //var vm = this;
    $scope.vm=this;
    users.get(function (data) {
        $scope.vm.users = data;
    });
}]);
app.factory('users', ['$http', function ($http) {
    return {
        get: function (callback) {
            $http.get('https://api.myjson.com/bins/6gbb7').success(function (data) {
                callback( data);
            })
        }
    }
}]);

app.controller("CreateCtrl" ,['$scope'  ,'$firebaseArray' , function($scope,$firebaseArray){

    var ref = new Firebase("https://resourcemantra-35118.firebaseio.com");
    var sync= $firebaseArray(ref);
    console.log('CreateCtrl');
    $scope.texts=sync;
     $scope.addproject = function(text) {
         $scope.texts.$add({
            Title:text.Title,
            workers:text.workers,
            position:text.position,
            date:text.date,
            priority:text.priority
        });
                text.Title="";
                text.workers = "";
                text.position="";
                text.date="";
                text.priority="";
          alert("New Project Succesfully added!!");
    }
    $scope.deleteThread=function(text){
        $scope.texts.splice(text,1);
    }
    
}]);

app.controller('DashboardCtrl', ['$scope','$http','$route','$location', function($scope,$http ,$route,$location){
    
  $scope.sitedata = [{"Name":"C Jo,Mathole(MC)","Position":"Artisan: Electro Mechanic (U/G)","Medical Date":"08/10/2010","Medical Expiry Date":"07/10/2011","ZONE":"THUB_Z01","SITE":1,"TIME":"7:17:20"},
{"Name":"Gerrie,Oosthuizen(GJ)","Position":"Princ Practitioner Learning: Mining","Medical Date":"30/05/2011","Medical Expiry Date":"29/05/2012","ZONE":"THUB_Z01","SITE":1,"TIME":"7:18:39"},
{"Name":"Lucky,Nhleko(LZ)","Position":"Operator: LHD","Medical Date":"07/11/2011","Medical Expiry Date":"06/11/2012","ZONE":"THUB_Z01","SITE":1,"TIME":"7:23:12"},
{"Name":"Adriaan,Vermeulen(AED)","Position":"General Worker","Medical Date":"18/06/2012","Medical Expiry Date":"17/06/2013","ZONE":"THUB_Z01","SITE":1,"TIME":"7:24:25"},
{"Name":"Fonqo,Ndlumba(F)","Position":"Operator: Roofbolt","Medical Date":"01/10/2012","Medical Expiry Date":"30/09/2013","ZONE":"THUB_Z01","SITE":1,"TIME":"7:25:11"},
{"Name":"Derek,Ferreira(DT)","Position":"Lead Operator: Controlroom","Medical Date":"28/11/2012","Medical Expiry Date":"27/11/2013","ZONE":"THUB_Z01","SITE":1,"TIME":"7:25:49"},
{"Name":"Naomi,Theletsane(MN)","Position":"General Worker","Medical Date":"03/12/2012","Medical Expiry Date":"02/12/2013","ZONE":"THUB_Z01","SITE":1,"TIME":"7:27:43"},
{"Name":"Lucky,Zulu(ME)","Position":"Foreman","Medical Date":"07/01/2013","Medical Expiry Date":"06/01/2014","ZONE":"THUB_Z01","SITE":1,"TIME":"7:28:12"},
{"Name":"Johan,Stone(JM)","Position":"Artisan: Electro Mechanic","Medical Date":"08/01/2013","Medical Expiry Date":"07/01/2014","ZONE":"THUB_Z01","SITE":1,"TIME":"7:28:36"},
{"Name":"Mantombi,Mpatlanyane(SN)","Position":"Operator: Roofbolt","Medical Date":"16/01/2013","Medical Expiry Date":"15/01/2014","ZONE":"THUB_Z01","SITE":1,"TIME":"7:32:22"},
{"Name":"Bongani,Kgomo(BM)","Position":"Union Representative (FTSS)","Medical Date":"11/03/2013","Medical Expiry Date":"10/03/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"7:34:03"},
{"Name":"Amos,Siyo(AT)","Position":"Operator: Shuttlecar","Medical Date":"18/03/2013","Medical Expiry Date":"17/03/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"7:38:26"},
{"Name":"Albert,Mbikwa(MA)","Position":"General Worker","Medical Date":"20/05/2013","Medical Expiry Date":"19/05/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"7:52:35"},
{"Name":"Siyathemba,Ndyebo(S)","Position":"Operator: Tractor","Medical Date":"29/07/2013","Medical Expiry Date":"28/07/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"7:59:34"},
{"Name":"Mzwandile,Ndwandwe(MI)","Position":"General Worker","Medical Date":"01/08/2013","Medical Expiry Date":"31/07/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"8:03:21"},
{"Name":"Alfredo,Macuacua(AA)","Position":"Operator: Roofbolt","Medical Date":"12/08/2013","Medical Expiry Date":"11/08/2014","ZONE":"SYF_Z01","SITE":2,"TIME":"8:11:02"},
{"Name":"Isaac,Molefe(IM)","Position":"Operator: Tractor","Medical Date":"19/08/2013","Medical Expiry Date":"18/08/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"8:11:49"},
{"Name":"Kholisile,Xhegwana(E)","Position":"Snr Operator: Controlroom","Medical Date":"22/08/2013","Medical Expiry Date":"21/08/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"8:17:19"},
{"Name":"Patrick,Letsoisa(PM)","Position":"Operator: LHD","Medical Date":"28/10/2013","Medical Expiry Date":"27/10/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"8:19:29"},
{"Name":"Mawisa,Mathebula(WC)","Position":"General Worker","Medical Date":"04/12/2013","Medical Expiry Date":"03/12/2014","ZONE":"SIM_Z01","SITE":2,"TIME":"8:21:37"},
{"Name":"Solomon,Mahlangu(SJ)","Position":"Operator: Shuttlecar","Medical Date":"18/12/2013","Medical Expiry Date":"17/12/2014","ZONE":"BR2E_Z01","SITE":3,"TIME":"8:30:03"},
{"Name":"Lewis,Tshabangu(ML)","Position":"Princ Operator:","Medical Date":"06/01/2014","Medical Expiry Date":"05/01/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"8:31:39"},
{"Name":"Mamphaki,Tshwale(M)","Position":"EIT","Medical Date":"06/01/2014","Medical Expiry Date":"05/01/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"8:45:27"},
{"Name":"Meme,Mahlangu(M)","Position":"Operator: Roofbolt","Medical Date":"31/01/2014","Medical Expiry Date":"30/01/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:27:00"},
{"Name":",Lubisi(AM)","Position":"Operator: Roofbolt","Medical Date":"06/02/2014","Medical Expiry Date":"05/02/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:30:34"},
{"Name":"Thabiso,Sedidi(TG)","Position":"Operator: Roofbolt","Medical Date":"19/02/2014","Medical Expiry Date":"18/02/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:31:13"},
{"Name":"Funekile,Mayekiso(F)","Position":"Snr Operator:","Medical Date":"25/02/2014","Medical Expiry Date":"24/02/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:35:39"},
{"Name":"Piet,Belebese(PM)","Position":"Princ Operator: Maintenance","Medical Date":"30/04/2014","Medical Expiry Date":"29/04/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:42:56"},
{"Name":"Simon,Tshabalala(SMM)","Position":"Operator: Roofbolt","Medical Date":"27/05/2014","Medical Expiry Date":"26/05/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:50:43"},
{"Name":"Connie,Kgoedi(CDL)","Position":"Learner: Miner","Medical Date":"29/05/2014","Medical Expiry Date":"28/05/2015","ZONE":"BR2E_Z01","SITE":3,"TIME":"9:55:32"},
{"Name":"Malusi,Ntlantlu(MD)","Position":"Operator: Roofbolt","Medical Date":"19/06/2014","Medical Expiry Date":"18/06/2015","ZONE":"EXP_Z01","SITE":6,"TIME":"10:13:20"},
{"Name":"Patrick,Thombeni(P)","Position":"Learner Artisan: Electro Mechanic","Medical Date":"02/07/2014","Medical Expiry Date":"01/07/2015","ZONE":"EXP_Z01","SITE":6,"TIME":"10:28:14"},
{"Name":"Jumandie,Erasmus(J)","Position":"General Worker","Medical Date":"11/08/2014","Medical Expiry Date":"10/08/2015","ZONE":"EXP_Z02","SITE":6,"TIME":"10:32:42"},
{"Name":"Paul,Mposula(TP)","Position":"Learner Artisan: Electro Mechanic","Medical Date":"12/08/2014","Medical Expiry Date":"11/08/2015","ZONE":"EXP_Z01","SITE":6,"TIME":"10:34:31"},
{"Name":"Jacques,Kotze(J)","Position":"Foreman","Medical Date":"13/08/2014","Medical Expiry Date":"12/08/2015","ZONE":"EXP_Z02","SITE":6,"TIME":"10:39:51"},
{"Name":"BERNARDO,Massinga(B)","Position":"Snr Operator:","Medical Date":"14/08/2014","Medical Expiry Date":"13/08/2015","ZONE":"EXP_Z02","SITE":6,"TIME":"10:52:16"},
{"Name":"Israel,Ndwandwe(NI)","Position":"Operator: Roofbolt","Medical Date":"25/08/2014","Medical Expiry Date":"24/08/2015","ZONE":"EXP_Z02","SITE":6,"TIME":"10:56:44"},
{"Name":"Thuli,Shabangu(TS)","Position":"General Worker","Medical Date":"26/08/2014","Medical Expiry Date":"25/08/2015","ZONE":"EXP_Z01","SITE":6,"TIME":"10:57:28"},
{"Name":"Johannes,Mofolo(TJ)","Position":"Operator: Shuttlecar","Medical Date":"04/09/2014","Medical Expiry Date":"03/09/2015","ZONE":"EXP_Z01","SITE":6,"TIME":"10:59:34"},
{"Name":"Mnguni,Manzini(SM)","Position":"Operator: Satlab","Medical Date":"18/09/2014","Medical Expiry Date":"17/09/2015","ZONE":"MIDM_Z01","SITE":11,"TIME":"11:00:56"},
{"Name":"Amelia,Goosen(AHL)","Position":"Operator: Plant","Medical Date":"22/09/2014","Medical Expiry Date":"21/09/2015","ZONE":"MIDM_Z01","SITE":11,"TIME":"11:03:59"},
{"Name":"Walter,Mnisi(MW)","Position":"Operator:","Medical Date":"23/09/2014","Medical Expiry Date":"22/09/2015","ZONE":"MIDM_Z01","SITE":11,"TIME":"11:48:20"},
{"Name":"Sydney,Nkosi(SM)","Position":"Operator: Roofbolt","Medical Date":"23/09/2014","Medical Expiry Date":"22/09/2015","ZONE":"MIDM_Z01","SITE":11,"TIME":"11:56:37"},
{"Name":"Henry,Venter(HC)","Position":"Learner Artisan: Electro Mechanic","Medical Date":"30/09/2014","Medical Expiry Date":"29/09/2015","ZONE":"MIDM_Z02","SITE":11,"TIME":"11:57:52"},
{"Name":"Ben,Marweshe(BM)","Position":"Operator: Tractor","Medical Date":"01/10/2014","Medical Expiry Date":"30/09/2015","ZONE":"MIDM_Z01","SITE":11,"TIME":"11:59:34"},
{"Name":"Buti,Nophotho(B)","Position":"Operator: Jackhammer","Medical Date":"02/10/2014","Medical Expiry Date":"01/10/2015","ZONE":"MIDM_Z02","SITE":11,"TIME":"12:05:58"},
{"Name":"Mokete,Tsotetsi(SM)","Position":"Operator: Maintenance","Medical Date":"02/10/2014","Medical Expiry Date":"01/10/2015","ZONE":"MIDM_Z02","SITE":11,"TIME":"12:07:21"},
{"Name":"Fumaneka,Magawu(WF)","Position":"Snr Operator: Maintenance","Medical Date":"23/10/2014","Medical Expiry Date":"22/10/2015","ZONE":"MIDM_Z02","SITE":11,"TIME":"12:10:59"}];  
  $scope.MedicalDatefrom = "" ;
  MedicalDatefrom = "07/10/2010";
  $scope.MedicalDateto = "" ;
  MedicalDateto="02/02/2015"; 
  
  $scope.MedicalExpiryfrom = "" ;
  MedicalExpiryfrom ="06/10/2011";
  $scope.MedicalExpiryto = "" ;
  MedicalExpiryto = "01/02/2017"

  $scope.dateCheck = "";
  $scope.d1 = '';
  $scope.d2 = '';
  $scope.d3 = '';
  $scope.d4 = '';
      d1 = MedicalDatefrom.toString().split("/");
      d2 = MedicalDateto.toString().split("/");
      d3 = MedicalExpiryfrom.toString().split("/");
      d4 = MedicalExpiryto.toString().split("/");

      $scope.c = '';

      $scope.Medicalfrom = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
      $scope.Medicalto   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
      $scope.Expiryfrom = new Date(d3[2], parseInt(d3[1])-1, d3[0]);  // -1 because months are from 0 to 11
      $scope.Expiryto   = new Date(d4[2], parseInt(d4[1])-1, d4[0]);

  for(var i=0 ;i<=$scope.sitedata.length;i++){
    dateCheck = $scope.sitedata[i]['Medical Date'];
    c = dateCheck.toString().split("/");
    $scope.check = new Date(c[2], parseInt(c[1])-1, c[0]);

      if( ($scope.sitedata[i].Position == "General Worker") && ($scope.sitedata[i].SITE == 1) && ($scope.check >= $scope.Medicalfrom && $scope.check <= $scope.Medicalto) && ($scope.check >= $scope.Expiryfrom && $scope.check <= $scope.Expiryto)){
                  //$scope.see = $scope.sitedata[i]['Name & Surname'];
                  console.log($scope.sitedata[i]['TIME']);
                  console.log($scope.sitedata[i].Name);
                  if($scope.sitedata[i]['TIME'] < $scope.sitedata[i+1]['TIME']){
                        console.log("Time 1 is earlier than Time 2 , so worker 1 allocated");
                  }else{
                        console.log("Time 2 is earlier than time 1 , so worker 2 allocated");
                  }
      }
  }    
     
}]);