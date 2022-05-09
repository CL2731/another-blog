const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const users = document.querySelector('#us-login').value.trim();
    const password = document.querySelector('#pas-login').value.trim();
  
    if (users && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ users, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  const signupFormHandler = async (event) => {
      event.preventDefault();

      const username = document.querySelector('#us-signup').value.trim();
      const password = document.querySelector('#pas-signup').value.trim();

      if(username && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
            headers: {'Content-Type': 'application/json'},
        });
    
        if(response.ok) {
            document.location.replace('/');
        } else {
            alert('Could not sign up.');
        }
      }
  };

  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);