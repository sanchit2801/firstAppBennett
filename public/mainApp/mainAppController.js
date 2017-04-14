/**
 * Created by hp on 11-04-2017.
 */

var app = angular.module('demoApp', []);

angular.module('demoApp').controller('mainAppController', ['$scope','$timeout', '$rootScope', '$location', function ($scope, $timeout,$rootScope, $location) {

    var getStudentObj = function(){
        return student = {
            name : "",
            email: "",
            phoneNumber:""
        }
    }

    $scope.init= function(){
        $scope.student = getStudentObj();
    };

    /*
    function isValidEmailPattern(emailInput){
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if(!(filter.test(emailInput))){
            return false;
        }
        return true;
    }

    function isValidMobileNumber(mobileInput){
        var filter = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if(!(filter.test(mobileInput))){
            return false;
        }
        return true;
    }
    */

    $scope.saveStudentData = function(){
    /*
        var name = $('#name').val();
        var email =  $('#email').val();
        var phone = $('#phoneNumber').val();

        if(name != "" && phone != "" && email != ""){
            var validEmail = 	isValidEmailPattern(email);
            if(validEmail){
                var validPhone 	   = 	isValidMobileNumber(phone);
                if(validPhone){
                    console.log(name,email,phone);
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:3003/saveStudentData",
                        //url: "http://54.169.55.30:3002/website/sendThanksEmail",
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        data: JSON.stringify({'name':name,'email':email,'phone':phone,'comment':comment}),
                        success: function(err,res){
                            console.log(res);
                        }
                    });
                }else{
                    alert('Phone Number Not Valid');
                }
            }else{
                alert('Email Not Valid');
            }

        }else{
            alert('Name & Email & Phone Number Field cannot be left empty');
        }
    */
        var name = $scope.student.name;
        var email =  $scope.student.email;
        var phone = $scope.student.phoneNumber;
        $.ajax({
            type: "POST",
            url: "http://localhost:3003/saveStudentData",
            //url: "http://54.169.55.30:3002/website/sendThanksEmail",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data: JSON.stringify({'name':name,'email':email,'phone':phone}),
            success: function(res){
                console.log(res);
            }
        });
    };

}]);

