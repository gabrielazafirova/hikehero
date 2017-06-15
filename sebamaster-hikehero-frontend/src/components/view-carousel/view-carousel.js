'use strict';

import angular from 'angular';

import ViewCarouselComponent from './view-carousel.component';


export default angular.module('ViewCarousel', [])
    .component(ViewCarouselComponent.name, new ViewCarouselComponent);