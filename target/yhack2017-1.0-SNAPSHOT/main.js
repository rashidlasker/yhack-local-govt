       // put your keys in the header
        // var headers = {
        //     "app_id"          : "ad48aba9",
        //     "app_key"         : ""
        // };
        // var payload  = { "image" : "YOUR_IMAGE_URL" };
        // var url = "http://api.kairos.com/detect";
        // // make request 
        // $.ajax(url, {
        //     headers  : headers,
        //     type: "POST",
        //     data: JSON.stringify(payload),
        //     dataType: "text"
        // }).done(function(response){
        //     console.log(response);
        // });
        // References to all the element we will need.
        var video = document.querySelector('#camera-stream'),
            image = document.querySelector('#snap'),
            start_camera = document.querySelector('#start-camera'),
            controls = document.querySelector('.controls'),
            take_photo_btn = document.querySelector('#take-photo'),
            delete_photo_btn = document.querySelector('#delete-photo'),
            download_photo_btn = document.querySelector('#download-photo'),
            error_message = document.querySelector('#error-message'),
            response_message = document.querySelector('#response-message');


        // The getUserMedia interface is used for handling camera input.
        // Some browsers need a prefix so here we're covering all the options
        navigator.getMedia = ( navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia);


        if(!navigator.getMedia){
          displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
        }
        else{

          // Request the camera.
          navigator.getMedia(
            {
              video: true
            },
            // Success Callback
            function(stream){

              // Create an object URL for the video stream and
              // set it as src of our HTLM video element.
              video.src = window.URL.createObjectURL(stream);

              // Play the video element to start the stream.
              video.play();
              video.onplay = function() {
                showVideo();
              };

            },
            // Error Callback
            function(err){
              displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
            }
          );

        }



        // Mobile browsers cannot play video without user input,
        // so here we're using a button to start it manually.
        start_camera.addEventListener("click", function(e){

          e.preventDefault();

          // Start video playback manually.
          video.play();
          showVideo();

        });


        take_photo_btn.addEventListener("click", function(e){

          e.preventDefault();

          var snap = takeSnapshot();

          // Show image. 
          image.setAttribute('src', snap);
          image.classList.add("visible");

          // Enable delete and save buttons
          delete_photo_btn.classList.remove("disabled");
          download_photo_btn.classList.remove("disabled");

          // Set the href attribute of the download button to the snap url.
          //download_photo_btn.href = snap;

          // Pause video playback of stream.
          video.pause();

        });


        delete_photo_btn.addEventListener("click", function(e){

          e.preventDefault();

          // Hide image.
          image.setAttribute('src', "");
          image.classList.remove("visible");

          // Disable delete and save buttons
          delete_photo_btn.classList.add("disabled");
          download_photo_btn.classList.add("disabled");

          // Resume playback of stream.
          video.play();

        });

         download_photo_btn.addEventListener("click", function(e){

             e.preventDefault();
             var hidden_canvas = document.querySelector('canvas');
             var img = hidden_canvas.toDataURL('image/png');
             var headers = {
                 "app_id"          : "ad48aba9",
                 "app_key"         : "APIKEY"
             };
             var payload  = { "image" : img , "gallery_name":"MyGallery", "subject_id":"Rashid"};
             var url = "http://api.kairos.com/verify";
             // make request 
             $.ajax(url, {
                 headers  : headers,
                 type: "POST",
                 data: JSON.stringify(payload),
                 dataType: "text"
             }).done(function(response){
                 console.log(response);
                 if(JSON.parse(response).images[0].transaction.confidence > 0.6){
                     response_message.innerText = "Match!"
                 } else {
                     response_message.innerText = "No Match!"
                 }
                 
             });
         });

//        download_photo_btn.addEventListener("click", function(e){
//
//            e.preventDefault();
//            var hidden_canvas = document.querySelector('canvas');
//            var img = hidden_canvas.toDataURL('image/png').split(',')[1];
//            var headers = {
//                'Content-Type': 'application/json'
//            };
//            var upl = document.querySelector('input[type=file]');
//            var preview = document.querySelector('img'); //selects the query named img
//            var reader  = new FileReader();
//            if(upl.files && upl.files[0]){
//              reader.onloadend = function () {
//                  preview.src = reader.result;
//                  img = reader.result.split(',')[1];
//                  var payload  = {
//              "requests": [
//                {
//                  "image": {
//                    "content": img
//                  },
//                  "features": [
//                    {
//                      "type": "TEXT_DETECTION"
//                    }
//                  ]
//                }
//              ]
//            };
//            var url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCbuE1d8_iL-oGh6WznMrpovgCjjLLJY18";
//            // make request 
//            $.ajax(url, {
//                headers  : headers,
//                type: "POST",
//                data: JSON.stringify(payload),
//                dataType: "json"
//            }).done(function(response){
//                console.log(response);
//                //response_message.innerText = JSON.parse(response).images[0].transaction.confidence;
//                response_message.innerText = JSON.stringify(response);
//            });
//              }
//              reader.readAsDataURL(upl.files[0]); //reads the data as a URI
//            } else {
//                preview.src = "";
//                var payload  = {
//              "requests": [
//                {
//                  "image": {
//                    "content": img
//                  },
//                  "features": [
//                    {
//                      "type": "TEXT_DETECTION"
//                    }
//                  ]
//                }
//              ]
//            };
//            var url = "https://vision.googleapis.com/v1/images:annotate?key=APIKEY";
//            // make request 
//            $.ajax(url, {
//                headers  : headers,
//                type: "POST",
//                data: JSON.stringify(payload),
//                dataType: "json"
//            }).done(function(response){
//                console.log(response);
//                //response_message.innerText = JSON.parse(response).images[0].transaction.confidence;
//                response_message.innerText = JSON.stringify(response);
//            });
//            }
//        });

        function previewFile(){
             var preview = document.querySelector('img'); //selects the query named img
             var file    = document.querySelector('input[type=file]').files[0]; //sames as here
             var reader  = new FileReader();

             reader.onloadend = function () {
                 preview.src = reader.result;
             }

             if (file) {
                 reader.readAsDataURL(file); //reads the data as a URL
             } else {
                 preview.src = "";
             }
        }

        function showVideo(){
          // Display the video stream and the controls.

          hideUI();
          video.classList.add("visible");
          controls.classList.add("visible");
        }


        function takeSnapshot(){
          // Here we're using a trick that involves a hidden canvas element.  

          var hidden_canvas = document.querySelector('canvas'),
              context = hidden_canvas.getContext('2d');

          var width = video.videoWidth,
              height = video.videoHeight;

          if (width && height) {

            // Setup a canvas with the same dimensions as the video.
            hidden_canvas.width = width;
            hidden_canvas.height = height;

            // Make a copy of the current frame in the video on the canvas.
            context.drawImage(video, 0, 0, width, height);

            // Turn the canvas image into a dataURL that can be used as a src for our photo.
            return hidden_canvas.toDataURL('image/png');
          }
        }


        function displayErrorMessage(error_msg, error){
          error = error || "";
          if(error){
            console.log(error);
          }

          error_message.innerText = error_msg;

          hideUI();
          error_message.classList.add("visible");
        }


        function hideUI(){
          // Helper function for clearing the app UI.

          controls.classList.remove("visible");
          start_camera.classList.remove("visible");
          video.classList.remove("visible");
          snap.classList.remove("visible");
          error_message.classList.remove("visible");
        }
