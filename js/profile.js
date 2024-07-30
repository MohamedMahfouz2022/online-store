document.addEventListener('DOMContentLoaded', () => {
  const session = JSON.parse(localStorage.getItem('session'));
  if (!session) {
      alert('Please log in to access your profile');
      window.location.href = 'login.html';
      return;
  }

  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profilePassword = document.getElementById('profilePassword');
  const updateProfileButton = document.getElementById('updateProfileButton');

  profileName.value = session.name;
  profileEmail.value = session.email;

  updateProfileButton.addEventListener('click', () => {
      const updatedName = profileName.value;
      const updatedEmail = profileEmail.value;
      const updatedPassword = profilePassword.value;

      if (!updatedName || !updatedEmail || !updatedPassword) {
          alert('Please fill out all fields');
          return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const userIndex = users.findIndex(user => user.email === session.email);

      if (userIndex !== -1) {
          users[userIndex] = { name: updatedName, email: updatedEmail, password: updatedPassword };
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('session', JSON.stringify(users[userIndex]));
          alert('Profile updated successfully');
      } else {
          alert('User not found');
      }
  });
});
