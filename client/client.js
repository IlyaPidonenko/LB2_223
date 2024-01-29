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
  .then(response => response.json())
  .then(data => {
    console.log(data);
    loadPosts();
    alert(data.message);

    // Nach erfolgreichem Tweet erst anzeigen
    
  })
  .catch(error => console.error('Fehler bei der Anfrage:', error));
};

function loadPosts() {
  fetch('/getPosts')
      .then(response => response.json())
      .then(posts => {
          console.log('Geladene Posts:', posts); // Debug-Ausgabe
          postsContainer.innerHTML = ''; // Container leeren
          posts.forEach(post => {
              const postElement = document.createElement('div');
              postElement.innerText = `${post.text}`;
              postsContainer.appendChild(postElement);
          });
      })
      .catch(error => {
          console.error('Fehler beim Laden der Posts:', error);
      });
}

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
    alert(data.message);
    window.location.href = './home.html';
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
