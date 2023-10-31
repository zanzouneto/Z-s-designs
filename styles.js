const cursor1 = document.getElementById("cursor1");
const cursor2 = document.getElementById("cursor2");

document.addEventListener('mousemove', function(e) {
    let x = e.clientX;
    let y = e.clientY;
    
    cursor1.style.left = x + 'px';
    cursor1.style.top = y + 'px';
    cursor2.style.left = x + 'px';
    cursor2.style.top = y + 'px';
});

// const cursor1 = document.getElementById("cursor1");
// const cursor2 = document.getElementById("cursor2");

// let mouseMoveDetected = false;

// document.addEventListener('mousemove', function() {
//     mouseMoveDetected = true;
//     showCursors();
// });

// setTimeout(() => {
//     if (!mouseMoveDetected) {
//         hideCursors();
//     }
// }, 2000);

// function showCursors() {
//     cursor1.style.display = "block";
//     cursor2.style.display = "block";
// }

// function hideCursors() {
//     cursor1.style.display = "none";
//     cursor2.style.display = "none";
// }
