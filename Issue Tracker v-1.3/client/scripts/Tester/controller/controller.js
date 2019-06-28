app.run(function(myfactory,$rootScope){
  console.log("hit to data base");
  var arr;
  let promise = myfactory.getIssue();
  promise.then(data=>{
      console.log(data.data.data);
      // console.log(data.data.data[0].img.data.data.toString() );
      var myarr = [];
       arr = data.data.data
      var myobj;
      for(let value of data.data.data){
        myobj = {
          rightId: value.rightId,
          projectName: value.projectName,
          title: value.title,
          assignTo: value.assignTo,
          bugSatus: value.bugSatus,
          
        }
        myarr.push(myobj);
      }
      $rootScope.users = myarr;
      
  
  },error=>{
       console.log(error);
  })

});
app.controller('testctrl',function($scope,$rootScope,Upload,$location,SweetAlert,myfactory){
   $scope.addbug = ()=>{

    console.log($scope.file);
    $scope.upload($scope.file);
      //  var data = {
      //   'projectName': $scope.projectname,
      //   'type': $scope.bugtype,
      //   'name':  $scope.username,
      //   'title': $scope.title,
      //   'description':  $scope.description,
      //   'photo': $scope.photourl,
      //   'assignTo': $scope.assignto,
      //   'reportingOfficer':  $scope.reportofficer
      //  }
      
      //  var pr = myfactory.addissue(data);

      //  pr.then(data=>{
      //   SweetAlert.swal("Added Issue", "Issue Added successfully 😃", "success");
      //     console.log("Essue is ",data);
      //  },error=>{
      //      console.log(error);
      //  })
   }

   $scope.upload = function (file) {
    Upload.upload({
        url: 'http://localhost:1234/uploadIssue',  // Server Side URL to Upload
        data: {
        'projectName': $scope.projectname,
        'type': $scope.bugtype,
        'name':  $scope.username,
        'title': $scope.title,
        'description':  $scope.description,
        'file': file,
        'assignTo': $scope.assignto,
        'reportingOfficer':  $scope.reportofficer,
        }
    }).then(function (resp) {
        // $scope.msg = resp['data']['msg'];
        SweetAlert.swal("Added Issue", "Issue Added successfully 😃", "success");
        console.log('Success ',resp.data);
        //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function (resp) {
        console.log('Error status: ' + resp.status);
    }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' );
    });
};


//    *******************************************************.


// ****************************************************************************
$scope.moreInfo = (bugid)=>{
    console.log(bugid); 
    localStorage.bugid = JSON.stringify(bugid);
    $location.path('/singlIssue', false);
}
$scope.run =()=>{
  var bug= JSON.parse(localStorage.bugid);
  // console.log("Iam running running.....",bugid);
  let promise = myfactory.getSingleIssue({bugid: bug});
  promise.then(data=>{
      console.log(data.data);
        $scope.bugID = data.data.data.rightId;
        $scope.url = data.data.img;
        $scope.title = data.data.data.title;
        $scope.desc =  data.data.data.description;
        $scope.projectName = data.data.data.projectName;
        $scope.Satus = data.data.data.bugSatus;
        $scope.type = data.data.data.type;
        $scope.assignTo = data.data.data.assignTo;
        $scope.reporting = data.data.data.reportingOfficer;
        

        

        
      },error=>{
        console.log("Error is",error);
      })
}

// ********************************************************************************



// *******************************************************


})


//https://stackoverflow.com/questions/53558684/multer-gridfs-storage-referencing-uploaded-file-to-a-new-collection