//$.post("https://api.yelp.com/oauth2/token",{
// grant_type: "client_credentials",
// client_id: "l_OltA5Ew4ICDizscxfjeg",
// client_secret: "yfDHBhk1vmpuW5BiOj5nqXFGKT920vVSf011iddUwUcyPKF7qWyIRkTZWVWXDqhV"
//}, function(response){
// console.log(response);
// var token = response.access_token;
//  //write all js in here (yelp)
//
//
// //  //--------
//  $.ajax({
//    url: "https://api.yelp.com/v3/businesses/search?location=Washington+DC",
//    headers:{"Authorization": "Bearer " + token}
//  }).done(function(response){
//    console.log(response);
//  });
//  //responses received from

$(function(){
    var select=document.getElementById("deal-category");
    catData={'product': ["beauty_health","automotive", "audio", "beauty_health", "craft_hobbies", "electronics", "food_alcohol", "mens_fashion", "mobile", "movies_music_games", "office_supplies","toys", "tools", "women_fashion"], 'fitness':["boot-camp", "fitness-classes", "gym", "martial-arts", "personal-training", "pilates", "yoga"], 'dining-nightlife': ["bars-clubs", "dining-nightlife", "restaurants"]
  };
  var categoryKeys=Object.keys(catData);
  populateDropdown('deal-category', categoryKeys);
});
function populateDropdown(elementId, options){
  var $dropdown = $("#" + elementId);
    options.forEach(function(optionVal){
      var optionElement = new Option(optionVal, optionVal);
      $(optionElement).html(optionVal);
      $dropdown.append(optionElement);

  });    
}

// event handler for #deal-category on change
      // gets the selection and uses it to call populateDropdown for the sub category dropdown ex. catData[selection]
$("#deal-category").on("change",function(){
    var category = $(this).find("option:selected").val();
    console.log(category);
    var subs=catData[category];
    $('#deal-sub').empty();
    populateDropdown('deal-sub', subs);
  $('#deal-sub').change(function (){
      value = $('#deal-sub :selected').text()
      console.log(value);
 })

     
});
 




//---On Click Command Prompt---

 $("#submit-search").on("click", function() {
   event.preventDefault();
     //---Sqoot API---
var authKey = "BfnFKFtwdc-UU9MV9jZE";

var queryURL = "http://api.sqoot.com/v2/deals?api_key=" + authKey + "&category_slugs=" + value;     

   $.ajax({
    url: queryURL,
    method: "GET"
}).done(function(sqootData) {
var results = sqootData;

                   
                  
  //---Clears Old Div---
  $("#deals-View").empty();
  $("#reviews-View").empty();   
// ---Returns the Value Of Search With First Letter Uppercase---
   var toUpperCase = value.charAt(0).toUpperCase() + value.slice(1);
  //---If No Search Results Are Available---
     if (results.deals.length == 0) {
        $("#deals-View").append("There Are Currently No Deals for " + (toUpperCase) + " at This Time");
        }else{
     


  for (var i=0; i<results.deals.length; i++){

  //---Variables for API Data---
  var coupon = results.deals[i].deal;
  var shortTitle = coupon.short_title;
  var price = coupon.price;
  var provider = coupon.provider_name;
  var dealView = coupon.url;
  //---Variables being Used for Yelp Api call---
  phoneNumber = sqootData.deals[i].deal.merchant.phone_number;
  console.log(phoneNumber);
  zipCode = sqootData.deals[i].deal.merchant.postal_code;
  console.log(zipCode);
  latitude = sqootData.deals[i].deal.merchant.latitude;
  console.log(latitude);
  longitude = sqootData.deals[i].deal.merchant.longitude;
  console.log(longitude);
  //--------------------------------------------
  
      


// console.log(dealBtn);

 console.log(dealView);

//  var displayBox = "<div class = \"container-fluid dealzBox\"><h4>"+shortTitle+"</h4>" + "<br>" + 
 //         "Provided By: " + provider + "<br>" + "$" + price + "<br>";
  //---What will be shown in the Div Box---
 // var divBox = $("<div class = dealzBox>").html(displayBox);
  var imageTag = $("<img class=\"image-View\">");
  imageTag.attr("src", coupon.image_url);

  //---Populates Div Box with Variable Data from API---
  $("#deals-View").append("<row><div class = \"container-fluid dealzBox\"><div class=\"col-md-4\">"+ 
    "<img class=\"image-View\" src=\""+coupon.image_url+"\" /></div> <div class=\"col-md-8\">"+
   "<h4>"+shortTitle+"</h4>" + "<br>" + 
          "Provided By: " + provider + "<br>" + "$" + price + "<br>" +
    '<button type="button" class="btn btn-danger dealBtn' + i + '">'+ "View Deal" +'</button></div></row>');
    //  .append(imageTag)
    //  .append(dealBtn)
    //  .append('</div>');
      //$("#deals-View").append(dealBtn);
      var dealBtn = $('.dealBtn' + i);
dealBtn.data("url", dealView);
  

$(".dealBtn" + i).on("click", function() {
    window.open($(this).data("url"));
  })

$('.btn btn-primary').click(function() {
    window.location = $('#deal-sub').val();
    console.log(val);
});

    // ---Need to be able to grab url for each div---
    // location.href=this.dealView;
  

  $("#reviews-View").append(imageTag);

}

//---Shows Sqoot API Data--
    console.log(sqootData);
   

   }
    })
   });
