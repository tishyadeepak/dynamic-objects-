img = "";
status1 = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');


}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
  



}


function modelLoaded() {
    console.log("COCOSSD is loaded");
    status1 = true;
   


}

function gotResult(error, results) {

    if (error) {
        console.log(error);

    }
    else {

        console.log(results);

        objects = results;
    }


}






function draw() {
    image(video, 0, 0, 380, 380);
    if (status1 != "") {
        r = random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status : objects detected ";
            document.getElementById("number_of_objects").innerHTML = " Number of objects detected are : "+ objects.length;
            fill(r,g,b);
            percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[0].x + 15, objects[0].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects"


}