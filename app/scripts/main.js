/* jshint devel:true */

function initTaskForm() {
  var inputTitle = $('#title-input');
  var addButton  = $('#add-btn');
  inputTitle.bind('focus', function(e) {
    $('#item-form-bottom').slideDown('fast');
  });

  addButton.bind('click', function(e) {
    console.log('add button clicked');
    console.log(inputTitle);
    inputTitle.val('');
    $('#item-form-bottom').slideUp('fast');
  });
};

function initTasks() {
  var tasks = $('task-panel');
  $('.task-panel .status').bind('click', function(e) {
    $('i', this).toggleClass('text-success');
    $('i', this).toggleClass('fa-square-o');
    $('i', this).toggleClass('fa-check-square-o');
  });

  $('.task-panel .arrow').bind('click', function(e) {
    $('i', this).toggleClass('fa-rotate-90');
    $('.panel-footer', $(this).parents('.task-panel')).slideToggle('fast');
  });

  $('.task-panel .trash').bind('click', function(e) {
    $(this).parents('.task-panel').fadeOut('slow');
  });
};

$(function() {
  initTaskForm()
  initTasks();
});
