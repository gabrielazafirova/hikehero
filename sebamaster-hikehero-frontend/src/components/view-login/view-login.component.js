
'use strict';

import UserService from './../../services/user/user.service';

import template from './view-login.template.html';
import './view-login.style.css';

class ViewLoginComponent {
    constructor(){
        this.controller = ViewLoginComponentController;
        this.template = template;

    }

    static get name() {
        return 'viewLogin';
    }

}

class ViewLoginComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        document.getElementById("wrong-login-info").style.display = "none";
        this.login = {};
    }

    submit(){
        let user = this.login.email;
        let password = this.login.password;

        this.UserService.login(user,password).then(()=> {
            this.$state.go('trips',{});
        }, () => {
            document.getElementById("wrong-login-info").style.display = "block";
        });

    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default ViewLoginComponent;