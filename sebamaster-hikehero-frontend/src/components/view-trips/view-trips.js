'use strict';

import angular from 'angular';

import ViewTripsComponent from './view-trips.component';


export default angular.module('ViewTrips', [])
    .component(ViewTripsComponent.name, new ViewTripsComponent);