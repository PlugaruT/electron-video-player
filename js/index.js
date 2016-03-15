function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        $('#video').attr('src', '');
        $('#video').attr('src', contents);
        console.log(file.name);
    };
    reader.readAsDataURL(file);
}

function startCamera() {
    // Grab elements, create settings, etc.
    var video = document.getElementById("video"),
        videoObj = {
            "video": true
        },
        errBack = function(error) {
            console.log("Video capture error: ", error.code);
        };
    // Put video listeners into place
    if (navigator.getUserMedia) { // Standard
        navigator.getUserMedia(videoObj, function(stream) {
            video.src = stream;
            video.play();
        }, errBack);
    } else if (navigator.webkitGetUserMedia) { // WebKit-prefixed
        navigator.webkitGetUserMedia(videoObj, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, errBack);
    }
}

function stopCamera() {
    var MediaStream = window.MediaStreamTrack;
    if (typeof MediaStream !== 'undefined' && !('stop' in MediaStream.prototype)) {
        MediaStream.prototype.stop = function() {
            this.getVideoTracks().forEach(function(track) {
                track.readyState = ended;
                track.stop();
                track.src = "";
            });
        };
        MediaStream.stop();
    }
}

function toogleCamera() {
    if (action == 1) {
        startCamera();
        action = 2;
    } else {
        stopCamera();
        action = 1;
    }
}
var action = 1;
$(document).ready(function() {
    $('#camera').on('click', function() {
        $('#video').attr('src', '');
        toogleCamera();
    });
    $('#open-file').on('click', function() {
        $('#fileInput').click();
    });
    $('#url-link').prop('disabled', true);
    $('#url').on('change', function() {
        var url = $('#url').val();
        if (url) {
            $('#url-link').prop('disabled', false);
        } else {
            $('#url-link').prop('disabled', true);
        }
    });
    $('#url-link').on('click', function() {
        var url = $('#url').val();
        $('#video').attr('src', url);
    });
});