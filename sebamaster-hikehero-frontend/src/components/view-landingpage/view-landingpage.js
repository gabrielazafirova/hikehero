'use strict';

import angular from 'angular';

import ViewLandingpageComponent from './view-landingpage.component';


export default angular.module('ViewLandingpage', [])
    .component(ViewLandingpageComponent.name, new ViewLandingpageComponent);