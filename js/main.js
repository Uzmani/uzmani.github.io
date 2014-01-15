$(document).ready(function(){
  addBartender();
  // $("#bartender-info").on('mouseover', renderRemoveButton)
  $("#add-button").on("click", addBartender)
  $(".calc-button").on("click", calcTips)
  $("#bartender-to-add").on("click", ".remove-button", function(e) {
    e.preventDefault();
    $(this).closest(".bartender-info").remove();
  })
  $("#error-list").on("click", ".close-error-btn", function(e){
    e.preventDefault();
    $(this).closest(".errors").remove();
  })
});

var bartenders = []

function Bartender(firstname, hrs) {
  this.firstName = firstname;
  this.hrs = hrs;
  this.tipsOwed = 0;
}

function addHours(){  
  var sumHours = 0
  for(var i=0; i<bartenders.length; i++) {
    var hoursInteger = bartenders[i].hrs
    sumHours += parseFloat(hoursInteger);
  }
  return sumHours
}

function calcTips() { 
  bartenders = []
  $('#error-list').empty();
  $('#name').remove();
  createBartenders();
  var totalTips = $('input[name="totaltips"]').val();
  var hoursAdded = addHours();
  if (isNaN(hoursAdded) || isNaN(totalTips) || totalTips === '') {
    $('#error-list').append("<div class='errors's>Total Tips and Hours are required<img class='close-error-btn' src='img/red_close_button.png'></div>"); 
  }else {
    var rate = totalTips / hoursAdded;
    for (var i=0; i<bartenders.length; i++) {  
      bartenders[i].tipsOwed = Math.round((bartenders[i].hrs * rate)*100)/100
    } 
    renderResults();
  }  
}


function createBartenders() {
  $('#bartender-to-add .bartender-info').each(function() {
    var name = $(this).find('input').val();
    var hrs = $(this).find('input').eq(1).val();
    if (name === '' && hrs === '') {
      return true; 
    }else {
      bartenders.push(new Bartender(name, hrs));
    }
  });
}

function addBartender(){
  var addBartenderTemplate = $.trim($('#add-template').html());
  $("#bartender-to-add").append(addBartenderTemplate);
}

function removeBartender(e) {
  e.preventDefault();
  console.log("attempt to remove bartender");
  $(this).closest(".bartender-info").remove();
}

// function renderRemoveButton() {
//   console.log("moused over")
// }

function renderResults(){
  var source =  $('#render-results').html();
  var template = Handlebars.compile(source);
  var poolData = { people: bartenders }
  $('body').append(template(poolData));
}


