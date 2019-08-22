'use strict'

// creating floating labels in html form inputs
function Float() {

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
  
};
