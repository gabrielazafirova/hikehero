
'use strict';

import template from './view-trip.template.html';
import TripsService from './../../services/trips/trips.service';
import UserService from './../../services/user/user.service';

class ViewTripComponent {
    constructor(){
        this.controller = ViewTripComponentController;
        this.template = template;
        this.bindings = {
            trip: '<',
        }

    }

    static get name() {
        return 'viewTrip';
    }


}

class ViewTripComponentController{
    constructor($state,TripsService,UserService){
        this.$state = $state;
        this.TripsService = TripsService;
        this.UserService = UserService;

    }

    edit () {

        if (this.UserService.isAuthenticated()) {
            let _id = this.trip['_id'];
            this.$state.go('tripEdit',{ tripId:_id});
        } else {
            this.$state.go('login',{});
        }

    };


    delete() {
        if (this.UserService.isAuthenticated()) {
            let _id = this.trip['_id'];

            this.TripsService.delete(_id).then(response => {
                this.$state.go('trips',{});
            });
        } else {
            this.$state.go('login',{});
        }
    };

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    };

    getPosterURL(){
        let posterURL = 'http://placehold.it/32x32';
        if (this.trip.hasOwnProperty('posters')) {
            if (this.trip.posters.hasOwnProperty('thumbnail')) {
                posterURL = this.trip.posters.thumbnail;
            } else if (this.trip.posters.hasOwnProperty('profile')) {
                posterURL = this.trip.posters.profile;
            } else if (this.trip.posters.hasOwnProperty('detailed')) {
                posterURL = this.trip.posters.detailed;
            } else {
                posterURL = this.trip.posters.original;
            }
        }
        return posterURL;
    }

    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }

}


export default ViewTripComponent;