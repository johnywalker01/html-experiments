//
// The workerSrc property shall be specified.
//
pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.228/pdf.worker.js';


function openFile(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var dataURL = reader.result;
        loadPdf(dataURL);
        
    };
    reader.readAsDataURL(input.files[0]);
};

function loadPdf(dataURL){
    //
    // Asynchronous download PDF
    //
    var loadingTask = pdfjsLib.getDocument(dataURL);
    loadingTask.promise.then(function (pdf) {
        //
        // Fetch the first page
        //
        pdf.getPage(1).then(function (page) {
            var scale = 1.0;
            var viewport = page.getViewport({ scale: scale, });
            //
            // Prepare canvas using PDF page dimensions
            //
            var canvas = document.getElementById('the-canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            //
            // Render PDF page into canvas context
            //
            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            page.render(renderContext);
        });
    });
}