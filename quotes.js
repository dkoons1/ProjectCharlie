

// 0352ff7299msh43077480e8043c9p18689ejsn933c8cc390b4

//
var queryURL = "https://type.fit/api/quotes";

$.ajax({
  url: queryURL,
  method: "GET",
})
  .then(function (response)
  {


    var parsed = JSON.parse(response);
    var randomNumber = getRandomInt(parsed.length)
    var text = $("<p>").text(parsed[randomNumber].text + " " + parsed[randomNumber].author);
    var author = $("<p>").text(parsed[randomNumber].author);
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
function getRandomInt (max)
{
  return Math.floor(Math.random() * Math.floor(max));
}
