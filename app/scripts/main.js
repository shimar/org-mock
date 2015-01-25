/* jshint devel:true */

function initTasks() {
  var tasks = $('task-panel');
  $('.task-panel .status').bind('click', function(e) {
    $('i', this).toggleClass('text-success');
    $('i', this).toggleClass('fa-square-o');
    $('i', this).toggleClass('fa-check-square-o');
  });

  $('.task-panel .arrow').bind('click', function(e) {
    $('i', this).toggleClass('fa-rotate-90');
    $('.panel-footer', $(this).parents('.task-panel')).toggle();
  });
};

$(function() {
  initTasks();
});
