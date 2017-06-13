'use strict';

import angular from 'angular';

import ViewTripCreateComponent from './view-trip-create.component';


export default angular.module('ViewTripCreate', [])
    .component(ViewTripCreateComponent.name, new ViewTripCreateComponent);