"use strict"

// creating floating labels in html form inputs
window.onload = function Float() {

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

// companies page
// loaders
// let spinner = document.getElementById("spinner");
// function showSpinner() {
//   spinner.classList.add("show");
//   setTimeout(() => {
//     spinner.className = spinner.className.replace("show", "");
//   }, 5000);
// }

// function hideSpinner() {
//   spinner.className = spinner.className.replace("show", "");
// }

// fetching and processing data from the server
window.onload = function getAPI() {
  // showSpinner();
  fetch('http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList')
  .then(res => res.json())
  .then(data => {
    // hideSpinner();

    // processing data got from the server in this scope

    let companiesArr = data.list;

    // getting the total amount of companies and showing it in html
    document.getElementById('total').innerHTML = companiesArr.length;

    // showing the list of companies in html
    for (var i=0; i < companiesArr.length; i++) {
      document.getElementById('list').innerHTML += `<li class="listList" id='${i}'>` + companiesArr[i].name + '</li>';
      
    };
        
    document.getElementById('list').addEventListener('click', (e) => {
      if (e.target.tagName === 'LI'){
        let partners = companiesArr[`${e.target.id}`].partners;
        for (var i=0; i < partners.length; i++) {
          document.getElementById('partners').innerHTML += '<li>' + partners[i].name + ', ' + partners[i].value + '</li>';
        }
      }
    });

    let companiesList = document.getElementsByClassName('listList');

    for (var i=0; i < companiesList.length; i++) {
      companiesList[i].onclick = () => {
        [].forEach.call(companiesList, () => { 
          document.getElementById('partners').innerHTML = "";
        });
      }
    }
    
  })
};