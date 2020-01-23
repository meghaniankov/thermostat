$(document).ready(function() {
  var thermostat = new Thermostat();
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
        alert("CHeckbox is checked.");
    } else if ($(this).is(":not(:checked")) {
        thermostat.powerSavingMode("Off");
        alert("Checkbox us unchecked.");
    }
});

  function updateTemp() {
    $("#temperature").text(thermostat.temp);
    $("#temperature").attr('class', thermostat.currentEnergyUsage())
  }
});
