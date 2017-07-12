
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-signup.template.html';
import './view-signup.style.css';

class ViewSignUpComponent {
    constructor(){
        this.controller = ViewSignUpComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewSignUp';
    }


}

class ViewSignUpComponentController{
    constructor($state,UserService, $scope) {
        this.$state = $state;
        this.UserService = UserService;
        this.$scope = $scope;
        this.$scope.customer = {};
        this.$scope.set_preview = function() {
            var file = document.getElementById('file-upload').files[0];
            console.log(file);
            var reader  = new FileReader();
            reader.onload = function(e)  {
                var image = document.getElementById("profil_image");
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }



    $onInit() {
        this.signup = {};
    }

    submit(){
        var that = this;
        var path = "";
        let uploadUrl = "http://localhost:3000/api/user/upload";

        //console.log(this.test);
        let email = this.signup.email;
        let password = this.signup.password;
        let firstname = this.signup.firstname;
        let lastname = this.signup.lastname;
        let description = this.signup.description;

        this.UserService.upload(uploadUrl,this.$scope.customer).then( function (response){
            path =  response.data.filename;
            path = path.toString();
            that.test = path;
            console.log("1: "+that.test);
            that.UserService.signup(email,password, firstname, lastname, description, path).then(()=> {
                that.$state.go('trips',{});
        })

        })
        /*console.log("2: "+path);

        let path = this.test;

        console.log(path);*/


    }

    static get $inject(){
        return ['$state', UserService.name, '$scope'];
    }

}


export default ViewSignUpComponent;