var song = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY ="";

function preload() {
despacito = loadSound("despacito.mp3");
clarx = loadSound("clarx.mp3");
}
function setup() {
canvas = createCanvas(700,600);
//canvas.center();
canvas.position(350,270);

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);

video = createCapture(VIDEO);
video.hide();
}
function draw() {
    image(video,0,0,700,600);
}
function modelLoaded() {
console.log("PoseNet is initialized");
}
function gotPoses(results){
if (results.length > 0) {
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.left.y;
console.log("Left wirst x " + leftWristX);
console.log("Left wrist y " + leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist x " + rightWristX);
console.log("Right wrist y " + rightWristY );
}
}