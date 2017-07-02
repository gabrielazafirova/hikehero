'use strict';

import template from './view-landingpage.template.html';
import './view-landingpage.style.css';

class ViewLandingpageComponent {
    constructor(){
        this.controller = ViewLandingpageComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewLandingpage';
    }

}

class ViewLandingpageComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }
}

export default ViewLandingpageComponent;