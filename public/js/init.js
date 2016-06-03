/**
 * Created by leyiqiang on 5/17/16.
 */
(function($){
    $(function(){

        $('.button-collapse').sideNav();

    }); // end of document ready
    $(document).ready(function() {
        Materialize.updateTextFields();
        $('select').material_select();
        console.log("passed");

    });


})(jQuery); // end of jQuery name space