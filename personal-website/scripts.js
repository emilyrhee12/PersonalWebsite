// scripts.js — tiny enhancements: active nav + contact form validation

// Highlight current page in the nav for accessibility
(function setActiveNav(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const target = a.getAttribute('href');
    if (target === here) {
      a.setAttribute('aria-current','page');
      a.classList.add('active');
    }
  });
})();

// Contact form validation (Confirm Password match + custom messages)
(function contactValidation(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  const first = document.getElementById('firstName');
  const last = document.getElementById('lastName');
  const email = document.getElementById('email');
  const pass = document.getElementById('password');
  const confirm = document.getElementById('confirmPassword');

  const err = id => document.getElementById('error-' + id);
  const show = (id, msg) => { const el = err(id); if(el){ el.textContent = msg; } };
  const clear = id => show(id, '');

  function checkConfirm(){
    if (confirm.value !== pass.value){
      show('confirmPassword', 'Passwords must match.');
      confirm.setAttribute('aria-invalid','true');
      return false;
    } else {
      clear('confirmPassword');
      confirm.removeAttribute('aria-invalid');
      return true;
    }
  }

  confirm.addEventListener('input', checkConfirm);
  pass.addEventListener('input', checkConfirm);

  [first,last,email,pass].forEach(input => {
    input.addEventListener('invalid', () => {
      // Use browser message but ensure it's visible in our error slot
      show(input.id, input.validationMessage);
      input.setAttribute('aria-invalid','true');
    });
    input.addEventListener('input', () => {
      if(input.checkValidity()){
        clear(input.id);
        input.removeAttribute('aria-invalid');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    // Let the browser do built-in checks first
    if(!form.checkValidity()){
      // Trigger native UI + keep messages visible
      return;
    }
    if(!checkConfirm()){
      e.preventDefault();
      return;
    }
    // If all good, allow normal navigation to thankyou.html via action attr
  });
})();