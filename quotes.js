

// 0352ff7299msh43077480e8043c9p18689ejsn933c8cc390b4

//
var queryURL = "https://type.fit/api/quotes";

$.ajax({
  url: queryURL,
  method: "GET",
})
  .then(function (response)
  {
    console.log(queryURL);
    console.log(response);


    var parsed = JSON.parse(response);

    var text = $("<p>").text(parsed[0].text + " " + parsed[0].author);
    var author = $("<p>").text(parsed[0].author);
    $("#randomQuote").html(text);
    console.log(response.text.author)

    for (var i = 0; i < parsed.length; i++) {


      var randomQuote = $("<div>");
      var q = $("<p>").text("text: " + results[i].author);

      randomQuote.attr("src", results[i].quote.text.url);

      randomQuote.append(p);
      randomQuote.append(author);
      console.log(response.text.author);
      $("#randomQuote").prepend(randomQuote);
    }
  })
