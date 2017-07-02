/**
 * Created by Martin on 27.06.2017.
 */

class MyFileComponent{
    constructor(){
        this.restrict = "A";
        this.scope ={};
    }
    link(scope, element, parameters){
    console.log(parameters)
    }
}
export default MyFileComponent;