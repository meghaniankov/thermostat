$(document).ready(function() {
  var thermostat = new Thermostat();

  updateAPI()

  $("#temperature").text(thermostat.temp);

  $("#temp-up").on("click", function() {
    if (thermostat.isMaxTemp()) {
      alert('Maximum Temperature Reached');
    }
    thermostat.up();
    updateTemp()
  });

  $("#temp-down").on("click", function() {
    if (thermostat.isMinTemp()) {
      alert('Minimum Temperature Reached');
    }
    thermostat.down();
    updateTemp()
  });

  $("#temp-reset").on("click", function() {
    thermostat.reset();
    updateTemp()
  });

  $('input[type="checkbox"').click(function() {
    if ($(this).is(":checked")) {
        thermostat.powerSavingMode("On");
    } else if ($(this).is(":not(:checked")) {
        thermostat.powerSavingMode("Off");
    }
  });

  function updateTemp() {
    $("#temperature").text(thermostat.temp);
    $("#temperature").attr('class', thermostat.currentEnergyUsage())
  }

  // function selectCity() {
  //   console.log($("#selected-city").val())
  // }

  $('#selected-city').change(function() {
    thermostat.setCity($("#selected-city").val())
    updateAPI()
  })

  function updateAPI() {
    $.ajax({
    
      url: `http://api.openweathermap.org/data/2.5/weather?q=${thermostat.city}&APPID=65f656b60f2f754b93b689557641dc3e&units=metric`,
  
      dataType : "json",
      })
  
      .done(function( json ) {
        var temp = Math.round(json.main.temp)
        var humidity = json.main.humidity
        $("#api-data").text(`Temp: ${temp}C Humidity: ${humidity}%`);
      })
  
      .fail(function( xhr, status, errorThrown ) {
        alert( "Sorry, there was a problem!" );
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      })
  }

});

