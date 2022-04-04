song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("despacito.mp3");
    song2 = loadSound("clarx.mp3");
}
function setup() {
    canvas = createCanvas(700, 600);
    //canvas.center();
    canvas.position(350, 270);

    video = createCapture(VIDEO);
    video.hide();
    video.size(700, 600);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw() {
    image(video, 0, 0, 700, 600);
    song1_status = song1.isPlaying();
    console.log(song1_status);
    song2_status = song2.isPlaying();
    console.log(song2_status);;

    fill("red");
    stroke("red");

    if (leftWristScore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song_name").innerHTML = "The Song Is - Clarx Zig Zag by NCS";
        }
        
        if(rightWristScore > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status == false){
        song1.play();
        document.getElementById("song_name").innerHTML = "The Song Is - Despacito By Peter Buka";
        }
        }

    }
}
function modelLoaded() {
    console.log("PoseNet is initialized");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wirst x " + leftWristX);
        console.log("Left wrist y " + leftWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("Left wrist score " + leftWristScore);

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("Right wrist score " + rightWristScore);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist x " + rightWristX);
        console.log("Right wrist y " + rightWristY);
    }
}