
'use strict';

import template from './view-trip.template.html';
import TripsService from './../../services/trips/trips.service';
import UserService from './../../services/user/user.service';
import './view-trip.style.css';

class ViewTripComponent {
    constructor(){
        this.controller = ViewTripComponentController;
        this.template = template;
        this.bindings = {
            trip: '<',
            questions: '<',
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
        this.question = {};
    }

    openWindow(h, w, url) {
    var leftOffset = (screen.width/2) - w/2;
    var topOffset = (screen.height/2) - h/2;
    window.open(url, this.target, 'left=' + leftOffset + ',top=' + topOffset + ',width=' + w + ',height=' + h + ',resizable,scrollbars=yes');

    };

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

    postQuestion() {
        if (this.question.isEmpty()) return;
        this.question.timeAsked = new Date().toDateString();
        this.TripsService.postQuestion(this.trip['_id'], this.question).then(response => {
            this.question = {};
            this.reloadQuestions();
        });
    }

    reloadQuestions() {
        this.TripsService.getQuestions(this.trip['_id']).then(data => {
            this.questions = data;
        });
    }

    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }

}


export default ViewTripComponent;