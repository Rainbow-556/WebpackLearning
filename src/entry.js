// import './css/index.css'
import './css/style.less'
import headImg from './image/head.jpg'

console.log(headImg)
const img = document.createElement('img')
img.classList.add('head-img')
img.src = headImg
document.body.appendChild(img)
document.getElementById('title').innerHTML = 'Hello Webpack 4'
