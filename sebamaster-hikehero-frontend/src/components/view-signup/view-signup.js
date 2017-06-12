'use strict';

import angular from 'angular';

import ViewSignUpComponent from './view-signup.component';


export default angular.module('ViewSignUp', [])
    .component(ViewSignUpComponent.name, new ViewSignUpComponent);