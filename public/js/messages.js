const selector = document.querySelector('select')
const messages = document.querySelectorAll('.message')
const view = document.querySelector('#message-view')

selector.addEventListener('change', e => {
  e.preventDefault()
  console.log(messages)
  let filter = e.target.value
  console.log(filter)
  if (filter === 'All') {
    while (view.firstChild) {
      view.firstChild.removeChild(view.firstChild)
    }
    console.log('here')
    messages.forEach(message => {
      let newMessage = document.createElement('div')
      view.appendChild(newMessage)
      newMessage.classList = 'message'
      newMessage.innerHTML = `<div class='card'>${message.innerHTML}</div>`
    })
  } else {
    while (view.firstChild) {
      view.removeChild(view.firstChild)
    }
  }
})
