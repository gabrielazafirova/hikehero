
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
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.signup = {};
    }

    submit(){
        let user = this.signup.email;
        let password = this.signup.password;

        this.UserService.signup(user,password).then(()=> {
            this.$state.go('movies',{});
        });
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewSignUpComponent;