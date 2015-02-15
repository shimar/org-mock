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

/**
 * タスクサマリ初期化。
 */
function initTasksSummary() {
  var tasks     = $('.task-panel');
  var completed = $('i.fa-check-square-o', tasks);
  var total = tasks.length;
  var done  = completed.length;
  var ratio = Math.round((done / total) * 100);
  var ratioElem = $('#ratio');
  ratioElem.html(ratio + '%');
  $('.summary h1 small').html('[' + done + '/' + total + ']');
  // update progressbar
  var progressbar = $('.progress-bar');
  progressbar.attr('aria-valuenow', ratio);
  progressbar.attr('style', 'width: ' + ratio + '%');
};

/**
 * タスク完了時処理。
 */
function completeTask($taskPanel) {
  // icon変更
  var icon = $('.status i', $taskPanel);
  icon.toggleClass('text-success').toggleClass('fa-square-o').toggleClass('fa-check-square-o');
  $taskPanel.one('animationend', function() {
    $('.tasks').append($(this));
    $(this).removeClass('animated fadeOutLeftBig');
    $(this).addClass('animated fadeInLeftBig');
  });
  $taskPanel.addClass('animated fadeOutLeftBig');
  initTasksSummary();
};

/**
 * タスク未完了時処理。
 */
function incompleteTask($taskPanel) {
  // icon変更
  var icon = $('.status i', $taskPanel);
  icon.toggleClass('text-success').toggleClass('fa-square-o').toggleClass('fa-check-square-o');
  $taskPanel.one('animationend', function() {
    $('.tasks').prepend($(this));
    $(this).removeClass('animated fadeOutLeftBig');
    $(this).addClass('animated fadeInLeftBig');
  });
  $taskPanel.addClass('animated fadeOutLeftBig');
  initTasksSummary();
};

/**
 * タスク削除時処理。
 */
function removeTask($taskPanel) {
  $taskPanel.one('animationend', function() {
    $(this).remove();
    initTasksSummary();
  });
  $taskPanel.addClass('animated zoomOut');
};

function initTasks() {
  var tasks = $('.task-panel');
  $('.task-panel .status').bind('click', function(e) {
    var taskPanel = $(this).parents('.task-panel');
    if ($('i.fa-check-square-o', taskPanel).length === 0) {
      completeTask(taskPanel);
    } else {
      incompleteTask(taskPanel);
    }
  });

  $('.task-panel .arrow').bind('click', function(e) {
    $('i', this).toggleClass('fa-rotate-90');
    $('.panel-footer', $(this).parents('.task-panel')).slideToggle('fast');
  });

  $('.task-panel .trash').bind('click', function(e) {
    removeTask($(this).parents('.task-panel'));
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

/**
 * カレンダーを初期化する。
 */
function initCalendar() {
};

$(function() {
  initTaskForm()
  initTasks();
  initTasksSummary();
  initEventItems();
  initDropContainers();
  initCalendar();
});
