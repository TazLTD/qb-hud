var colorInc = 100 / 3;
let BubbleColors = {
  thirst: "thirst",
  health: "health",
  armor: "armor",
  hunger: "hunger",
  stress: "stress",
  oxygen: "oxygen",
  stamina: "stamina",
  nos: "nos",
  mic: "mic",
};
let ClassesSet = {};
let Bubbles = [
  "mic",
  "health",
  "armor",
  "hunger",
  "thirst",
  "stress",
  "oxygen",
  "stamina",
  "nos",
];
let BubbleCurrentColorClasses = {};
var hudSettings = {
  minimap: 1,
};

$("body").fadeOut(0);

$(function () {
  for (var i = 0; i < Bubbles.length; i++) {
    SetBubbleValue(Bubbles[i], 90);
  }
  SetBubbleValue("mic", 66);
  $("#nos").hide();
  $(".air-alt").hide();
  $(".text-alt").hide();
});

function SetBubbleValue(id, value) {
  var valOrig = value;
  value = 100 - value;
  $("#" + id + "-progress #" + id + "-water").css("top", value + "%");

  if (ClassesSet[id]) {
    return;
  }
  ClassesSet[id] = true;
  let MainCircleElements = ["progress"];
  for (var i = 0; i < MainCircleElements.length; i++) {
    $("#" + id + "-" + MainCircleElements[i]).addClass(
      BubbleColors[id] + "Main"
    );
  }

  let ids = ["water"];
  for (var i = 0; i < ids.length; i++) {
    $("#" + id + "-" + ids[i]).addClass(BubbleColors[id]);
    $("#" + id + "-" + ids[i]).addClass(BubbleColors[id] + "Shadow");
  }
  let backgrounds = ["progress", "inner"];

  for (var i = 0; i < backgrounds.length; i++) {
    $("#" + id + "-" + backgrounds[i]).addClass("bubbleBackground");
  }

  BubbleCurrentColorClasses[id] = BubbleColors[id];
}

function SetBubbleColorClass(id, className) {
  let MainCircleElements = ["progress"];
  for (var i = 0; i < MainCircleElements.length; i++) {
    $("#" + id + "-" + MainCircleElements[i]).addClass(className + "Main");
    $("#" + id + "-" + MainCircleElements[i]).removeClass(
      BubbleCurrentColorClasses[id] + "Main"
    );
  }

  let ids = ["water"];
  for (var i = 0; i < ids.length; i++) {
    $("#" + id + "-" + ids[i]).addClass(className);
    $("#" + id + "-" + ids[i]).addClass(className + "Shadow");

    $("#" + id + "-" + ids[i]).removeClass(BubbleCurrentColorClasses[id]);
    $("#" + id + "-" + ids[i]).removeClass(
      BubbleCurrentColorClasses[id] + "Shadow"
    );
  }

  BubbleCurrentColorClasses[id] = className;
}

function SetBubbleImageActive(id, image) {
  $("#" + id + "-default-image").show();
  //$("#" + id + "-default-image").hide();
  //$("#" + id + "-big-image").hide();
  //$("#" + id + "-" + image + "-image").show();

  if (image == "big" && id != "mic")
    $(`#${id}-default-image`).css(
      "filter",
      "brightness(0) saturate(100%) invert(11%) sepia(85%) saturate(7491%) hue-rotate(4deg) brightness(105%) contrast(116%)"
    );
  else $(`#${id}-default-image`).css("filter", "none");
}

