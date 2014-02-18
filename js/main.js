var CalcController = function() { 
    this.bartenders =[];

    var self = this;
    function initialize() {     
      $("#add-button").on("click", function(e) { self.addBartender(e) });
      $(".calc-button").on("click", function(e) { self.calcTips(e) });
      $("#bartender-to-add").on("click", ".remove-button", function(e) { 
        $(this).closest(".bartender-info").animate({ "left": "-=400px" }, 500, function() {
          $(this).remove();  
        });    
      });
      $("#error-list").on("click", ".close-error-btn", function(e){
        $(this).closest(".errors").remove();
      });
      self.addBartender();
    }
    initialize();
}

CalcController.prototype = {
    addBartender: function(e) {
        var addBartenderTemplate = $.trim($("#add-template").html());
        $("#bartender-to-add").append(addBartenderTemplate);
    },

    calcTips: function(e) {
      this.bartenders = []
      $('#error-list').empty();
      $('#name').remove();
      this.createBartenders();
      var totalTips = $('input[name="totaltips"]').val();
      var hoursAdded = this.addHours();
      if (isNaN(totalTips) || totalTips === '') {
        this.renderTotalTipsError();
      } else if(hoursAdded === false) {
        return;
      } else {
        var rate = totalTips / hoursAdded;
        for (var i=0; i<this.bartenders.length; i++) { 
          this.bartenders[i].tipsOwed = Math.round((this.bartenders[i].hrs * rate)*100)/100
        } 
        this.renderResults();
      }   
    },

    createBartenders: function() {
      var bartenders = this.bartenders;

      $('#bartender-to-add .bartender-info').each(function() {
        var name = $(this).find('input').val();
        var hrs = $(this).find('input').eq(1).val();
        if (name === '' && hrs === '') {
          // skips entry if user leaves name and hours blank
          return true; 
        }else {
          bartenders.push(new Bartender(name, hrs));
        }
      });
    },

    addHours: function() {
      var sumHours = 0
      for(var i=0; i<this.bartenders.length; i++) {
        var hoursInteger = this.bartenders[i].hrs
        if (isNaN(hoursInteger) || hoursInteger === ''){
          this.renderNumHoursError();
          return false;
        }else if (this.bartenders[i].hrs < 0){
          this.renderNegNumberError();
          return false;
        }else {
          sumHours += parseFloat(hoursInteger);
        }
      }
      return sumHours
    },

    renderNumHoursError: function() {
      $('#error-list').append("<div class='errors's>Number required for Hours <img class='close-error-btn' src='img/red_close_button.png'></div>"); 
    },

    renderTotalTipsError: function() {
      $('#error-list').append("<div class='errors's>Number is required for Tip pool amount<img class='close-error-btn' src='img/red_close_button.png'></div>"); 
    },

    renderNegNumberError: function() {
      $('#error-list').append("<div class='errors's>Numbers greater than ' 0 ' required for Hours <img class='close-error-btn' src='img/red_close_button.png'></div>"); 
    },

    renderResults: function(){
      var source =  $('#render-results').html();
      var template = Handlebars.compile(source);
      var poolData = { people: this.bartenders }
      $('body #render-list').append(template(poolData));
    }
}

var Bartender = function(firstname, hrs) {
  this.firstName = firstname;
  this.hrs = hrs;
  this.tipsOwed = 0;
}


$(function() {
    var calcSetup = new CalcController();
});




