/**
 * Created by Martin on 27.06.2017.
 */

class MyFileComponent{
    constructor(){
        this.restrict = "A";
        this.scope ={};
    }
    link(scope, element){
        element.bind('change', function(){
            scope.$apply(function(){
                console.log(element[0].files[0]);
            })
        })


    }
}
export default MyFileComponent;