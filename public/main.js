const socket = io()


const divMessages = document.querySelector('#messages')
socket.on('messages', (messages) =>{
    divMessages.innerHTML = messages.map(message =>{
        return(
           `<div>
           <h4>${message.user}</h4>
           <p>${message.msg}</p>
           </div>` 
        )
    }).join('')
})