'use strict';

import angular from 'angular';

import ViewTripEditComponent from './view-trip-edit.component';


export default angular.module('ViewTripEdit', [])
    .component(ViewTripEditComponent.name, new ViewTripEditComponent);