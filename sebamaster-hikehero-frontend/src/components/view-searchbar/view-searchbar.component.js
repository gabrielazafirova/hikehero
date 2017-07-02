'use strict';

import template from './view-searchbar.template.html';
import './view-searchbar.style.css';

class ViewSearchbarComponent {
    constructor(){
        this.controller = ViewSearchbarComponentController;
        this.template = template;
    }

    static get name() {
        return 'viewSearchbar';
    }
}

class ViewSearchbarComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }

}

export default ViewSearchbarComponent;