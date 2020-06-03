// data module
const budgetController = (function () {

})();


//ui module
const UIController = (function () {

})();


//app module
const appController = (function (budgetCtrl, UICtrl) {

    //add button click event handler
    document.querySelector('.add__btn').addEventListener('click',function(){

    });

    //global document return keypress event handler
    document.addEventListener('keypress', function(e){
      console.log(e.keyCode);
      
        // if(e.keyCode === '')
    });
})(budgetController, UIController);