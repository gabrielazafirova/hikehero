
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
    constructor($state, TripsService){
        this.model = {};
        this.$state = $state;
        this.TripsService = TripsService;
    }

    $onInit() {
        //Clone the trip Data
        this.model = JSON.parse(JSON.stringify(this.trip))
    }

    cancel() {
        this.model = JSON.parse(JSON.stringify(this.trip));
        this.$state.go('trips',{});
    };

    save() {
        let _id = this.trip['_id'];

        this.TripsService.update(this.model).then(data => {
            this.trip = JSON.parse(JSON.stringify(data));

            this.$state.go('trip',{ tripId:_id});
        });

    };

    delete() {
        let _id = this.trip['_id'];

        this.TripsService.delete(_id).then(response => {
            this.$state.go('trips',{});
        });
    };

    static get $inject(){
        return ['$state', TripsService.name];
    }

}


export default ViewTripEditComponent;