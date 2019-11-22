

// 0352ff7299msh43077480e8043c9p18689ejsn933c8cc390b4

//
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://type.fit/api/quotes",
  "method": "GET"
}

$.ajax(settings).done(function (response)
{
  var data = JSON.parse(response);
  console.log(data);

  {

    var queryURL = "https://type.fit/api/quotes";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response)
      {
        // console.log(queryURL);
        // console.log(response);

        var text = $("<p>").text(response.text);
        var author = $("<p>").text(response.author);
        $("#randomQuote").html(response.text.author);
        console.log(response.text.author)

        for (var i = 0; i < results.length; i++) {


          var randomQuote = $("<div>");
          var q = $("<p>").text("text: " + results[i].author);

          randomQuote.attr("src", results[i].quote.text.url);

          randomQuote.append(p);
          randomQuote.append(author);
          console.log(response.text.author);
          $("#randomQuote").prepend(randomQuote);
        }
      })
  }

});
