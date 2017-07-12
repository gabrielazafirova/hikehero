
'use strict';

import template from './view-trip-create.template.html';

import TripsService from './../../services/trips/trips.service';
import UserService from './../../services/user/user.service';

import './view-trip-create.style.css';

class ViewTripCreateComponent {
    constructor(){
        this.controller = ViewTripCreateComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewTripCreate';
    }
}

class ViewTripCreateComponentController{
    constructor($state, TripsService,UserService){
        this.trip = {};
        var _this = this;
        this.placeChanged = function() {
            _this.trip.location = this.getPlace().formatted_address;
            _this.trip.lat = this.getPlace().geometry.location.lat();
            _this.trip.lon = this.getPlace().geometry.location.lng();
        }
        this.$state = $state;
        this.TripsService = TripsService;
        this.UserService = UserService;
    }

    cancel() {
        this.$state.go('trips',{});
    };

    save() {
        let user = this.UserService.getCurrentUser();
        this.trip.creator = user.firstname;

        console.log("user.path test");
        console.log(user.path);

        var toString = this.trip.startdate.toString();
        this.trip.startdate = toString;
        console.log(this.trip.startdate);

        this.trip['user'] = user['_id'];
        this.TripsService.create(this.trip).then(data => {
            this.$state.go('trips',{});
            /*let _id = data['_id'];
            this.$state.go('trip',{ tripId:_id});*/
        });

    };

    uploadImage() {
        // document.getElementById('image1').setAttribute('src', this.image)
        let f = document.getElementById('imageUpload').files[0];
        let r = new FileReader();
        r.onloadend = function (e) {
            this.imageURL = e.target.result;
            document.getElementById('image1').setAttribute('src', this.imageURL);
        }
        r.readAsDataURL(f);
    }

    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }

}


export default ViewTripCreateComponent;