$(document).ready(function(){
  addBartender();
  // $("#bartender-info").on('mouseover', renderRemoveButton)
  $(".add-button").on("click", addBartender)
  $(".calc-button").on("click", calcTips)
  $("#remove-button").on("click", function(e) {removeBartender(e)})
});

var bartenders = []

function Bartender(firstname, hrs) {
  this.firstName = firstname;
  this.hrs = hrs;
  this.tipsOwed = 0;
}

function validateTotal() {
  $("#total").validate({
    rules: {
      totaltips: {
        required: true,
        digits: true
      }
    }
  });
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
  $('#error-list').empty();
  $('#name').remove();
  bartenders = [];
  createBartenders();
  var totalTips = $('input[name="totaltips"]').val();
  var hoursAdded = addHours();
  if (isNaN(hoursAdded) || isNaN(totalTips)) {
    $('#error-list').append("<li>Hours or Dollar entry must be a number</li>"); 
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
  console.log(this);
  console.log("attempt to remove bartender");
  $(this).closest("#bartender-info").remove();
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


