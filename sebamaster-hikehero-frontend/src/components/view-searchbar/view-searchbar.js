'use strict';

import angular from 'angular';

import ViewSearchbarComponent from './view-searchbar.component';

export default angular.module('ViewSearchbar', [])
    .component(ViewSearchbarComponent.name, new ViewSearchbarComponent);