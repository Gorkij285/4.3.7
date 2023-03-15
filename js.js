let mas
async function searchGithub(user){
  await fetch(`https://api.github.com/search/repositories?q=${user}+in:name&sort=stars`)
    .then(data => data.json())
    .then(d => {
      console.log(d.items.slice(0,5))
      mas = null
      mas = d.items.slice(0,5)
  })
}

/////////////////////

console.log('Hello world!')
const input = document.querySelector('input')

const inputBox = document.querySelector('.input-box')

let searchDiv = document.createElement('div')
searchDiv.classList.add('search')

////////////////////

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => { fn.apply(this, arguments) }      // дебаунс
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  };
}


async function onChange(e){
  let val = await e.target.value
  if(val){
    searchDiv.innerHTML = ''
    await searchGithub(val)
  } else {
    searchDiv.innerHTML = ''
    mas = null
  }
  console.log(mas)
  for(let rep of mas){
    let li = document.createElement('li')
    li.textContent = rep.name
    searchDiv.append(li)
  }
  inputBox.append(searchDiv)
}             
                                              // ВВОД ДАНЫХ С ЗАДЕРЖКОЙ

onChange = debounce(onChange,700)

input.addEventListener('keyup', onChange)   // обработчик на INPUT

//----------------------------------------------------------------------------------------------//

inputBox.addEventListener('click',clickLi)

function clickLi(ev) {
  if(ev.target.tagName != 'LI') return        // клик по LI
  console.log(ev.target.textContent)
  const liDiv = document.createElement('div')
  liDiv.classList.add('li-div')
  const p = document.createElement('p')
  mas.forEach(el => {
    if(el.name === ev.target.textContent) {
      let vst = `Name: ${el.name}<br>Owner:  ${el.full_name.split('/')[0]}<br>Stars:  ${el.forks}`
      liDiv.insertAdjacentHTML("afterbegin", `<p>${vst}</p>`)
    }
  })
  const cross = document.createElement('div')
  cross.classList.add("cl-btn-7")
  liDiv.append(cross)
  const conteiner = document.querySelector('.conteiner')
  conteiner.append(liDiv)
}
//////////////////////

const conteiner = document.querySelector('.conteiner')

conteiner.addEventListener('click', crossEnd)

function crossEnd(e){
  const target = e.target
  if(target.tagName != 'DIV') return
  if(target.className !== "cl-btn-7") return
  console.log(target)
  const liDiv = document.querySelector('.li-div')
  const par = target.parentNode
  console.log(par)
  par.remove()
}