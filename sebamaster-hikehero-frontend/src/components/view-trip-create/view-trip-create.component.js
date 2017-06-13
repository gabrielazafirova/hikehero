
'use strict';

import template from './view-trip-create.template.html';

import TripsService from './../../services/trips/trips.service';
import UserService from './../../services/user/user.service';

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
        this.$state = $state;
        this.TripsService = TripsService;
        this.UserService = UserService;
    }

    cancel() {
        this.$state.go('trips',{});
    };

    save() {
        let user = this.UserService.getCurrentUser();

        this.trip['user'] = user['_id'];
        this.TripsService.create(this.trip).then(data => {
            let _id = data['_id'];
            this.$state.go('trip',{ tripId:_id});
        });

    };


    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }

}


export default ViewTripCreateComponent;