var myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1
}

pdfjsLib.getDocument('NatGasPrice.pdf').then((pdf) => {
 
    // more code here
    myState.pdf = pdf;
    render();

});

function render() {
    myState.pdf.getPage(myState.currentPage).then((page) => {
 
        // more code here
        var canvas = document.getElementById("pdf_renderer");
        var ctx = canvas.getContext('2d');

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        page.render({
            canvasContext: ctx,
            viewport: viewport
        });
    });
}