const style = document.body.style;
style.margin = '0';
style.padding = '0';
style.overflow = 'hidden';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);