
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
    }



    $onInit() {
        this.signup = {};
    }

    log(){
        console.log('file is ' );
        console.log(this.$scope.customer);
        let uploadUrl = "http://localhost:3000/api/user/upload";
        this.UserService.upload(uploadUrl,this.$scope.customer);
    }

    submit(){
        /*let photo = this.signup.photo; //kann leider nicht auf photo ueber ng-model zugreifen da multipart/form-data
        console.log('file is ' );
        console.dir(photo);*/
        console.log('file is ' );
        //console.log(this.$scope.customer);

        let email = this.signup.email;
        let password = this.signup.password;
        let firstname = this.signup.firstname;
        let lastname = this.signup.lastname;
        let description = this.signup.description;


        this.UserService.signup(email,password, firstname, lastname, description).then(()=> {
            this.$state.go('trips',{});
        })
    }

    static get $inject(){
        return ['$state', UserService.name, '$scope'];
    }

}


export default ViewSignUpComponent;