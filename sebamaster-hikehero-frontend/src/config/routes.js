'use strict';

import TripsComponent from './../components/view-trips/view-trips.component';
import TripComponent from './../components/view-trip/view-trip.component';
import TripEditComponent from './../components/view-trip-edit/view-trip-edit.component';
import TripCreateComponent from './../components/view-trip-create/view-trip-create.component';
import CarouselComponent from './../components/view-carousel/view-carousel.component';
import LandingpageComponent from './../components/view-landingpage/view-landingpage.component';
import LoginComponent from './../components/view-login/view-login.component';
import SignUpComponent from './../components/view-signup/view-signup.component';
import TripsService from './../services/trips/trips.service';


resolveTrip.$inject = ['$stateParams', TripsService.name];
function resolveTrip($stateParams,tripsService){
    return tripsService.get($stateParams.tripId);
}

resolveTrips.$inject = [TripsService.name];
function resolveTrips(tripsService){
    return tripsService.list();
}


config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('trips', {
            url: '/trips',
            component: TripsComponent.name,
            resolve: {
                trips: resolveTrips
            }
        })
        .state('home', {
            url: '/home',
            component: LandingpageComponent.name,
        })
        .state('tripAdd', {
            url: '/trips/new',
            component: TripCreateComponent.name
        })
        .state('trip', {
            url: '/trips/:tripId',
            component: TripComponent.name,
            resolve: {
                trip : resolveTrip
            }
        })
        .state('tripEdit', {
            url: '/trips/:tripId/edit',
            component: TripEditComponent.name,
            resolve: {
                trip : resolveTrip
            }
        })
        .state('login', {
            url: '/login',
            component: LoginComponent.name,
        })
        .state('signup', {
            url: '/signup',
            component: SignUpComponent.name,
 })


}

