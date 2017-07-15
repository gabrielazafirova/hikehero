
'use strict';

import template from './view-trip-edit.template.html';

import TripsService from './../../services/trips/trips.service';

class ViewTripEditComponent {
    constructor(){
        this.controller = ViewTripEditComponentController;
        this.template = template;
        this.bindings = {
            trip: '<',
        }

    }

    static get name() {
        return 'viewTripEdit';
    }
}

class ViewTripEditComponentController{
    constructor($state, TripsService, $scope){
        this.model = {};
        this.$state = $state;
        this.TripsService = TripsService;
        var _this = this;
        this.placeChanged = function() {
            _this.trip.location = this.getPlace().formatted_address;
            _this.trip.lat = this.getPlace().geometry.location.lat();
            _this.trip.lon = this.getPlace().geometry.location.lon();
        }
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

    $onInit() {
        //Clone the trip Data
        this.model = JSON.parse(JSON.stringify(this.trip))
        //this.trip.date = new Date(this.trip.date);

        var temp = this.trip.date;
        var res = temp.split("/");

        if(res[1].length == 1){
            res[1] = "0"+res[1];
        }

        if(res[0].length == 1){
            res[0] = "0"+res[0];
        }

        var toDate = res[2]+"-"+res[1]+"-"+res[0]+"T00:00:00"
        this.trip.startdate = new Date(toDate);
        console.log(toDate);
    }

    cancel() {
        this.model = JSON.parse(JSON.stringify(this.trip));
        this.$state.go('trips',{});
    };

    save() {
        var that = this;
        let _id = this.trip['_id'];
        let uploadUrl = "http://localhost:3000/api/trips/upload";

        var date = this.trip.startdate;
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var toString = day + '/' + (monthIndex + 1) + '/' + year;
        this.trip.date = toString;

        this.TripsService.upload(uploadUrl,this.$scope.profileImage).then( function (response){
            if (that.$scope.profileImage.photo1 != undefined){
                console.log("photo1 defined");
                that.trip.imagePath1 =  response.data[0].filename;
            }
            if (that.$scope.profileImage.photo2 != undefined){
                console.log("photo2 defined");
                that.trip.imagePath2 =  response.data[1].filename;
            }
            if (that.$scope.profileImage.photo3 != undefined){
                console.log("photo3 defined");
                that.trip.imagePath3 =  response.data[2].filename;
            }

            that.TripsService.update(that.trip).then(data => {
                that.trip = JSON.parse(JSON.stringify(data));

            that.$state.go('trip',{ tripId:_id});
        })

        })


    };

    delete() {
        let _id = this.trip['_id'];

        this.TripsService.delete(_id).then(response => {
            this.$state.go('trips',{});
        });
    };

    static get $inject(){
        return ['$state', TripsService.name, '$scope'];
    }

}


export default ViewTripEditComponent;