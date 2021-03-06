// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).on('page:change', function() {

  $("#route-container a, .grid-container a").draggable({
    helper: "clone",
    start: function() {
      originNode = this.parentElement;

      // on pickup
      var tr = originNode.parentElement;
      if(originNode.nodeName == "TD") {
      var total = Number(tr.children[tr.children.length - 1].textContent.trim().substring(1));
      // console.log("total =====" + total);
      var draggableValue = Number(originNode.children[0].children[0].children[0].children[1].textContent.substring(1));
      // console.log("drag =====" + draggableValue);
      var newValue = total - draggableValue;
      if(newValue < 0) newValue = 0;
      tr.children[tr.children.length - 1].innerHTML = "<p>$" + newValue + "</p>"
      console.log(newValue);
    }



    }
  });

  $( ".droppable" ).droppable({
    drop: function(event, ui){
      $(this).append(ui.draggable);
      var route_id = $(ui.draggable).find('.route-name').attr('id');
      var user_id = $(this).attr('id');
      var day = $(this).parents()[2].children[0].children[0].children[$(this).index()].textContent.toLowerCase();
      var destination = '/routes/' + route_id;
      var data = { user_id: user_id, trigger: true, day: day };
      var row = $(this).parent();

      var request = $.ajax({
            method: "PATCH",
            url: destination,
            data: data,
            dataType: 'JSON'
          });

      request.always(function(response){
        row.children().last().html("<p>$" + Math.round(response.total) + "</p>");
      });
    },
  });

  $( "#route-container" ).droppable({
    drop: function(event, ui){
      $(this).prepend(ui.draggable);

      if(originNode.nodeName == "TD") {
        var user_id = originNode.getAttribute('id');
        var route_id = $(ui.draggable).find('.route-name').attr('id')
        var destination = '/routes/' + route_id;

        var request = $.ajax({
              method: "PATCH",
              url: destination,
              data: { user_id: user_id, trigger: true, reset: true },
              dataType: 'JSON'
            });

        var row = $(originNode).parent();
        request.always(function(response){
          row.children().last().html("<p>$" + Math.round(response.total) + "</p>");
          console.log(response);
        });
      }

    }
  });

    $('table.grid-table').find('th:nth-child(7), td:nth-child(7)').hide();
    $('table.grid-table').find('th:nth-child(8), td:nth-child(8)').hide();

    $(".clickme").on("click", function(){
      $('table.grid-table').find('th:nth-child(7), td:nth-child(7)').toggle();
      $('table.grid-table').find('th:nth-child(8), td:nth-child(8)').toggle();
    })


    $(".rain-route-btn").click(toggleOpacity);

});

var rainShown = false;
function toggleOpacity() {
  $.each($('.route'), function( index, value ) {
    if(rainShown) {
      value.style.opacity = 1;
    } else {
      value.style.opacity = value.getAttribute("percent");
    }

  });
  rainShown = !rainShown;
}


function dasd() {
  if(originNode.nodeName == "TD") {
        var user_id = originNode.getAttribute('id');
        var route_id = $(ui.draggable).find('.route-name').attr('id')
        var destination = '/routes/' + route_id;
      console.log(user_id);

        var request = $.ajax({
              method: "PATCH",
              url: destination,
              data: { user_id: user_id, trigger: true, reset: true },
              dataType: 'JSON'
            });

        var row = $(originNode).parent();
        request.always(function(response){
          row.children().last().html("<p>$" + Math.round(response.total) + "</p>");
        });
      }
}
