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
    $(this).parents('.task-panel').one('animationend', function() {
      $(this).remove();
    });
    $(this).parents('.task-panel').addClass('animated zoomOutDown');
  });
};

function initEventItems() {
  var items = $('.event-item');
  items.on('dragstart', function(e) {
    console.log('dragstart', e);
    this.style.opacity = '0.8';
    e.originalEvent.dataTransfer.setData('text', e.target.id);
    // e.preventDefault();
    // return false;
  });
  items.on('dragend', function(e) {
    console.log('dragend', this);
    this.style.opacity = '1';
    e.preventDefault();
  });
};

function initDropContainers() {
  var containers = $('#agenda table tbody tr td.timetable');
  containers.on('drop', function(e) {
    var id   = '#' + e.originalEvent.dataTransfer.getData('text');
    var elem = $(id);
    // var X = e.layerX;//
    var y = $(e.target).position().top;
    // $(this).append(elem);
    elem.css('top', y + 'px');
    e.preventDefault();
  });

  containers.on('dragenter', function(e) {
    console.log('dragenter', e);
    e.preventDefault();
  });

  containers.on('dragover', function(e) {
    console.log('dragover', e);
    e.preventDefault();
  });

  containers.on('dragleave', function(e) {
    console.log('dragleave', e);
    e.preventDefault();
  });
};

$(function() {
  initTaskForm()
  initTasks();
  initEventItems();
  initDropContainers();
});