(() => {
  TDE_HUD = {};

  TDE_HUD.ToggleSeatbelt = function (data) {
    if (data.toggle) {
      $(".car-seatbelt-info img").fadeOut();
    } else {
      $(".car-seatbelt-info img").fadeIn();
    }
  };

  TDE_HUD.CarHud = function (data) {
    if (data.show) {
      $(".ui-car-container").fadeIn();
    } else {
      $(".ui-car-container").fadeOut();
    }
  };

  TDE_HUD.UpdateHud = function (data) {
    var Show = "none";
    if (data.show != undefined) {
      if (data.show == false) {
        Show = "none";
        $(".mainWrapper").css("display", Show);
        return;
      } else {
        $(".mainWrapper").css("display", "flex");
      }
    }
	
	$("body").fadeIn();

    if (data.action == "adjust") {
      data[data.field] = data.value;
    }

    if (data.health != undefined) {
      SetBubbleValue("health", data.health);

      if (data.health <= 100) {
        $("#health").fadeIn(750);
      } else {
        $("#health").fadeOut(750);
      }

      if (data.health <= 40) {
        SetBubbleImageActive("health", "big");
      } else {
        SetBubbleImageActive("health", "default");
      }
    }
    if (data.hunger != undefined) {
      SetBubbleValue("hunger", data.hunger);
      if (data.hunger <= 100) {
        $("#hunger").fadeIn(750);
      } else {
        $("#hunger").fadeOut(750);
      }

      if (data.hunger <= 40) {
        SetBubbleImageActive("hunger", "big");
      } else {
        SetBubbleImageActive("hunger", "default");
      }
    }
    if (data.thirst != undefined) {
      SetBubbleValue("thirst", data.thirst);
      if (data.thirst <= 100) {
        $("#thirst").fadeIn(750);
      } else {
        $("#thirst").fadeOut(750);
      }

      if (data.thirst <= 40) {
        SetBubbleImageActive("thirst", "big");
      } else {
        SetBubbleImageActive("thirst", "default");
      }
    }
    if (data.stress != undefined) {
      SetBubbleValue("stress", data.stress);
      if (data.stress >= 3) {
        $("#stress").fadeIn(750);
      }
      if (data.stress <= 2) {
        $("#stress").fadeOut(750);
      }
    }

    if (data.armour != undefined) {
      SetBubbleValue("armor", data.armour);

      if (data.armour > 1) {
        $("#armor").fadeIn(750);
      } else {
        $("#armor").fadeOut(750);
      }
    }

    if (data.oxygen != undefined) {
      let realOxygen = Math.floor(data.oxygen);
      SetBubbleValue("oxygen", realOxygen);
      if (realOxygen > 1 && 100 > realOxygen) {
        $("#oxygen").fadeIn(1000);
      } else {
        $("#oxygen").fadeOut(1000);
      }
    }

    if (data.stamina != undefined) {
      let realOxygen = Math.floor(data.oxygen);

      SetBubbleValue("oxygen", realOxygen);
      if (realOxygen > 1 && 100 > realOxygen) {
        $("#oxygen").fadeIn(1000);
      } else {
        $("#oxygen").fadeOut(1000);
      }
    }

    if (data.stamina != undefined) {
      SetBubbleValue("stamina", data.stamina);

      if (100 == data.stamina) {
        $("#stamina").fadeOut(750);
      } else {
        $("#stamina").fadeIn(750);
      }
    }

    if (data.nitro != undefined) {
      SetBubbleValue("nos", data.nitro);
      if (data.nitro > 1) {
        $("#nos").fadeIn(750);
      } else {
        $("#nos").fadeOut(750);
      }
    }

    if (data.talking != undefined) {
      if (data.talking.radio != undefined && data.talking.radio == true) {
        SetBubbleColorClass("mic", "radiotalk");
      } else if (data.talking.talking != undefined && data.talking.talking == true) {
		SetBubbleColorClass("mic", "mictalk");
      } else {
        SetBubbleColorClass("mic", "mic");
      }
    }

  
      setProgressSpeed(data.speed, ".carprogress-speed");
 
    if (data.alt) {
      setProgressAlt(data.alt, ".progress-alt");
    }
    if (data.fuel) {
      setProgressFuel(data.fuel, ".progress-fuel");

      if (data.fuel <= 20) {
        $(".progress-fuel").css("stroke", "red"); // 20% fuel left color
      } else if (data.fuel <= 30) {
        $(".progress-fuel").css("stroke", "orange"); // 30% fuel left color
      } else {
        $(".progress-fuel").css("stroke", "#fff"); // other fuel left color
      }
    }
  };

  TDE_HUD.UpdateProximity = function (data) {
    let state = 100;
    CurrentProx = data.proxmity;

    switch (data.proxmity) {
      case 1.5:
        state = 33;
        break;
      case 3:
        state = 66;
        break;
      case 6:
        state = 100;
        break;
      default:
        state = 100;
        break;
    }

    SetBubbleValue("mic", state);
    if (state == 33) {
      SetBubbleImageActive("mic", "big");
    } else {
      SetBubbleImageActive("mic", "default");
    }
  };

  function setProgressSpeed(value, element) {
    var circleValue = value;

    if (circleValue > 400) {
      circleValue = 400;
    }

    var circle = document.querySelector(element);
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    var html = $(element).parent().parent().find("span");
    var percent = (circleValue * 100) / 450;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const offset =
      circumference - ((-percent * 73) / 100 / 100) * circumference;
    circle.style.strokeDashoffset = -offset;

    html.text(value);
  }

  function setProgressAlt(value, element) {
    var circleValue = value;

    if (circleValue > 1000) {
      circleValue = 1000;
    }

    var circle = document.querySelector(element);
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    var html = document.getElementById("altspantext");
    var percent = (circleValue * 100) / 1000;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const offset =
      circumference - ((-percent * 73) / 100 / 100) * circumference;
    circle.style.strokeDashoffset = -offset;

    html.innerText = value;
  }

  function setProgressFuel(percent, element) {
    var circle = document.querySelector(element);
    var radius = circle.r.baseVal.value;
    var circumference = radius * 2 * Math.PI;
    var html = $(element).parent().parent().find("span");

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    const offset =
      circumference - ((-percent * 73) / 100 / 100) * circumference;
    circle.style.strokeDashoffset = -offset;

    html.text(Math.round(percent));
  }

  window.onload = function (e) {
    window.addEventListener("message", function (event) {
      switch (event.data.action) {
        case "updateStatusHud":
          TDE_HUD.UpdateHud(event.data);
          break;
        case "adjust":
          TDE_HUD.UpdateHud(event.data);
          break;
        case "seatbelt":
          TDE_HUD.ToggleSeatbelt(event.data);
          break;
        case "car":
          TDE_HUD.CarHud(event.data);
          break;
        case "UpdateProximity":
          TDE_HUD.UpdateProximity(event.data);
          break;
        case "air":
          if (event.data.show) {
            $(".air-alt").show();
            $(".text-alt").show();
          } else {
            $(".air-alt").hide();
            $(".text-alt").hide();
          }
          break;
        case "hudmenu":
          TDE_HUD.HudMenuSetupSettings(event.data.settings);
          TDE_HUD.DisplayHudSettingsMenu(event.data.show);
          break;
        case "settings":
          TDE_HUD.HudMenuSetupSettings(event.data.settings);
          break;
      }
    });
  };
})();

