
const btn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const modal = document.querySelector('.modal-window')
const container = document.querySelector('.container')
const backToTop = document.querySelector('.top')
const nav = document.querySelector('.nav')
const navBtn = document.getElementsByClassName("menu")
const navBar = document.getElementsByClassName("dropdown-content")

function openModal(){
  modal.classList.add('show')
  container.classList.add('show')
  btn.classList.add('hidden')
  backToTop.classList.add('hidden')
  document.body.style.overflow = 'hidden'
  // document.body.style.padding = '13px'
  console.log(document.body.clientWidth)
  
}
function closeModal(){
  modal.classList.remove('show')
  container.classList.remove('show')
  btn.classList.remove('hidden')
  // backToTop.classList.remove('hidden')
  document.body.style.overflow = "auto"
  console.log(document.body.clientWidth)

}
function toTop(){
 document.documentElement.scrollTo({top:0, left:0, behavior: 'smooth'})
}
function scrollAct(){
  const pageYOffset = window.pageYOffset

  if(pageYOffset > 0 && pageYOffset < 60){
    backToTop.classList.add('hidden')
    nav.classList.add('hidden')
  }else if(pageYOffset >= 60){
    backToTop.classList.remove('hidden')
    nav.classList.remove('hidden')
  }
  // console.log(window.pageYOffset)
}
  
btn.addEventListener('click', openModal)
closeBtn.removeEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)
backToTop.addEventListener('click', toTop)
window.addEventListener('scroll', scrollAct)

window.onload = ()=> {
  backToTop.classList.add('hidden')
  nav.classList.add('hidden')
}

function showNav(e){
  const target = e.target.className
  if(target === 'first'){
    let first = document.querySelector('.first')
    first.style.display = 'block'
    console.log(target)
  }else if(target === 'seconde'){
    let second = document.querySelector('.second')
    second.style.display = 'block'
    console.log(target)
  }else if(target === 'third'){
    let third = document.querySelector('.third')
    third.style.display = 'block'
    console.log(target)
  }else{
    let fourth = document.querySelector('.fourth')
    fourth.style.display = 'block'
    console.log(target)
  }
}
nav.addEventListener('mouseover', showNav)