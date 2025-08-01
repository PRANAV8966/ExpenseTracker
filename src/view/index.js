const ip = 'YOUR_IP';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.signup-form');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axios.post(`http://${ip}:3000/api/signUp`, {
        name,
        email,
        password
      });
      alert('Registration successful!');
      form.reset();
    } catch (error) {
      alert('Registration failed!');
    }
     });
});