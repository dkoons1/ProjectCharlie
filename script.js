var modalMain = $("#muscleGroups");
var modalButton = $("#modButton");

var modalTest = $("#test");
modalTest.hide();


// function renderGroups() {
//     for (var i = 0; i < muscleGroups.length; i++) {
//         var button = $("<button>")
//         button.text(muscleGroups[i])
//         button.attr("data-muscle", muscleGroups[i])
//         button.val(muscleGroups[i])
//         button.addClass("muscleGroup")
//         $(modalMain).append(button)
//     }
// }






    

// var queryURL = "https://wger.de/api/v2/exercise?language=2"
var queryURL = "https://wger.de/api/v2/exercisecategory?language=2"


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(queryURL);
    console.log(response);
   // console.log(response.results[2].muscles)

    var muscleGroups = response.results;

        for (var i = 0; i < muscleGroups.length; i++) {
            var button = $("<button>")
            button.text(muscleGroups[i].name)
            button.attr("data-muscle", muscleGroups[i])
            button.val(muscleGroups[i].name)
            button.addClass("muscleGroup")
            $(modalMain).append(button)
        }

    $(document).on("click", ".muscleGroup",function(){
        modalTest.show();
        var muscleValue = $(this).val();
        console.log(muscleValue)
        var queryURL2 = "https://wger.de/api/v2/exercise?muscles=12&license_author=wger.de&language=2"
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response){
            console.log(response);
            for(var j = 0; j < response.results.length; j++){
                var button = $("<button>");
                var image = $("<img>")
                image.attr("src", response.results[j].image)
                image.attr("height", "30px");
               // image.attr("width", "30px");
                button.text("yeah");
                //$(modalTest).append(button);
                $(modalTest).append(image)
            }
        })
    }) 
})




