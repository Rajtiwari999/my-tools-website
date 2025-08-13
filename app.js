// TEXT CONVERTER
function convertUpper() {
  document.getElementById("text-output").value =
    document.getElementById("text-input").value.toUpperCase();
}
function convertLower() {
  document.getElementById("text-output").value =
    document.getElementById("text-input").value.toLowerCase();
}
function convertTitle() {
  let input = document.getElementById("text-input").value.toLowerCase();
  document.getElementById("text-output").value = input
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// WORD COUNTER
function countWords() {
  let text = document.getElementById("wc-input").value.trim();
  let words = text.split(/\s+/).filter(w => w.length).length;
  let chars = text.length;
  document.getElementById("wc-result").innerText = 
    `Words: ${words} | Characters: ${chars}`;
}

// QR GENERATOR
function generateQR() {
  let qrText = document.getElementById("qr-input").value;
  if (!qrText) return alert("Please enter text or URL!");
  let qr = new QRious({ value: qrText, size: 200 });
  document.getElementById("qr-result").innerHTML = "";
  document.getElementById("qr-result").appendChild(qr.image);
}

// IMAGE COMPRESSOR
function compressImage() {
  let file = document.getElementById("img-input").files[0];
  if (!file) return alert("Please select an image!");
  
  let reader = new FileReader();
  reader.onload = function(e) {
    let img = new Image();
    img.src = e.target.result;
    img.onload = function() {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let scale = 0.5;
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(function(blob) {
        let info = `Original: ${(file.size/1024).toFixed(1)} KB | Compressed: ${(blob.size/1024).toFixed(1)} KB`;
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "compressed.jpg";
        link.innerText = "Download Compressed Image";
        document.getElementById("img-info").innerHTML = info + "<br>";
        document.getElementById("img-info").appendChild(link);
      }, "image/jpeg", 0.7);
    }
  }
  reader.readAsDataURL(file);
}
