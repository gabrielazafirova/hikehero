
'use strict';

import template from './view-trips.template.html';
import TripsService from './../../services/trips/trips.service';
import UserService from './../../services/user/user.service';


class ViewTripsComponent {
    constructor(){
        this.controller = ViewTripsComponentController;
        this.template = template;
        this.bindings = {
            trips: '<',
        }
    }

    static get name() {
        return 'viewTrips';
    }


}

class ViewTripsComponentController{
    constructor($state,TripsService,UserService){
        this.$state = $state;
        this.TripsService = TripsService;
        this.UserService = UserService;
    }

    $onInit() {
        this.search = {};
    }

    createDummyCoordinates() {
        this.search.lat = 48.892699;
        this.search.lon = 11.187858;
    }

    change(){
        console.log("Change test");
        var toString = this.search.startdate.toString();
        this.search.startdate = toString;
        console.log(this.search.startdate);
    }

    reset(){
        console.log("reset test");
        this.search = {};
        console.log(this.search);
    }

    details(trip) {
        let _id = trip['_id'];
        this.$state.go('trip',{ tripId:_id});
    };

    isAuthenticated(){
        return this.UserService.isAuthenticated();
    };
    edit (trip) {

        if (this.UserService.isAuthenticated()) {
            let _id = trip['_id'];
            this.$state.go('tripEdit',{ tripId:_id});
        } else {
            this.$state.go('login',{});
        }
    };

    newTrip(){

        if (this.UserService.isAuthenticated()) {
            this.$state.go('tripAdd',{});
        } else {
            this.$state.go('login',{});
        }

    }


    delete(trip) {
        if (this.UserService.isAuthenticated()) {
            let _id = trip['_id'];

            this.TripsService.delete(_id).then(response => {
                let index = this.trips.map(x => x['_id']).indexOf(_id);
                this.trips.splice(index, 1);
            })

        } else {
            this.$state.go('login',{});
        }
    };


    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }

}

export default ViewTripsComponent;