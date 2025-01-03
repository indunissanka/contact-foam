document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (name === '' || email === '' || message === '') {
    showResponse('Please fill in all fields', 'error');
    return;
  }
  
  if (!validateEmail(email)) {
    showResponse('Please enter a valid email address', 'error');
    return;
  }
  
  try {
    const response = await fetch('https://contact-form-worker.indunissanka.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
      showResponse('Message sent successfully!', 'success');
      document.getElementById('contactForm').reset();
    } else {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    showResponse('Failed to send message. Please try again.', 'error');
    console.error('Error:', error);
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function showResponse(message, type) {
  const responseElement = document.getElementById('responseMessage');
  responseElement.textContent = message;
  responseElement.style.color = type === 'error' ? '#dc3545' : '#28a745';
}
