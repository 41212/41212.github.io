$('.panels').on('change', '.tab-panel .upload', function (e) {
    var $this = $(this);
    var $parent = $this.parent();
    console.log($parent);
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('zg/' + file.name);
    var task = storageRef.put(file);
    var $loading = $('.loading');
    $loading.addClass('open');
    task.on('state_changed',
        function(){
        },
        function(){},
        function(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                var file_url = `https://docs.google.com/viewer?url=${encodeURI(downloadURL)}&embedded=true`;
                $parent.html(`<iframe src="${ file_url }"></iframe>`);
                $loading.removeClass('open');
            });
        })
});