var img = null;
var canvas;
var width;
var height;
function upload ()
{
    img = new  SimpleImage (document.getElementById('imageFile'));
    canvas = document.getElementById('canvas');
    img.drawTo(canvas)
    setTimeout(function() {
        var sizeBox = document.getElementById('sizeBox');
        width = img.getWidth();
        height = img.getHeight();
        sizeBox.innerHTML = "<p>Size: " + img.getWidth() + " x " + img.getHeight() + "</p>";
    }, 100);
}
function doGrey()
{
    var res_img = new SimpleImage (img);
    for (pixel of res_img.values())
    {
        var value = pixel.getRed() + pixel.getBlue() + pixel.getGreen();
        value /= 3;
        pixel.setGreen(value);
        pixel.setBlue(value);
        pixel.setRed(value);
    }
    res_img.drawTo(canvas);
}

function doRed()
{
    var res_img = new SimpleImage (img);
    for (pixel of res_img.values())
    {
        pixel.setRed(255);
    }
    res_img.drawTo(canvas);
}

function random(min, max) 
{
    var range = max - min;
    var rand = Math.random() * range;

    return rand + min;
}

function doBlur()
{
    var res_img = new SimpleImage (width, height);
    var value = document.getElementById('myRange').value;
    document.getElementById('sliderValue').innerText = value;
    for ( pixel of img.values())
    {
        var rand1 = random(0,1);
        if (rand1 <= 0.5)
        {
            res_img.setPixel(pixel.getX(), pixel.getY(), pixel);
        }
        else
        {
            var rand2 = random(0,value);
            var rand3 = random(0,value);
            var x1 = pixel.getX()- rand2;
            var y1 = pixel.getY() - rand3;
            if (x1 < 0 ) x1 = 0;
            if (y1 < 0) y1 = 0;
            if (x1 >= width -1 ) x1 = width -1;
            if (y1 >= height - 1) y1 = height -1;
            res_img.setPixel(pixel.getX(), pixel.getY(), img.getPixel(x1,y1));
        }
    }
    res_img.drawTo(canvas);
}