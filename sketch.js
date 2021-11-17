// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://tosdary.github.io/bread/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  
	}

function setup() {
  createCanvas(320, 320);
   
  //Create the video
  
  var constraints = {

    /*audio: false, 

    video: {

      facingMode: {

        exact: "environment"

      }

    }*/

    video: {

      facingMode: "user"
	}

  };
  video = createCapture(constraints);
  video.size(320, 320);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start classifying
  classifyVideo();
}

function draw() {	
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);
  
  

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  ThunkableWebviewerExtension.postMessage(label);
  // Classifiy again!
  classifyVideo();
}

function App(){
   const connectToDeviceAndSubscribeToUpdates = async () => {
   const device = await navigator.bluetooth
      .requestDevice({
          filters: [{ services: ['battery_service']}
      });
   const server = await device.gatt.connect();
   const service = await server.getPrimaryService('battery_service');
   const characteristic = await service.getCharacteristic('battery_level');
   const reading = await characteristic.readValue();
   console.log(reading.getUint8(0) + '%');
};
}

