var app=angular.module("User_Module",['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.
    when('/home',{
       templateUrl:'../../User_View_Pages/home.html',
       controller:'Home_Page'
    }).
    when('/login_page',{
       templateUrl:"../../User_View_Pages/login_page.html",
       controller:'login_page'
    }).
    when('/register',{
        templateUrl:"../../User_View_Pages/register.html",
        controller:'register_page'
    }).
    when('/feedback',{
        templateUrl:"../../User_View_Pages/reviewform.html",
        controller:"feedbackform_page"
    }).
    when('/moreReview',{
         templateUrl:"../../User_View_Pages/moreReviewPage.html",
         controller:"moreReviewController"
    }).
    when('/UserProfile',{
      templateUrl:"../../User_View_Pages/UserProfilePage.html",
      controller:"UserProfileCon"
    }).
    when('/Profile',{
          templateUrl:"../../User_View_Pages/Profile.html",
          controller:"ProfileCon"
    }).
    when('/editProfile',{
      templateUrl:"../../User_View_Pages/EditProfile.html",
      controller:"editProfileCon"
    }).
    when('/mainCtr',{
      templateUrl:"../../Index Page/index.html",
      controller:"main_controller"
    }).
    when('/viewPost',{
      templateUrl:"../../User_View_Pages/viewPost.html",
      controller:'viewPost_Ctr'
    }).
    when('/see_review',{
       templateUrl:'../../User_View_Pages/See_Reviews_Product_Name.html',
       controller:'see_reviews_p_name_con'
    }).
    otherwise({
        templateUrl:'../../User_View_Pages/home.html',
        controller:'Home_Page'
    })
}]);
app.service('angularService',function($http,$rootScope){
  //Encapsulation Setter and Getter to pass the data from one controller to another
  this.temdata;
  this.SendData=function(d){
    this.temdata=d;
  }
  this.GetData=function(){
    return this.temdata;
  }
  //Register user
  this.insertUserData= function(data){
    return $http.
    post('http://localhost:4000/api/user-regis-list/insert',JSON.stringify(data));
  }
      //Login User
      this.loginUserByEmailandPass=function(em,password)
      {
          return $http.get('http://localhost:4000/api/user-regis-list/logindata/email/'+em+'/pass/'+password);
      }
      //user List By Email
      this.getUserRegisListByEmail=function(em){
          return $http.get('http://localhost:4000/api/user-regis-list/email/'+em);
      }
      //user List By Name
      this.getUserRegisListByName=function(nm){
        return $http.get('http://localhost:4000/api/user-regis-list/name/'+nm);
      }
      //save user review
      this.saveUserReview=function(data){
        return $http.post('http://localhost:4000/api/review/savereview',JSON.stringify(data));
      }
      //update User Details
      this.updateUserBy_ID=function(id,data){
        return $http.put('http://localhost:4000/api/user-regis-list/updateUser/id/'+id,JSON.stringify(data));
      }
      //change Password
      this.ChangePasswordby_ID=function(id,ob){
        return $http.put('http://localhost:4000/api/user-regis-list/ChangeUserPass/id/'+id,JSON.stringify(ob));
      }
      //Review 
      this.getReviewby_ID=function(id){
        return $http.get('http://localhost:4000/api/review/getreview/id/'+id)
      }
      //Review Count
      this.getReviewCountby_ID=function(id){
        return $http.get("http://localhost:4000/api/review/getReviewCount/id/"+id);
      }
      //saveImage
      this.saveImage=function(id){
        return $http.put('http://localhost:4000/api/user-regis-list/saveImage/id/'+id)
      }
      //RandomUserDetails
      this.RandomUser=function(){
           return $http.get('http://localhost:4000/api/user-regis-list/randomUser');
      }
      //Random_Users_Details
      this.Random_Users=function(id){
        return $http.get('http://localhost:4000/api/user-regis-list/random_Users/id/'+id);
   }
   //Delete user
   this.DeleteUser_By_ID=function(id){
    return $http.get('http://localhost:4000/api/user-regis-list/deleteUser/id/'+id);
   }
   //getReviewBy_R_ID
   this.getReview_By_R_ID=function(id){
    return $http.get('http://localhost:4000/api/review/getreviewbyR_ID/'+id);
   }
   //saveImage
   this.saveImage=function(data){
    return $http.post('http://localhost:4000/api/user-regis-list/saveImage',JSON.stringify(data))
   }
    //ImagePath
      this.getProfileImage=function(ob,data){
        return $http.put('http://localhost:4000/api/user-regis-list/uploadPath/id/'+ob,JSON.stringify(data));
      }
      //Get review
      this.GetReview=function(){
        return $http.get('http://localhost:4000/api/review/get')
      }
   //Get Revie By Product Name
   this.GetReview_by_P_Name=function(p){
    return $http.get('http://localhost:4000/api/review//review/p_name/'+p);
   }
   //Get user by id
   this.GetUser_By_ID=function(id){
    return $http.get('http://localhost:4000/api/user-regis-list/id/'+id);
   }
   //Get Comments BY Rid
   this.GetCommentByR_ID=function(id){
    return $http.get('http://localhost:4000/api/comment/review_id/'+id);
   }
   //save Comment
   this.saveComment=function(data){
    return $http.post('http://localhost:4000/api/comment/saveComment',JSON.stringify(data));
   }
})
app.factory('SessionStore',['$rootScope',function($rootScope){
  return{
    get:function(key){
      return sessionStorage.getItem(key);
    },
    save:function(key,data){
      sessionStorage.setItem(key,data);
    }
  };
}]);
app.controller("Home_Page",function($scope,angularService,SessionStore,$window){
  $scope.co=true;
   $scope.liked=true;
    $scope.sbs=false;
    $scope.unsbs=true;
    $scope.likebtn=function(){
      $scope.like=true;
      $scope.liked=false;
    }
    $scope.unlikebtn=function(){
      $scope.like=false;
      $scope.liked=true;
    }
    $scope.Subs=function(){
        $scope.unsbs=false;
        $scope.sbs=true;
    }
    $scope.UnSubs=function(){
        $scope.unsbs=true;
        $scope.sbs=false;
    }
     $scope.log=SessionStore.get("user-email");
     $scope.CheckLogin=function(data){
      if($scope.log==null || $scope.log==""){
        $window.location.href="../../Index Page/index.html#!/login_page";
        alert("First Login Yourself");
      }else{
        $window.location.href="../../Index Page/index.html#!/feedback";
      }
     }
     $scope.Randomuser=function(){
      $scope.uid=SessionStore.get("user-id");
      angularService.GetReview().then(function(response){
        if(response.data.Message=="Success"){
          $scope.getReview=response.data.Review;
          $scope.See_Review=function(index){
            $scope.rid=response.data.Review[index].R_ID;
            angularService.SendData($scope.rid);
            $window.location.href="../../Index Page/index.html#!/see_review"
           }
        }
        else{
          alert("Unsuccessful");
        }
      })
      angularService.RandomUser().then(function(response){
           if(response.data.Message=="Success"){
               if($scope.uid!=response.data.RandomResponse[0].U_ID){
                     $scope.ran_uname=response.data.RandomResponse[0].U_Name;
                     $scope.ran_uimage=response.data.RandomResponse[0].U_Image; 
                     angularService.getReviewby_ID(response.data.RandomResponse[0].U_ID).then(function(response){
                      if(response.data.Message=="Success"){
                        //alert("success");
                        $scope.review=response.data.ReviewResponse[0].TextReview;
                        $scope.pn=response.data.ReviewResponse[0].Product_Name;
                        $scope.rt=response.data.ReviewResponse[0].Review_Title;
                        $scope.review_id=response.data.ReviewResponse[0].R_ID;
                        $scope.i1=response.data.ReviewResponse[0].im1;
                        $scope.i2=response.data.ReviewResponse[0].im2;
                        $scope.i3=response.data.ReviewResponse[0].im3;
                        $scope.i4=response.data.ReviewResponse[0].im4;
                        $scope.i5=response.data.ReviewResponse[0].im5;
                        $scope.i6=response.data.ReviewResponse[0].im6;
                        $scope.buy=response.data.ReviewResponse[0].buy_now;
                      }
                      else{
                        alert('no');
                      }
                     })
               }else{
                   $scope.Randomuser();
               }
           }else{
            alert("Error")
           }
      })
     };$scope.Randomuser(); 
     $scope.Comment=function(){
      angularService.GetCommentByR_ID($scope.review_id).then(function(response){
        if(response.data.Message=="Success"){
          if(response.data.UserComent==null || response.data.UserComent==""){
            $scope.co=false;
            $scope.nocomm="No Comments Available";
          }
          else{
            $scope.comm=response.data.UserComent;
          }
          console.log($scope.comm);
        }
      })
     }
     $scope.SaveComment=function(){
      var a={
          comm:$scope.u_comment,
          user_id:$scope.uid,
          review_id:$scope.review_id
      }
      angularService.saveComment(a).then(function(respo){
        if(respo.data.Message=="Success"){
          alert("Saved Successfully");
          $scope.u_comment="";
        }
      })
     }


     $scope.randomBtn=function(){
      angularService.SendData($scope.ran_uname);
      $window.location.href="../../Index Page/index.html#!/UserProfile";
     }
     $scope.SeeMoreReviews=function(){
      if($scope.log==null || $scope.log==""){
        $window.location.href="../../Index Page/index.html#!/login_page";
        alert("First Login Yourself");
      }else{
        $window.location.href="../../Index Page/index.html#!/moreReview";
      }
     }
     $scope.ViewPost=function(){
      angularService.SendData($scope.review_id);
      $window.location.href="../../Index Page/index.html#!/viewPost";
     }
     $scope.Get=function(data){
      $scope.buynow=data;
     }
});
app.controller('login_page',function($scope,angularService,SessionStore,$window){
   var logindetail=SessionStore.get("user-email");
   $scope.loginfield=logindetail;
   $scope.LoginUser=function(){
    var email=$scope.loginfield;
    var pass=$scope.passfield;
    if(email==null){
       alert("Enter Your Email");
    }
    else if(pass==null){
     alert("Enter Your Password");
    }else{
      angularService.getUserRegisListByEmail(email).then(function(response){
        if(response.data.Message=="Success"){
          if(response.data.UserList==""){
            alert("Email Id Doesn't Exist");
          }
          else{
            var u_pass=response.data.UserList[0].U_Pass;
            if(pass!=u_pass){
              alert("Incorrect Password");
            }
            else{
              angularService.loginUserByEmailandPass(email,pass).then(function(response){
                if(response.data.Message=="Success"){
                  $scope.e=response.data.LoginResponse[0].U_Email;
                  $scope.n=response.data.LoginResponse[0].U_Name;
                  $scope.i=response.data.LoginResponse[0].U_ID;
                  SessionStore.save("user-email",$scope.e);
                  SessionStore.save("user-name",$scope.n);
                  SessionStore.save("user-id",$scope.i);
                  alert("Login Successfull");
                  $window.location.href="../../Index Page/index.html"
                }
                else{
                  alert("Login Unsuccessfull");
                }
              })
            }
          }
        }
        else{
          alert("Invalid Email")
        }
      })
    }
   }
});
app.controller('register_page',function($scope,angularService,SessionStore,$window){
   $scope.SaveUserData = function(){
    if($scope.U_Name==null || $scope.U_Contact==null || $scope.U_Email==null){
      alert("All Fields Are Required");
    }
    else if($scope.U_Pass==null || $scope.U_RePass==null){
      alert("Enetr Password Field");
    }else{
      if($scope.U_Pass!=$scope.U_RePass){
           alert("Both Passwords are not same");
      }else{

        var userdata={
          U_Name:$scope.U_Name,
          U_Contact:$scope.U_Contact,
          U_Email:$scope.U_Email,
          U_Pass:$scope.U_Pass,
          U_RePass:$scope.U_RePass
        }
        angularService.insertUserData(userdata).then(function(response){
          if(response.data.Message=="Success"){
            SessionStore.save("user-email",$scope.U_Email);
            SessionStore.save("user-name",$scope.U_Name);
            alert("Registration Successfull");
            $scope.U_Name="";
            $scope.U_Contact="";
            $scope.U_Email="";
            $scope.U_Pass="";
            $scope.U_RePass="";
            $window.location.href="../../Index Page/index.html#!/login_page";
          }
          else{
            alert(response.data.Message);
          }
        })
      }
    }
   }
});
app.controller('main_controller',function($scope,angularService,SessionStore,$window){
  $scope.IsLogin=function(){
    var logdetail=SessionStore.get("user-email");
    if(logdetail==null || logdetail==""){
      $scope.loginbtn=false;
      $scope.profile=true;
    }
    else{
      $scope.loginbtn=true;
      $scope.profile=false;
      $scope.userName=SessionStore.get("user-name");
      angularService.getUserRegisListByName($scope.userName).then(function(response){
        if(response.data.Message=="Success"){
           $scope.user_img=response.data.UserResponse[0].U_Image;
        }else{
          console.log("err");
        }
      })

    }
  }
  $scope.IsLogin();
  $scope.Logout=function(){
    SessionStore.save("user-email","");
    SessionStore.save("user-name","");
    SessionStore.save("user-id","");
    $window.location.href="../../Index Page/index.html";
  }
})
app.controller('feedbackform_page',function($scope,angularService,SessionStore,$window){
  $scope.up1=false;$scope.upd1=true;
  $scope.up2=false;$scope.upd2=true;
  $scope.up3=false;$scope.upd3=true;
  $scope.up4=false;$scope.upd4=true;
  $scope.up5=false;$scope.upd5=true;
  $scope.up6=false;$scope.upd6=true;
  $scope.id=SessionStore.get("user-id");
     $scope.saveReview=function(){
      if($scope.textreview==null || $scope.textreview==""){
        alert("Empty Textarea");
      }else if($scope.product_name==null || $scope.product_name==""){
        alert("Enter Product Name");
      }else if($scope.review_title==null || $scope.review_title==""){
        alert("Enter Review Title");
      }else if($scope.buy_now_link==null || $scope.buy_now_link==""){
        alert("Paste The Buy Now Link");
      }else{
              var Review={
                TextReview:$scope.textreview,
                u_id:$scope.id,
                Product_Name:$scope.product_name,
                Review_Title:$scope.review_title,
                im1:$scope.im1,
                im2:$scope.im2,
                im3:$scope.im3,
                im4:$scope.im4,
                im5:$scope.im5,
                im6:$scope.im6,
                buy_now:$scope.buy_now_link
              };
              console.log(Review);
              angularService.saveUserReview(Review).then(function(response){
                if(response.data.Message=="Success"){
                  $scope.textreview="";
                  $scope.product_name="";
                  $scope.review_title="";
                  $window.location.href="../../Index Page/index.html#!/home";
                  alert("Upload Successfully");
                }else{
                  alert("Not Uploaded");
                }
              })

      }
     };

               //uploadFile
    $scope.photo;
    $scope.uploadFile = function(e)
    {

        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.PreviewImage = e.target.result;
       //  $scope.photo =    e.target.result.replace("data:", "").replace(/^.+,/, "");

            $scope.$apply();
        };

        reader.readAsDataURL(e.target.files[0]);

    }
    $scope.array=new Array(6);
    $scope.i='';
    $scope.ImagePath = "";
    $scope.uploadImage=function(){
      if($scope.PreviewImage!=undefined){
      var d = {
        img:$scope.PreviewImage
    }
        angularService.saveImage(d).then(function(response){
      if(response.data.Message != "Success")
      {
          alert("Not Uploades");

      }else{
          $scope.ImagePath= response.data.path;
          var object=$scope.ImagePath;
          if($scope.i!=$scope.array.length-1){
            for($scope.i=0;$scope.i<$scope.array.length;$scope.i++){
              if($scope.array[$scope.i]==null){
                $scope.array[$scope.i]=object;
                if($scope.i==0){
                    $scope.im1=$scope.array[$scope.i];
                  $scope.up1=true;$scope.upd1=false;
                }else if($scope.i==1){
                  $scope.im2=$scope.array[$scope.i];
                  $scope.up2=true;$scope.upd2=false;
                }
                else if($scope.i==2){
                  $scope.im3=$scope.array[$scope.i];
                  $scope.up3=true;$scope.upd3=false;
                }
                else if($scope.i==3){
                  $scope.im4=$scope.array[$scope.i];
                  $scope.up4=true;$scope.upd4=false;
                }
                else if($scope.i==4){
                  $scope.im5=$scope.array[$scope.i];
                  $scope.up5=true;$scope.upd5=false;
                }
                else if($scope.i==5){
                  $scope.im6=$scope.array[$scope.i];
                  $scope.up6=true;$scope.upd6=false;
                }
                break;
              }
            }
          }
      }

  });
    
  }else{
    alert("Select An Image First");
  }
}

     
})
app.controller('moreReviewController',function($scope,$window,angularService,SessionStore){
  $scope.liked=true;
  $scope.uid=SessionStore.get("user-id");
  $scope.sbs=false;
  $scope.unsbs=true;
  $scope.likebtn=function(){
    $scope.like=true;
    $scope.liked=false;
  }
  $scope.unlikebtn=function(){
    $scope.like=false;
    $scope.liked=true;
  }
  $scope.Subs=function(){
      $scope.unsbs=false;
      $scope.sbs=true;
  }
  $scope.UnSubs=function(){
      $scope.unsbs=true;
      $scope.sbs=false;
  }
  $scope.random_user=function(){
    angularService.Random_Users($scope.uid).then(function(response){
      if(response.data.Message=="Success"){
        $scope.random_usr=response.data.Random_Response;
        $scope.Get=function(useid){
        var id=response.data.Random_Response[useid].U_ID;
        console.log(id);
          angularService.getReviewby_ID(id).then(function(response){
            if(response.data.Message=="Success"){
              $scope.pn=response.data.ReviewResponse[0].Product_Name;
              $scope.rt=response.data.ReviewResponse[0].Review_Title;
              $scope.review_id=response.data.ReviewResponse[0].R_ID;
              $scope.review=response.data.ReviewResponse[0].TextReview;
              $scope.i1=response.data.ReviewResponse[0].im1;
              $scope.i2=response.data.ReviewResponse[0].im2;
              $scope.i3=response.data.ReviewResponse[0].im3;
              $scope.i4=response.data.ReviewResponse[0].im4;
              $scope.i5=response.data.ReviewResponse[0].im5;
              $scope.i6=response.data.ReviewResponse[0].im6;
              $scope.buy=response.data.ReviewResponse[0].buy_now;
            }
            else{
              alert('no');
            }
           })
          };
        }
        else{
          alert('err');
        }
    })
    
  };$scope.random_user();

  $scope.profile=function(index){
    angularService.SendData(index);
    $window.location.href="../../Index Page/index.html#!/UserProfile";
    }
    $scope.ViewPost=function(){
      angularService.SendData($scope.review_id);
      $window.location.href="../../Index Page/index.html#!/viewPost";
     }
})
app.controller('UserProfileCon',function($scope,$window,angularService,SessionStore){
  $scope.user_email=SessionStore.get("user-email");
  $scope.id=SessionStore.get("user-id");
  $scope.user_name=SessionStore.get("user-name");
  $scope.get=function(){
    var a=angularService.GetData();
    $scope.random_name=a;
    angularService.getUserRegisListByName($scope.random_name).then(function(response){
      if(response.data.Message=="Success"){
         $scope.random_email=response.data.UserResponse[0].U_Email;
         $scope.random_about=response.data.UserResponse[0].about;
         $scope.random_img=response.data.UserResponse[0].U_Image;
         $scope.userid=response.data.UserResponse[0].U_ID;
         angularService.getReviewCountby_ID($scope.userid).then(function(response){
          if(response.data.Message=="Success"){
            $scope.count=response.data.CountResponse;
            $scope.coun=JSON.stringify($scope.count);
            $scope.cou=$scope.coun.slice(6,7);
          }else{
            alert("data not found");
          }
        })
         angularService.getReviewby_ID($scope.userid).then(function(response){
          if(response.data.Message=="Success"){
              $scope.Reviews=response.data.ReviewResponse;
              if($scope.Reviews==null || $scope.Reviews==""){
                $scope.np=false;
              }else{
                $scope.np=true;
              }
          }else{
            alert("Error 404 Not Found");
          }
        })
      }
      else{
        alert("no");
      }
    })
  }
  $scope.get();
  $scope.viewPost=function(data){
    angularService.SendData(data);
          $window.location.href="../../Index Page/index.html#!/viewPost" 
  }
})
app.controller('ProfileCon',function($scope,$window,angularService,SessionStore){
  $scope.log=SessionStore.get("user-email");
  $scope.id=SessionStore.get("user-id");
  $scope.tr=true;
  $scope.ViewPost=function(index){
    angularService.getReviewby_ID($scope.id).then(function(response){
      if(response.data.Message=="Success"){
        if(response.data.ReviewResponse[0].TextReview!=null){
          $scope.rid=response.data.ReviewResponse[index].R_ID;
          console.log($scope.rid);
          angularService.SendData($scope.rid);
          $window.location.href="../../Index Page/index.html#!/viewPost"
          $scope.no_post=true;
        }else{
           $scope.no_post=false;
        }
          
      }else{
        alert("Error 404 Not Found");
      }
    })
   }
  $scope.ReviewCount=function(){
    angularService.getReviewCountby_ID($scope.id).then(function(response){
      if(response.data.Message=="Success"){
        $scope.count=response.data.CountResponse;
        $scope.coun=JSON.stringify($scope.count);
        $scope.cou=$scope.coun.slice(6,7);
      }else{
        alert("data not found");
      }
    })
  }
  $scope.ReviewCount();
  $scope.getReview=function(){
    angularService.getReviewby_ID($scope.id).then(function(response){
      if(response.data.Message=="Success"){
        if(response.data.ReviewResponse[0].TextReview!=null){
          $scope.Reviews=response.data.ReviewResponse;
          console.log($scope.Reviews);
          $scope.no_post=true;
        }else{
           $scope.no_post=false;
        }
          
      }else{
        alert("Error 404 Not Found");
      }
    })
  }
  $scope.getReview();
    $scope.ChangePassword=function(){
      var obj={
        U_Pass:$scope.new_pass,
        U_RePass:$scope.confirm_pass
      }
      angularService.getUserRegisListByEmail($scope.log).then(function(response){
        if(response.data.Message=="Success"){
          if($scope.current_pass==null || $scope.current_pass==""){
            alert("Enter The Current Password");
          }else if($scope.new_pass==null || $scope.new_pass==""){
            alert("Enter The New Password");
          }else if($scope.confirm_pass==null || $scope.confirm_pass==""){
            alert("Re-Enter The Password");
          }else{
            if($scope.current_pass!=response.data.UserList[0].U_Pass){
              alert("Incorrect Password");
            }else{
              if($scope.new_pass!=$scope.confirm_pass){
                alert("Both ( New & Confirm ) Password Doesn't Match");
              }else{
                $scope.uid=response.data.UserList[0].U_ID;
                angularService.ChangePasswordby_ID($scope.uid,obj).then(function(response){
                  if(response.data.Message=="Success"){
                    alert("Password Changed Successfully");
                    $scope.current_pass="";
                    $scope.new_pass="";
                    $scope.confirm_pass="";
                  }
                  else{
                    alert("Invalid Entry")
                  }
                })
              }
            }
          }
        }
        else{
          alert("Invalid Email");
        }
      })
    }

         //uploadFile
    $scope.photo;
    $scope.uploadFile = function(e)
    {

        var reader = new FileReader();
        reader.onload = function (e) {
            $scope.PreviewImage = e.target.result;
       //  $scope.photo =    e.target.result.replace("data:", "").replace(/^.+,/, "");

            $scope.$apply();
        };

        reader.readAsDataURL(e.target.files[0]);

    }


    $scope.ImagePath = "";
    $scope.uploadImage=function(){
      if($scope.PreviewImage!=undefined){
      var d = {
        img:$scope.PreviewImage
    }
    angularService.saveImage(d).then(function(response){
      if(response.data.Message != "Success")
      {
          alert("Not Uploades");

      }else{
          $scope.ImagePath= response.data.path;
          var object={
            U_Image:$scope.ImagePath
          }
          angularService.getProfileImage($scope.id,object).then(function(response){
            if(response.data.Message=="Success"){
              alert("Upload Success");
            }
          })
      }
  });
    }else{
      alert("Select An Image First");
    }
  }





      angularService.getUserRegisListByEmail($scope.log).then(function(response){
        if(response.data.Message=="Success"){
            $scope.user_name=response.data.UserList[0].U_Name;
            $scope.user_email=response.data.UserList[0].U_Email;
            $scope.user_contact=response.data.UserList[0].U_Contact;
            $scope.user_about=response.data.UserList[0].about;
            $scope.user_img=response.data.UserList[0].U_Image;
            $scope.UpdateUser=function(){
              var passob={
                U_Name:$scope.user_name,
                U_Email:$scope.user_email,
                U_Contact:$scope.user_contact,
                about:$scope.user_about,
              }
              angularService.updateUserBy_ID($scope.id,passob).then(function(response){
                if(response.data.Message=="Success"){
                  alert("Profile Updated Successfully");
                  $window.location.href="../../Index Page/index.html#!/Profile";
                  SessionStore.save("user-email",$scope.user_email);
                  SessionStore.save("user-name",$scope.user_name);
                }
                else{
                  alert("Updation Unsuccessfull");
                }
              })
            }
        }
        else{
          alert("Invalid Email");
        }
       })
       $scope.DeleteUser=function(){
        angularService.DeleteUser_By_ID($scope.id).then(function(response){
          if(response.data.Message=="Success"){
            alert("Profile Deleted SuccessFully");
            SessionStore.save("user-email","");
            SessionStore.save("user-name","");
            SessionStore.save("user-id","");
            $window.location.href="../../Index Page/index.html#!/main_controller";
          }else{
            alert("invalid id");
            console.log(err);
          }
        })
       }
})
app.controller('editProfileCon',function($scope,$window,angularService,SessionStore){

})
app.controller('viewPost_Ctr',function($scope,$window,angularService,SessionStore){
  $scope.liked=true;
  $scope.likebtn=function(){
    $scope.like=true;
    $scope.liked=false;
  }
  $scope.unlikebtn=function(){
    $scope.like=false;
    $scope.liked=true;
  }
   $scope.get=function(){
     var a=angularService.GetData();
     $scope.rid=a;
      angularService.getReview_By_R_ID($scope.rid).then(function(response){
        if(response.data.Message=="Success"){
            $scope.p_name=response.data.Review[0].Product_Name;
            $scope.r_title=response.data.Review[0].Review_Title;
            $scope.textreview=response.data.Review[0].TextReview;
            $scope.i1=response.data.Review[0].im1;
            $scope.i2=response.data.Review[0].im2;
            $scope.i3=response.data.Review[0].im3;
            $scope.i4=response.data.Review[0].im4;
            $scope.i5=response.data.Review[0].im5;
            $scope.i6=response.data.Review[0].im6;
            $scope.buy=response.data.Review[0].buy_now;
        }else{
          console.log("error");
        }
      })
   }
   $scope.get();
})
app.controller('see_reviews_p_name_con',function($scope,$window,angularService,SessionStore){
  $scope.uid=SessionStore.get("user-id");
  $scope.sbs=false;
  $scope.unsbs=true;
  $scope.Subs=function(){
      $scope.unsbs=false;
      $scope.sbs=true;
  }
  $scope.UnSubs=function(){
      $scope.unsbs=true;
      $scope.sbs=false;
  }
  $scope.rid=angularService.GetData();
  angularService.getReview_By_R_ID($scope.rid).then(function(response){
    if(response.data.Message=="Success"){
      $scope.im=response.data.Review[0].im1;
      $scope.p_name=response.data.Review[0].Product_Name;
      angularService.GetReview_by_P_Name($scope.p_name).then(function(response){
        if(response.data.Message=="Success"){
          $scope.res=response.data.ReviewRes;
        }else{
          console.log("Error")
        }
      })
    }else{
      alert("error");
    }
  })
  $scope.GetIndex=function(index){ 
    angularService.GetReview().then(function(response){
      var identity=response.data.Review[index].u_id;
      angularService.GetUser_By_ID(identity).then(function(response){
        if(response.data.Message=="Success"){
          $scope.random_usr=response.data.UserList[0].U_Name;
          $scope.randomuser=response.data.UserList[0].U_Image;
          console.log($scope.random_usr);
        }
      })
    })
  }
  $scope.viewPost=function(id){
    angularService.SendData(id);
    $window.location.href="../../Index Page/index.html#!/viewPost";
  }
})

