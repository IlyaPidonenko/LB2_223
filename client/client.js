
document.addEventListener('DOMContentLoaded', () => {
  
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      sendLoginRequest(username, password);
    });
  }

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const username = document.getElementById('newUsername').value;
      const password = document.getElementById('newPassword').value;
      sendRegisterRequest(username, password);
    });
  }

  const tweetForm = document.getElementById('tweetForm');
  if (tweetForm) {
    tweetForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const content = document.getElementById('tweetContent').value;
      sendTweetRequest(content);
    });
  }
});



const sendTweetRequest = (content) => {
  fetch('/tweet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Fehler bei der Anfrage:', error));
};


const sendLoginRequest = (username, password) => {
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message); // Hier wird die Benachrichtigung angezeigt
    
    window.location.href = './home.html'; // Hier wird zur Home-Seite weitergeleitet
  })
  .catch(error => console.error('Fehler bei der Anfrage:', error));
};

const sendRegisterRequest = (username, password) => {
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Fehler bei der Anfrage:', error));
};