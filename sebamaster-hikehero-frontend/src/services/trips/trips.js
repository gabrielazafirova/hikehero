'use strict';

import angular from 'angular';

import TripsService from './trips.service';


export default angular.module('TripsServiceDefinition', [])
    .service(TripsService.name, TripsService)