
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
        this.tabState = 0;
        this.slideIndex = 1;
    }

    $onInit() {
        this.displaySlider();
        this.makeButtonBold('overview-button');
    }

    showValidationMessages() {
        this.clearValidationMessages();
        this.showValidationMessage("card-first-name");
        this.showValidationMessage("card-last-name");
        this.showValidationMessage("card-type");
        this.showValidationMessage("card-number");
        this.showValidationMessage("card-approval-number");
        this.showValidationMessage("card-valid-until-month");
        this.showValidationMessage("card-valid-until-year");
    }

    showValidationMessage(id) {
        var section = document.getElementById(id);
        var input = section.getElementsByClassName("user-input")[0];
        if (!input.checkValidity()) {
            var validationMessage = section.getElementsByClassName("validation-message")[0];
            validationMessage.innerHTML = input.validationMessage;
            validationMessage.style.display = "block";
        }
    }

    clearValidationMessages() {
        var validationMessages = document.getElementsByClassName("validation-message");
        for (var i = 0; i < validationMessages.length; i++) {
            validationMessages[i].style.display = "none";
        }
    }

    displaySlider() {
        var slides = document.getElementsByClassName("tripSlides");
        // Start again from the beginning
        if (this.slideIndex > slides.length) {this.slideIndex = 1}
        // Go back to the end
        if (this.slideIndex < 1) {this.slideIndex = slides.length}
        // Set all slides invisible
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        // Only set the slide with the current index visible
        slides[this.slideIndex-1].style.display = "block";
    }

    nextSlide() {
        this.slideIndex = this.slideIndex + 1;
        this.displaySlider();
    }

    previousSlide() {
        this.slideIndex = this.slideIndex - 1;
        this.displaySlider();
    }

    openPaymentBox() {
        if (!this.isAuthenticated()) {
            this.openNotLoggedInBox()
        } else {
            this.clearValidationMessages();
            let modal = document.getElementById('paymentBox');
            modal.style.display = "block";
        }
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

    openNotLoggedInBox() {
        let modal = document.getElementById('not-logged-in-box');
        modal.style.display = "block";
    };

    closeNotLoggedInBox() {
        let modal = document.getElementById('not-logged-in-box');
        modal.style.display = "none";
    }

    saveBooking() {
        let user = this.UserService.getCurrentUser();
        this.booking['trip'] = this.trip['_id'];
        this.booking['user'] = user['_id'];
        this.TripsService.postBooking(this.trip['_id'], this.booking).then(response => {
            this.openSuccessBox();
        });
    };

    openOverview() {
        this.normalizeFontWeightOfTabButtons();
        this.makeButtonBold('overview-button');
        this.tabState = 0;
    };

    openGuide() {
        this.normalizeFontWeightOfTabButtons();
        this.makeButtonBold('guide-button');
        this.tabState = 1;
    };

    openLocation() {
        this.normalizeFontWeightOfTabButtons();
        this.makeButtonBold('location-button');
        this.tabState = 2;
    };

    openQuestions() {
        this.normalizeFontWeightOfTabButtons();
        this.makeButtonBold('questions-button');
        this.tabState = 3;
    };

    makeButtonBold(id) {
        let button = document.getElementById(id);
        button.style.fontWeight = "bold";
    }

    normalizeFontWeightOfTabButtons() {
        var tabButtons = document.getElementsByClassName("tab-buttons");
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].style.fontWeight = "normal";
        }
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

    login(){
        this.$state.go('login',{});
    }

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
