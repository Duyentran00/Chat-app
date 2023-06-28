const person1SelectorBtn = document.querySelector('#person1-selector')
const person2SelectorBtn = document.querySelector('#person2-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => {
    const messageClass = message.sender === 'Person1' ? 'blue-bg' : 'teal-bg';
  
    return `
      <div class="message ${messageClass}">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
      </div>
    `;
};

window.onload = () => {
    messages.forEach((message) => {
        chatMessages.innerHTML += createChatMessageElement(message)
    })
}

let messageSender = 'Person1'

const updateMessageSender = (name) => {
    messageSender = name
    chatHeader.innerText = `${messageSender} chatting...`
    chatInput.placeholder = `Type here, ${messageSender}...`

    if (name === 'Person1') {
        person1SelectorBtn.classList.add('active-person')
        person2SelectorBtn.classList.remove('active-person')
    }
    if (name === 'Person2') {
        person2SelectorBtn.classList.add('active-person')
        person1SelectorBtn.classList.remove('active-person')
    }

    /* auto-focus the input field */
    chatInput.focus()
}

person1SelectorBtn.onclick = () => updateMessageSender('Person1')
person2SelectorBtn.onclick = () => updateMessageSender('Person2')

const sendMessage = (e) => {
    e.preventDefault()

    const timestamp = new Date().toLocaleString('vi-VN', { 
        hour: 'numeric', 
        minute: 'numeric', 
        hour24: true 
    })
    
    const message = {
        sender: messageSender,
        text: chatInput.value,
        timestamp,
    }

    /* Save message to local storage */
    messages.push(message)
    localStorage.setItem('messages', JSON.stringify(messages))

    /* Add message to DOM */
    chatMessages.innerHTML += createChatMessageElement(message)

    /* Clear input field */
    chatInputForm.reset()

    /*  Scroll to bottom of chat messages */
    chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
    localStorage.clear()
    chatMessages.innerHTML = ''
})