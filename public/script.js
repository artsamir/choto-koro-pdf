document.getElementById("compressBtn").addEventListener("click", function() {
    const fileInput = document.getElementById("fileInput");
    const percentageSelect = document.getElementById("percentageSelect");
    const dpiSelect = document.getElementById("dpiSelect");

    const file = fileInput.files[0];
    const selectedPercentage = percentageSelect.value;
    const selectedDpi = dpiSelect.value;

    if (file) {
        // Simulating PDF compression process
        alert("Compressing PDF...\n" + 
              "File: " + file.name + "\n" + 
              "Resize Percentage: " + selectedPercentage + "%\n" + 
              "DPI: " + selectedDpi);
        
        // Simulating successful compression
        setTimeout(function() {
            alert("Compression Completed!\n" + 
                  "Your PDF file has been successfully compressed.\n" + 
                  "You can now download the compressed file.");
        }, 2000);  // Simulate a delay of 2 seconds for the compression
    } else {
        alert("Please select a PDF file first.");
    }
});
