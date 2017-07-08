'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import ngMdIcons from 'angular-material-icons';
import ngMap from 'ngmap';

import TripsService from './services/trips/trips';
import UserService from './services/user/user';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewTrips from './components/view-trips/view-trips';
import ViewTrip from './components/view-trip/view-trip';
import ViewTripEdit from './components/view-trip-edit/view-trip-edit';
import ViewTripCreate from './components/view-trip-create/view-trip-create';
import ViewCarousel from './components/view-carousel/view-carousel';
import ViewLogin from './components/view-login/view-login';
import ViewSignUp from './components/view-signup/view-signup';
import MyFileComponent from './components/directive/myFile';
import ViewLandingpage from './components/view-landingpage/view-landingpage';
import ViewSearchbar from './components/view-searchbar/view-searchbar';

let app = angular.module('app', [
    uiRouter,
    angularMaterial,
    ngMdIcons,
    ngMap,
    UserService.name,
    TripsService.name,
    AppContent.name,
    ViewTrips.name,
    ViewTrip.name,
    ViewTripEdit.name,
    ViewTripCreate.name,
    ViewCarousel.name,
    ViewLogin.name,
    ViewSignUp.name,
    ViewLandingpage.name,
    ViewSearchbar.name,
]).directive("myFile", () => new MyFileComponent);


app.constant('API_URL', 'http://localhost:3000/api');
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;