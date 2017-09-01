

appmodel = function(){
  self = this;

  self.textRemoveImgById = ko.observable();

  self.title = ko.observable('Smart Slide'); //var non static
  self.slides = ko.observableArray(); //Array non static

  self.imageUpload = ko.observable();

  self.imageIds = ko.observableArray();


  var url ="http://www.splashbase.co/api/v1/images/latest"
  $.getJSON(url) //?

  .done(function(json){
    //json returns {images: [{url: '...'}]}
    console.log(json);
   self.slides.push.apply(self.slides, json.images);
   //console.log(self.slides());

      self.slides().forEach(function(item){
        // item.removeimg2 = function(){};
        self.imageIds.push(item.id);
      });

      // for(var i = 0; self.slides().length; i++){
      //   self.slides()[i].removeimg2 = function(){
      //   alert('removendo');
      //  }
      // }


  });

console.log(self.imageIds());


  self.addimg = function(){
    if (self.imageUpload != "" && self.imageUpload().match(/^(https?|ftps?):\/\/[a-zA-Z]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,4})?([\/a-zA-Z0-9_.-]*)*$/)){
      self.slides.push({
        url: self.imageUpload,
        id : new Date().getTime()
      })
      sweetAlert("Ok", "", "success");

    } else{
      sweetAlert("Oops...", "Something went wrong!", "error");
    }
  }

  self.removeimg = function(){
    image = this;
    console.log('START image');
    console.log(image);
    console.log('END image');


      var doRemove = function(){
          self.slides.remove(image);
      }

    swal({
      title: "Are you sure",
      type: "warning",
      showCancelButton: true,
    }, doRemove);

 }


 //self.removeimg2 = function(){};

 self.removeImgById = function(){
 //image = this; //????
   //console.log(self.textRemoveImgById());
   var flagDeleted = false;
   self.slides().forEach(function(item){
     //console.log(item.id);
     if (item.id == self.textRemoveImgById()){
         self.slides.remove(item);
         flagDeleted = true;
     }
   });
   index = self.imageIds().indexOf(self.textRemoveImgById());
   idDeleted = self.imageIds()[index];
   self.imageIds.remove(idDeleted);
   if (!flagDeleted) {
     swal("Image Not Found", "", "warning")
   }

 }



} //End appmodel


/*Slider function [It is recommended to place a function in a separate JS file, such as "functions.js"]*/
function myCoolSlider() {
        $('#featured-content').slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }]
        });
    }
    /*End of Slider function*/

$(document).ready(function(){
  /*Calling the function [It is recommended to call a function in a separate JS file, such as "scripts.js"]*/
      myCoolSlider();
  /*.................End of call*/

  ko.applyBindings(new appmodel());

});
