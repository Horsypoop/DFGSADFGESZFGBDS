noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550,500);
    canvas.position(560,150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + "NoseY = " +noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor (leftWristX - rightWristX);

        console.log("LeftWristX = " +leftWristX + "RightWristX = " + rightWristX + "Difference = " + difference);
    }
}

function draw(){
    background('#FF6347');

    document.getElementById("Font_side").innerHTML = "Width And Height Of The Text Will Be: "+difference +"PX";
    textSize(difference);
    fill("white");
    text('Peter', noseX, noseY,difference);
}