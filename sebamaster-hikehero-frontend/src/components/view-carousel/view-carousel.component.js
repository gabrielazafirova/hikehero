
'use strict';

import template from './view-carousel.template.html';
import './view-carousel.style.css';
import Swiper from 'swiper';

class ViewCarouselComponent {
    constructor(){
        this.controller = ViewCarouselComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewCarousel';
    }

}

class ViewCarouselComponentController{
    constructor($state){
        this.$state = $state;

    }

    $onInit() {
        new Swiper ('.swiper-container', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,

            // If we need pagination
            pagination: '.swiper-pagination',

            // Navigation arrows
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            scrollbar: '.swiper-scrollbar',
        });
    }

    static get $inject(){
        return ['$state'];
    }

}

export default ViewCarouselComponent;