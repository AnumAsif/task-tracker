
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var message,starttime=0, stoptime=0;
ctx.translate(radius, radius);
radius = radius * 0.90
const start = new Date()
setInterval(drawClock, 1000);
setInterval(showTask,30000);
setTimeout(stopTask,40000);
setTimeout(reportTask,50000);
var K=0;
var csrftoken = Cookies.get('csrftoken');

$( document ).ready(function() {
  
});
function showTask(){
  var time= new Date();
  var hour =(time.getHours()-start.getHours())+12;
  if(hour<10){
    hour="0"+toString(hour);
  }
  var minute =Math.abs(time.getMinutes()-start.getMinutes());
  var second =Math.abs(time.getSeconds()-start.getSeconds());
  N=Math.floor(Math.random() * 11) + 10;
  message="Start "+N+" servers";
  document.getElementById('stopField').style.visibility='hidden';
  document.getElementById('reportField').style.visibility='hidden';
  document.getElementById('startField').style.visibility='visible';
  document.getElementById('startField').value=message;
  K=K+N;
  var edata = {name:"Start",message:N,program_time:time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(),actual_time:(hour <= 9 ? '0' + hour : hour)+':'+(minute <= 9 ? '0' + minute : minute)+":"+(second <= 9 ? '0' + second : second)}
  postData(edata);
  

}
function stopTask(){
  var time= new Date();
  var hour =(time.getHours()-start.getHours())+12;
  var minute =Math.abs(time.getMinutes()-start.getMinutes());
  var second =Math.abs(time.getSeconds()-start.getSeconds());
  n=Math.floor(Math.random()*(K+1)) + 5;
  message="Stop "+n+" servers"
  document.getElementById('startField').style.visibility='visible'
  document.getElementById('reportField').style.visibility='hidden'
  document.getElementById('stopField').style.visibility='visible'
  document.getElementById('stopField').value=message;
  var edata = {name:"Stop",message:n,program_time:time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(),actual_time:(hour <= 9 ? '0' + hour : hour)+':'+(minute <= 9 ? '0' + minute : minute)+":"+(second <= 9 ? '0' + second : second)}
  postData(edata);
  
  setTimeout(stopTask,40000);    
}
function reportTask(){
  var time= new Date();
  var hour =(time.getHours()-start.getHours())+12;
  var minute =Math.abs(time.getMinutes()-start.getMinutes());
  var second =Math.abs(time.getSeconds()-start.getSeconds());
  var time= new Date();
  if (K==N){
    K=N-n;
  }else{
    K=K-n;
  }
  message="Report "+K+" servers running";
  document.getElementById('startField').style.visibility="visible"
  document.getElementById('stopField').style.visibility='visible'
  document.getElementById('reportField').style.visibility='visible'
  document.getElementById('reportField').value=message;
  var edata = {name:"Report",message:K,program_time:time.getHours()+":"+time.getMinutes()+":"+time.getSeconds(),actual_time:(hour <= 9 ? '0' + hour : hour)+':'+(minute <= 9 ? '0' + minute : minute)+":"+(second <= 9 ? '0' + second : second)}
  postData(edata);
  setTimeout(reportTask,50000);  
}

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour =start.getHours()-now.getHours();
    var minute =start.getMinutes()-now.getMinutes();
    var second =start.getSeconds()-now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, -hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, -minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, -second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
//using AJAX to fetch data from an API
$('.apireq').click( function() {
   $.ajax({
    url : "http://localhost:8000/api/task",
    dataType: "json",
    success : function (data) {
      $('#reportTable').toggle();
      $('#reportTable tbody').empty();
      for(var i = 0; i< data.length; i++){  
        $('#reportTable tbody').append("<tr><td>" + data[i].program_time + "</td><td>" + data[i].name + "</td><td>" + data[i].message + "</td><td>" + data[i].actual_time + "</td></tr>");
      }  
    }
    });
    
  });

 function postData(rdata){
   $.ajax({
      url : "http://localhost:8000/api/task/",
      type: "POST",
      beforeSend: function (request)
      {
          request.setRequestHeader("X-CSRF-TOKEN", csrftoken);
      },
      contentType: "application/json",
      data: JSON.stringify(rdata),
      success: function(){
          console.log("successful");
      },
      failure: function() {
          console.log("sorry error occured");
      }
    });  
  }
  