TDE_HUD.HudMenuSetupSettings = function (settings) {
  hudSettings = settings;

  document.getElementById("minimap_2_checkbox").checked = false;
  document.getElementById("minimap_1_checkbox").checked = false;
  document.getElementById("houseblips_checkbox").checked = false;
  document.getElementById("shopblips_checkbox").checked = false;
  document.getElementById("gasblips_checkbox").checked = false;
  document.getElementById("alwaysminimap_checkbox").checked = false;

  if (settings.minimap == 1) {
    document.getElementById("minimap_1_checkbox").checked = true;
  } else {
    document.getElementById("minimap_2_checkbox").checked = true;
  }

  document.getElementById("houseblips_checkbox").checked = settings.houseblips;
  document.getElementById("shopblips_checkbox").checked = settings.shopblips;
  document.getElementById("gasblips_checkbox").checked = settings.gasblips;
  document.getElementById("alwaysminimap_checkbox").checked =
    settings.alwaysminimap;
};

TDE_HUD.DisplayHudSettingsMenu = function (show) {
  if (show) {
    document.getElementById("hudmenu").style.display = "block";
  } else {
    document.getElementById("hudmenu").style.display = "none";
  }
};

$(document).on("keydown", function () {
  if (event.repeat) {
    return;
  }
  switch (event.keyCode) {
    case 27: // ESC
      TDE_HUD.DisplayHudSettingsMenu(false);
      $.post("https://qb-hud/closeui");
      break;
  }
});

$("#minimap_1_checkbox").click(function () {
  if (document.getElementById("minimap_1_checkbox").checked) {
    document.getElementById("minimap_2_checkbox").checked = false;
    hudSettings.minimap = 1;
  } else {
  }
});

$("#minimap_2_checkbox").click(function () {
  if (document.getElementById("minimap_2_checkbox").checked) {
    document.getElementById("minimap_1_checkbox").checked = false;
    hudSettings.minimap = 2;
  } else {
  }
});

$("#houseblips_checkbox").click(function () {
  hudSettings.houseblips = document.getElementById(
    "houseblips_checkbox"
  ).checked;
});

$("#shopblips_checkbox").click(function () {
  hudSettings.shopblips = document.getElementById("shopblips_checkbox").checked;
});

$("#gasblips_checkbox").click(function () {
  hudSettings.gasblips = document.getElementById("gasblips_checkbox").checked;
});

$("#alwaysminimap_checkbox").click(function () {
  hudSettings.alwaysminimap = document.getElementById(
    "alwaysminimap_checkbox"
  ).checked;
});

$("#hud-save-btn").click(function () {
  var minimap = 1

  if (document.getElementById("minimap_1_checkbox").checked) {
    document.getElementById("minimap_2_checkbox").checked = false;
    minimap = 1;
  }

  if (document.getElementById("minimap_2_checkbox").checked) {
    document.getElementById("minimap_1_checkbox").checked = false;
    minimap = 2;
  }

  $.post(
    "https://qb-hud/SaveHudSettings",
    JSON.stringify({
      settings: {
        minimap: minimap,
        houseblips: document.getElementById("houseblips_checkbox").checked,
        shopblips: document.getElementById("shopblips_checkbox").checked,
        gasblips: document.getElementById("gasblips_checkbox").checked,
        alwaysminimap: document.getElementById("alwaysminimap_checkbox").checked,
      },
    })
  );
});
