let tx = document.querySelector('.random-color')


function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColor(){
    tx.style.color= getRandomColor();
}

setInterval(changeColor,500);