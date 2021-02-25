$(document).ready(function(){
    $("#file_in").on('change',function(){
        //do whatever you want
        try{//console.log("clicked")
			var file_in = document.getElementById('file_in');
			var file_name = document.getElementById('file_name');
			file_name.textContent = file_in.files[0]["name"] + "  Selected!";
		}catch(TypeError){
			alert("Please select a file!")
		}
    });
});


function readFileInputEventAsArrayBuffer(file, callback) {
        
        var reader = new FileReader();
        
        reader.onload = function(loadEvent) {
            var arrayBuffer = loadEvent.target.result;
            callback(arrayBuffer);
        };
        
    	reader.readAsArrayBuffer(file);
}

function displayResult(result){
	document.getElementById("output").innerHTML = result.value;

}

function handleFileSelect(file) {
        readFileInputEventAsArrayBuffer(file, function(arrayBuffer) {
            mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then(displayResult)
                .done();
        });
}

function handleDownloadFileSelect() {
        readFileInputEventAsArrayBuffer(document.getElementById("file_in").files[0], function(arrayBuffer) {
            mammoth.convertToHtml({arrayBuffer: arrayBuffer})
                .then(download)
                .done();
        });
}

function download(result){
	// file download
	var filename = file_in.files[0]["name"] + ".html";

	var blob = new Blob([result.value], {
	 type: "text/html"
	});

	saveAs(blob, filename);
	}

function submit(){

	
	handleFileSelect(file_in.files[0])
	document.getElementById("download").disabled = false
	
               
}