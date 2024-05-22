// Lắng nghe sự kiện click cho nút "Process Image"
document.getElementById('processButton').addEventListener('click', handleImg,false );

function handleImg() {
    console.log("click")
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();
    const tolerance = parseInt(document.getElementById('tolerance').value);

    // Lấy file từ phần tử input "upload" khi nút được nhấn
    const file = document.getElementById('upload').files[0];
    if (!file) {
        alert('Please select an image.');
        return;
    }

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;   
            ctx.drawImage(img, 0 , 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];

                // If the pixel is green, make it transparent
                if (green > red + blue - tolerance && green > 100) {
                    data[i + 3] = 0;
                }        
            }
            ctx.putImageData(imageData, 0 , 0);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
}
