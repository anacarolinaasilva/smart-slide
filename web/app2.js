

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
        self.imageIds.push(item.id);
      });

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


$(document).ready(function(){
  ko.applyBindings(new appmodel())
});
