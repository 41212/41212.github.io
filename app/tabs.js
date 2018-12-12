const $ = require('jquery');
const uniqid = require('uniqid');
// const fs = require('fs');
// var vex = require('vex-js');
// vex.registerPlugin(require('vex-dialog'));
// vex.defaultOptions.className = 'vex-theme-os';

const $templates = {
    'documents':($id)=>{
        return `
		<div class="tab-panel" id="${ $id }">
		    <p>Select a file from your computer</p>
			<input type="file" class="upload">
			<p>Only file under 25 MB can be previewed</p>
			<p>
                 Can preview over 16 different file types, listed below:
                <ul>
                    <li>Image files (.JPEG, .PNG, .GIF, .TIFF, .BMP)</li>
                    <li>Video files (WebM, .MPEG4, .3GPP, .MOV, .AVI, .MPEGPS, .WMV, .FLV)</li>
                    <li>Text files (.TXT)</li>
                    <li>Markup/Code (.CSS, .HTML, .PHP, .C, .CPP, .H, .HPP, .JS)</li>
                    <li>Microsoft Word (.DOC and .DOCX)</li>
                    <li>Microsoft Excel (.XLS and .XLSX)</li>
                    <li>Microsoft PowerPoint (.PPT and .PPTX)</li>
                    <li>Adobe Portable Document Format (.PDF)</li>
                    <li>Apple Pages (.PAGES)</li>
                    <li>Adobe Illustrator (.AI)</li>
                    <li>Adobe Photoshop (.PSD)</li>
                    <li>Tagged Image File Format (.TIFF)</li>
                    <li>Autodesk AutoCad (.DXF)</li>
                    <li>Scalable Vector Graphics (.SVG)</li>
                    <li>PostScript (.EPS, .PS)</li>
                    <li>TrueType (.TTF)</li>
                    <li>XML Paper Specification (.XPS)</li>
                    <li>Archive file types (.ZIP and .RAR)</li>
                </ul>
			</p>
		</div>
		`
    },
    'pages':($id)=>{
        return `
		<div style="" class="tab-panel page" id="${ $id }">
		<nav class="menu">
			<button class="back">Back</button>
			<button class="forward">Forward</button>
			<button class="refresh">Refresh</button>
			<input class="omni" type="text" placeholder="Type a url">
		</nav>
			<webview style="" class="view" src="https://www.google.ae/"></webview>
        </div>`
    }
};

$('.tab-list').each(function(){                   // Find lists of tabs
  var $this = $(this);                            // Store this list
  var $tab = $this.find('li.active');             // Get the active list item
  var $link = $tab.find('a');                     // Get link from active tab
  var $panel = $($link.attr('href'));             // Get active panel

  $this.on('click', '.tab-control', function(e) { // When click on a tab
    e.preventDefault();                           // Prevent link behavior
    var $link = $(this),                          // Store the current link
        id = this.hash;                           // Get href of clicked tab 

    if (id && !$link.is('.active')) {             // If not currently active
      $panel.removeClass('active');               // Make panel inactive
      $tab.removeClass('active');                 // Make tab inactive

      $panel = $(id).addClass('active');          // Make new panel active
      $tab = $link.parent().addClass('active');   // Make new tab active 
    }
  });

  $('div').each(function(){
      var $this = $(this);
      var $add = $this.find('.add');
      var $list = $this.find('ul');
      var $panels = $('.panels');
      $this.on('click', '.add', function(){
        var $id = uniqid();
        var $template_name = $this.attr('class');
        $list.append(`<li><a class="tab-control" href="#${ $id }">New Tab</a>
            <nav>
                <button class="delete">Delete</button>
            </nav>
        </li>`);
        console.log($templates[$template_name]($id));
        $panels.append($templates[$template_name]($id));
      });
  });


});


$('.tab-list').on('click', '.delete', function (e) {
    var $this = $(this);
    var $menu = $this.parent();
    var $item = $menu.parent();
    var $link = $item.find('a');
    var $panel = $($link.attr('href'));
    $item.remove();
    $panel.remove();
});

var oriVal;

$('.tab-list').on('dblclick', '.tab-control', function () {
    oriVal = $(this).text();
    $(this).text("");
    $("<input type='text'>").appendTo(this).focus();
});

$(".tab-list").on('focusout', '.tab-control > input', function () {
    var $this = $(this);
    $this.parent().text($this.val() || oriVal);
    $this.remove(); // Don't just hide, remove the element.
});

$(".tab-list").on('keydown', '.tab-control > input', function (event) {
    if (event.keyCode == 13) {
        var $this = $(this);
        $this.parent().text($this.val() || oriVal);
        $this.remove(); // Don't just hide, remove the element.
    }
});