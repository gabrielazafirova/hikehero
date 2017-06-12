
'use strict';

import UserService from './../../services/user/user.service';

import template from './app-header.template.html';

import './app-header.style.css';

class AppHeaderComponent {
    constructor(){
        this.controller = AppHeaderComponentController;
        this.template = template;

    }

    static get name() {
        return 'appHeader';
    }


}

class AppHeaderComponentController{
    constructor($state,UserService){
        this.$state = $state;
        this.UserService = UserService;

    }

    openMenu($mdMenu, ev) {
        $mdMenu.open(ev);
    }

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    }

    getCurrentUser(){
        let user = this.UserService.getCurrentUser();
        return user.email;
    }


    goHome(){
        this.$state.go('movies',{});
    }

    login(){
        this.$state.go('login',{});
    }

    signup(){
        this.$state.go('signup',{});
    }

    logout(){
        this.UserService.logout();
        this.$state.go('movies',{});
    }

    create_tour(){
        this.$state.go('movieAdd',{});
    }

    static get $inject(){
        return ['$state', UserService.name];
    }

}


export default AppHeaderComponent;