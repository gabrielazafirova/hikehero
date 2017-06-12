'use strict';


export default class UserService {

    static get $inject(){
        return ['$http', '$window','API_URL'];
    }

    constructor($http,$window,API_URL) {
        this.$http = $http;
        this.$window = $window;
        this.API_URL = API_URL;

    }

    static get name(){
        return 'UserService';
    }

    signup(email,password, firstname, lastname, description) {
        return this.$http.post(`${ this.API_URL }/user/signup`, {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            description: description
        });
    }

    create_tour(titel,price, date, difficulty, description, location) {
        return this.$http.post(`${ this.API_URL }/user/create_tour`, {
            titel: titel,
            price: price,
            date: date,
            difficulty: difficulty,
            description: description,
            location: location,
        });
    }

    login(email, pass) {
        return this.$http.post(`${ this.API_URL }/user/login`, {
            email: email,
            password: pass
        });
    }

    logout(){
        this.$window.localStorage.removeItem('jwtToken');
    }

    getCurrentUser() {
        let token = this.$window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(this.$window.atob(base64)).user;
    }

    isAuthenticated() {
        return !!this.$window.localStorage['jwtToken'];
    }


}