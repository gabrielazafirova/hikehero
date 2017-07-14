
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
    constructor($state, TripsService,UserService,$scope){
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
        this.$scope = $scope;
        this.$scope.profileImage = {};
        this.$scope.set_preview = function(element) {
            let file = element[0].files[0];
            let reader  = new FileReader();
            reader.onload = function(e)  {
                let image;
                if (element[0].id == "imageUpload1") {
                    image = document.getElementById("image1");
                } else if (element[0].id == "imageUpload2") {
                    image = document.getElementById("image2");
                } else if (element[0].id == "imageUpload3") {
                    image = document.getElementById("image3");
                }
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    cancel() {
        this.$state.go('trips',{});
    };

    save() {
        let user = this.UserService.getCurrentUser();
        this.trip.creator = user.firstname;

        //console.log("user.path test");
        //console.log(user.path);
        this.trip.path = user.path;
        console.log(this.trip.path);

        var date = this.trip.startdate;
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var toString = day + '/' + (monthIndex + 1) + '/' + year;
        //this.trip.startdate = toString;
        //console.log(this.trip.startdate);
        this.trip.date = toString;



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
        return ['$state', TripsService.name, UserService.name, '$scope'];
    }

}


export default ViewTripCreateComponent;