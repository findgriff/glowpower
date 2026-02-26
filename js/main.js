document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('nav');
  var hamburger = document.querySelector('nav .hamburger');
  var mobileMenu = document.querySelector('nav .mobile-menu');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if (hamburger && mobileMenu) {
    var toggleMenu = function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    };

    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  var scrollToTop = document.querySelector('.scroll-to-top');
  if (!scrollToTop) {
    scrollToTop = document.createElement('div');
    scrollToTop.className = 'scroll-to-top';
    document.body.appendChild(scrollToTop);
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollToTop.classList.add('visible');
    } else {
      scrollToTop.classList.remove('visible');
    }
  });

  scrollToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  setupLeadForms();
  initLazyImages();
  initFadeUp();
  initSmoothScroll();
});

function setupLeadForms() {
  var leadForms = document.querySelectorAll('form[data-lead-form]');
  leadForms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var fields = {
        name: form.querySelector('[name="name"]'),
        company: form.querySelector('[name="company"]'),
        email: form.querySelector('[name="email"]'),
        phone: form.querySelector('[name="phone"]'),
        spend: form.querySelector('[name="spend"]'),
        message: form.querySelector('[name="message"]')
      };

      if (!fields.name || !fields.company || !fields.email || !fields.phone || !fields.spend) {
        console.error('Lead form is missing required fields.');
        return;
      }

      var formData = {
        name: fields.name.value.trim(),
        company: fields.company.value.trim(),
        email: fields.email.value.trim(),
        phone: fields.phone.value.trim(),
        spend: fields.spend.value,
        message: fields.message ? fields.message.value.trim() : ''
      };

      if (!validateForm(formData)) {
        alert('Please fill in all required fields with valid data.');
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) {
        return;
      }

      var originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var accessKeyInput = form.querySelector('[name="access_key"]');
      var accessKey = accessKeyInput ? accessKeyInput.value : '';
      if (!accessKey) {
        alert('Form is not configured correctly. Please contact support.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
      }

      var payload = {
        access_key: accessKey,
        subject: 'New inquiry from Glow Power website',
        from_name: formData.name,
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        spend: formData.spend,
        message: formData.message,
        page_url: window.location.href
      };

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json().then(function (result) {
            return {
              ok: response.ok,
              result: result
            };
          });
        })
        .then(function (responseData) {
          if (responseData.ok && responseData.result && responseData.result.success) {
            submitBtn.textContent = "Message sent. We'll respond within 2 business hours.";
            form.reset();
            setTimeout(function () {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }, 5000);
            return;
          }

          throw new Error(
            (responseData.result && responseData.result.message) || 'Web3Forms request failed'
          );
        })
        .catch(function (error) {
          console.error('Error sending form:', error);
          alert('Error sending message. Please try again.');
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });
  });
}

function initLazyImages() {
  var lazyImages = document.querySelectorAll('img[data-src]');
  if (!lazyImages.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(function (img) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries, io) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      var target = entry.target;
      target.src = target.dataset.src;
      target.removeAttribute('data-src');
      io.unobserve(target);
    });
  }, { rootMargin: '50px' });

  lazyImages.forEach(function (img) {
    observer.observe(img);
  });
}

function initFadeUp() {
  var fadeUpElements = document.querySelectorAll('.fade-up');
  if (!fadeUpElements.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    fadeUpElements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var fadeObserver = new IntersectionObserver(function (entries, io) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1 });

  fadeUpElements.forEach(function (el, index) {
    el.style.transitionDelay = String(index * 80) + 'ms';
    fadeObserver.observe(el);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var href = this.getAttribute('href');
      if (!href || href === '#') {
        return;
      }

      var target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function validateForm(data) {
  if (!data.name || !data.email || !data.company || !data.phone || !data.spend) {
    return false;
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }

  var phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(data.phone)) {
    return false;
  }

  return true;
}
