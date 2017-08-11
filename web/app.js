

  $(document).ready(function(){

    var template = $('#template-slide');

    var container = $('#images');

    var url ="http://www.splashbase.co/api/v1/images/latest"
    $.getJSON(url)


    .done(function(json){
      //json returns {images: [{url: '...'}]}
      console.log(json);

      html = template.render(json)
      container.html(html);




      // console.log(json.images.length);
      // for (i = 0; i < json.images.length; i++){
      //     var img = json.images[i].url;
      //     img = "http://c3uo9imc.cloudimg.io/width/200/none/" + img;
      //
      //      html = template.render({link:img})
      //     console.log(html);
      //
      //     container.append(html);
      //
      //     //   container.append("<div><img src=\""+img+"\"></div>");
      //     //     console.log(json);
      // }
      container.slick(
        {
          slidesToShow: 3,
          adaptiveHeight: true,
          dots: true
        }
      );

    });
/*
  var container = document.getElementById('images');
  var url ="http://www.splashbase.co/api/v1/images/latest"
  $.getJSON(url)
  .done(function(json){
    for (i = 0; i < json.images.length; i++){
      var img = json.images[i].url;
      img = "http://c3uo9imc.cloudimg.io/width/200/none/" + img ;
      img = "<img src=\""+img+"\">";
      container.innerHTML += img;
    }
  });*/

  });
