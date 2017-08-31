
//
appmodel = function(){
  self = this;

  self.textRemoveImgById = ko.observable();

  this.title = ko.observable('Smart Slide'); //var non static
  this.slides = ko.observableArray(); //Array non static

  self.imageUpload = ko.observable();



  var url ="http://www.splashbase.co/api/v1/images/latest"
  $.getJSON(url) //?

  .done(function(json){
    //json returns {images: [{url: '...'}]}
    console.log(json);
   self.slides.push.apply(self.slides, json.images);
   //console.log(self.slides());
  });


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
    image = this; //????
    var doRemove = function(){
        self.slides.remove(image);
    }
    swal({
      title: "Are you sure",
      type: "warning",
      showCancelButton: true,
    }, doRemove);

 }

 self.removeImgById = function(){
 //image = this; //????
   console.log(self.textRemoveImgById());
   var flagDeleted = false;
   self.slides().forEach(function(item){
     //console.log(item.id);
     if (item.id == self.textRemoveImgById()){
         self.slides.remove(item);
         flagDeleted = true;
     }
   });

   if (!flagDeleted) {
     swal("Image Not Found", "", "warning")
   }


     //buascar indexOf
     //var x =  id;

       //console.log(image.id);
       //index = image.id[self.textRemoveImgById].indexOf;
      // console.log(index);
      // self.slides.remove(image[index]);

 }



} //End appmodel


$(document).ready(function(){
  ko.applyBindings(new appmodel())
});
