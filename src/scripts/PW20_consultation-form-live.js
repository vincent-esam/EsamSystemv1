$("select").on("change", function () {
  $(this).addClass("touched");
});
$("#country_0").on("change", function () {
  $(".add-country").show();
});
$(".add-country").on("click", function () {
  let id = "country_" + $(".country-item").length;
  let selector = "#" + id;
  var itm = document.getElementById("country_0");
  var cln = itm.cloneNode(true);
  cln.id = id;
  document.getElementById("country_wrapper").appendChild(cln);
  let onclick = 'removeCountry("' + id + '")';
  $("<span>")
    .attr({
      onclick: onclick,
      class: "remove-country",
    })
    .appendTo(".form-select");
});
function removeCountry(id) {
  let selector = "#" + id;
  $(selector).next().remove();
  $(selector).remove();
}

// validation

$(".consultation-form input, .consultation-form textarea, #country_0").change(
  function () {
    if ($(this).val() == 0 || $(this).val() == " not_selected;") {
      if ($(this).attr("data-name") == "details") {
        var errorText = "Please, provide more details";
      } else {
        var errorText = "Por favor llena este campo ";
      }
      let parent = $(this).parent();
      parent.addClass("has-error");
      if (parent.hasClass("pw-ui-control-input__wrapper")) {
        parent.addClass("pw-ui-has-invalid-value");
      }
      parent.find(".error-text").text(errorText);
    } else if (
      $(this).attr("type") == "email" &&
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        String($(this).val()).toLowerCase()
      )
    ) {
      let errorText = "Por favor, ingresa un correo válido";
      let parent = $(this).parent();
      parent.addClass("has-error");
      parent.find(".error-text").text(errorText);
    } else if (
      $(this).attr("name") == "website" &&
      !/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(
        String($(this).val()).toLowerCase()
      )
    ) {
      let errorText = "Por favor ingresa una URL válida";
      let parent = $(this).parent();
      parent.addClass("has-error");
      parent.find(".error-text").text(errorText);
    } else {
      let parent = $(this).parent();
      parent.removeClass("has-error");
      parent.removeClass("pw-ui-has-invalid-value");
      parent.find(".error-text").text("");
    }
  }
);

var PWUI = (function () {
  "use strict";

  function initialize() {
    var passwordInputs = document.querySelectorAll(".js-control-input");

    if (passwordInputs.length) {
      addListener(passwordInputs, "focusin", inputFocus);
      addListener(passwordInputs, "focusout", inputBlur);
    }
  }

  //input states
  function inputFocus() {
    this.classList.remove("is-filled");
  }
  function inputBlur() {
    if (this.value.length > 0) {
      this.classList.add("is-filled");
    } else {
      this.classList.remove("is-filled");
    }
  }

  function addListener(elem, event, action) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].addEventListener(event, action, false);
    }
  }

  return {
    initialize: initialize,
  };
})();
PWUI.initialize();
