
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
    constructor($state,TripsService,UserService) {
        this.booking = {};
        this.$state = $state;
        this.TripsService = TripsService;
        this.UserService = UserService;
        this.question = {};
        this.questionReplyingID = "";
        this.answer = "";
    }

    openPaymentBox() {
        let modal = document.getElementById('paymentBox');
        modal.style.display = "block";
    };

    closePaymentBox() {
        let modal = document.getElementById('paymentBox');
        modal.style.display = "none";
    };

    openSuccessBox() {
        this.closePaymentBox();
        let modal = document.getElementById('successBox');
        modal.style.display = "block";
    };

    closeSuccessBox() {
        let modal = document.getElementById('successBox');
        modal.style.display = "none";
    };

    saveBooking() {
        let user = this.UserService.getCurrentUser();
        this.booking['trip'] = this.trip['_id'];
        this.booking['user'] = user['_id'];
        this.TripsService.postBooking(this.trip['_id'], this.booking).then(response => {
            this.openSuccessBox();
        });
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

    isTripCreator() {
        return this.UserService.getCurrentUser()._id == this.trip.user;
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
        if (!this.question.content) return;
        this.question.timeAsked = new Date().toDateString();
        this.TripsService.postQuestion(this.trip._id, this.question).then(response => {
            this.question = {};
            this.reloadQuestions();
        });
    }

    typeAnswerToQuestion(questionId) {
        this.questionReplyingID = questionId;
    }

    postAnswer() {
        if (!this.answer) return;
        this.TripsService.answerQuestion(this.trip._id, this.questionReplyingID, this.answer).then(response => {
            this.answer = "";
            this.questionReplyingID = "";
            this.reloadQuestions();
        });
    }

    reloadQuestions() {
        this.TripsService.getQuestions(this.trip._id).then(data => {
            this.questions = data;
        });
    }

    static get $inject(){
        return ['$state', TripsService.name, UserService.name];
    }

}

export default ViewTripComponent;
