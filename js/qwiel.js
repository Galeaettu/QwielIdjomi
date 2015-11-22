function dateName()
{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var secs= date.getSeconds();
	var mins= date.getMinutes();
	var hours = date.getHours();
	
	var currentDateTime = "Qawl_"+year+"-"+month+"-"+day+"_"+hours+""+mins+""+secs;
	
	document.getElementById("imageLink").download = currentDateTime;
	return currentDateTime;
}

function getKliem() {
    var kliem = document.forms["kliemForm"]["kliem"].value;
    kliem = kliem.valueOf();
    return kliem;
}

function getScale() {
    var scale = document.forms["kliemForm"]["scale"].value;
    return scale;
}

function getTemplate() {
    var template = document.forms["kliemForm"]["template"].value;
    return template;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}


function generateKliem(sentence, scale, templateImage) {
	var templateImage = getTemplate();
	var imageObj = new Image();
	imageObj.addEventListener("load", function() {
	    sentence = getKliem();
	    var canvas = document.getElementById('myCanvas');
	    var context = canvas.getContext('2d');
	    var maxWidth = 780;
	    var lineHeight = 140;
	    var x = (canvas.width - maxWidth) / 2;
	    var y = 445;
	    var lineCount = 1;
	    var text = sentence;
	
	    context.font = '90pt Franklin Gothic, Franklin Gothic Medium, Arial Narrow, Arial Black, Arial, Sans-Serif';
	    context.fillStyle = '#000';
	    
	    
	    function moveText(scale)
	    {
	    	var canvas = document.getElementById('myCanvas');
	        var context = canvas.getContext('2d');
	        scale = getScale();                  
	        context.clearRect(0, 0, 1000, 1000);         
	        context.drawImage(imageObj, 0, 0, 1000, 1000);
	        context.setTransform(1,0,0,1,0,scale);
	        context.save();
	    }
	    
	    function changeInner()
	    {
	    	context.save();
	    	moveText(scale);
	    	context.save();
	    	context.restore();
	    	context.restore();
	    	wrapText(context, text, x, y, maxWidth, lineHeight);
	    	context.restore();
	    }
	    
	    var textMove = document.getElementById("scale");
	    textMove.addEventListener('change', function(){    	
	    	changeInner();
	    });
	    
	    var changeForm = document.getElementById("textForm");
	    changeForm.addEventListener("keydown", function(){
	    	context.clearRect(0, 0, 1000, 1000);
	    	changeInner();
	    });
	    
	    
	
	    var dataURL = canvas.toDataURL();
	    document.getElementById('canvasImg').src = dataURL;
	    document.getElementById('imageLink').href = dataURL;
	    dateName();
	    return dataURL;
	}, false);
	if (templateImage == "template1")
	{
		imageObj.src = 'images/template1.png';
	}
	if (templateImage == "template2")
	{
		imageObj.src = 'images/template2.png';
	}
	//imageObj.src = 'images/'+templateImage+'.png';
}

