$('.panels').on('click', '.page .back', function () {
    var $parent = $(this).parent().parent();
    $webview = $parent.find('webview');
    $webview[0].goBack();

})

$('.panels').on('click', '.page .forward', function () {
    var $parent = $(this).parent().parent();
    $webview = $parent.find('webview');
    $webview[0].goForward();
})

$('.panels').on('click', '.page .refresh', function () {
    var $parent = $(this).parent().parent();
    $webview = $parent.find('webview');
    $webview[0].reload();
})

$('.panels').on('click', '.page .refresh', function () {
    var $parent = $(this).parent().parent();
    $webview = $parent.find('webview');
    $webview[0].reload();
})

$('.panels').on('keydown', '.page .omni', function (event) {
    var $this = $(this);
    var $parent = $(this).parent().parent();
    $webview = $parent.find('webview')[0];

    if (event.keyCode === 13) {
        $this.blur();
        let val = $this.val();
        console.log(val);
        let https = val.slice(0, 8).toLowerCase();
        let http = val.slice(0, 7).toLowerCase();
        if (https === 'https://') {
            $webview.loadURL(val);
        } else if (http === 'http://') {
            $webview.loadURL(val);
        } else {
            $webview.loadURL('http://'+ val);
        }
    }
})


$('.panels').on('page-title-updated', '.page .view', function (event) {
    console.log(event);
})
