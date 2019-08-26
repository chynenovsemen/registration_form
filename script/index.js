'use strict'

window.onload = () => {
  
  // creating floating labels in html form inputs
  const FloatLabel = (() => {

      // adding active class and placeholder
      const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
        target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
      };
      
      // removing active class and placeholder
      const handleBlur = (e) => {
        const target = e.target;
        if(!target.value) {
          target.parentNode.classList.remove('active');
        }
        target.removeAttribute('placeholder');
      };

      // registering events
      const bindEvents = (element) => {
        const floatField = element.querySelector('input');
        floatField.addEventListener('focus', handleFocus);
        floatField.addEventListener('blur', handleBlur);
      };
      
      // getting DOM elements
      const init = () => {
        const floatContainers = document.querySelectorAll('.inputWrapper');

        floatContainers.forEach((element) => {
          if (element.querySelector('input').value) {
              element.classList.add('active');
          }
          
          bindEvents(element);
        });
      };

      return {
        init: init
      };
    })();
  
  FloatLabel.init();

  // fetching data to the server
  const signUpForm = document.getElementById('signUp');
  const url = 'http://codeit.ai/codeitCandidates/serverFrontendTest/user/registration';
  
  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById('signUp'));
    const searchParams = new URLSearchParams();

    for (const pair of formData) {
      searchParams.append(pair[0], pair[1]);
    }

    fetch(url, {
      method: 'post',
      body: searchParams,
    }).then(res => res.json())
      .then(data => {
        if (data.status === 'OK') {
          window.location.href = 'companies.html';
        } else {
          alert(data.message);
        }
      })
      .catch(err => console.error('Something went wrong:', err));
  });

};
