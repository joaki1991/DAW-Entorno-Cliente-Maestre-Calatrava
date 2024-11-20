function greeting() {
  return 'La ventana auxiliar dice hola.';
}

// Title
const message = document.getElementById('message');
const bTitle = document.createElement('button');
bTitle.classList.add('btn');
bTitle.classList.add('btn-primary');
bTitle.classList.add('m-1');
bTitle.innerHTML = 'Título';
bTitle.addEventListener('click', (event) => {
  if (window.opener) {
    message.innerText = window.opener.document.title;
  } else {
    message.innerText = 'La ventana se ha abierto directamente.';
  }
});
document.body.append(bTitle);

const bGreeting = document.createElement('button');
bGreeting.classList.add('btn');
bGreeting.classList.add('btn-primary');
bGreeting.classList.add('m-1');
bGreeting.innerHTML = 'Saludar';
bGreeting.addEventListener('click', (event) => {
  if (window.opener) {
    window.opener.document.getElementById('message').textContent = greeting();
  } else {
    message.innerText = 'La ventana se ha abierto directamente.';
  }
});
document.body.append(bGreeting);

const bGetGreeting = document.createElement('button');
bGetGreeting.classList.add('btn');
bGetGreeting.classList.add('btn-primary');
bGetGreeting.classList.add('m-1');
bGetGreeting.innerHTML = 'Obtener Saludo';
bGetGreeting.addEventListener('click', (event) => {
  if (window.opener) {
    message.innerText = window.opener.greeting();
  } else {
    message.innerText = 'La ventana se ha abierto directamente.';
  }
});
$(document.body).append(bGetGreeting);

const bClose = document.createElement('button');
bClose.classList.add('btn');
bClose.classList.add('btn-primary');
bClose.classList.add('m-1');
bClose.innerHTML = 'Cerrar ventana';
bClose.addEventListener('click', (event) => {
  if (window.opener) {
    window.close();
  } else {
    message.innerText = 'Solo podemos cerrar una ventana abierta por código.';
  }
});
$(document.body).append(bClose);
