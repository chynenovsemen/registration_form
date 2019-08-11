"use strict"

function Float() {

  const FloatLabel = (() => {

      // add active class and placeholder
      const handleFocus = (e) => {
        const target = e.target;
        target.parentNode.classList.add('active');
        target.setAttribute('placeholder', target.getAttribute('data-placeholder'));
      };
      
      // remove active class and placeholder
      const handleBlur = (e) => {
        const target = e.target;
        if(!target.value) {
          target.parentNode.classList.remove('active');
        }
        target.removeAttribute('placeholder');
      };

      // register events
      const bindEvents = (element) => {
        const floatField = element.querySelector('input');
        floatField.addEventListener('focus', handleFocus);
        floatField.addEventListener('blur', handleBlur);
      };
      
      // get DOM elements
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
  
  }