
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
        this.search = {};
        var _this = this;
        this.customFilter = function(trip) {
            if(_this.search == {}) {
                return true;
            }
            if(trip.price < _this.search.minPrice) {
                return false;
            }
            if(trip.price > _this.search.maxPrice) {
                return false;
            }
            if(trip.startdate != _this.search.startdate & _this.search.startdate != undefined) {
                return false;
            }
            // if(distanceInKmBetweenEarthCoordinates(_this.search.lat, _this.search.lon, trip.lat, trip.lon) > _this.search.distance)
            return true;
        }
    }

    change(){
        console.log("Change test");
        var toString = this.search.startdate.toString();
        this.search.startdate = toString;
        console.log(this.search.startdate);
    };

    reset(){
        console.log("reset test");
        this.search = {};
        console.log(this.search);
    };

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

    };

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

    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }

    distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return earthRadiusKm * c;
}
    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }
}

export default ViewTripsComponent;