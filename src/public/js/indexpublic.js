const socket = io() //configurar para poder usar socket del lado del cliente

socket.emit("message", "Hola, como estás server")