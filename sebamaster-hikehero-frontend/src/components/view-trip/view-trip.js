'use strict';

import angular from 'angular';

import ViewTripComponent from './view-trip.component';


export default angular.module('ViewTrip', [])
    .component(ViewTripComponent.name, new ViewTripComponent);