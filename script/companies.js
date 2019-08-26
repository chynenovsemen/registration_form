'use strict'

// companies page
// fetching and processing data from the server
window.onload = function getAPI() {
  // showing loaders
  document.getElementById('total').style.display = 'none';
  document.getElementById('loader1').style.display = 'block';
  document.getElementById('loader2').style.display = 'block';

  fetch('http://codeit.ai/codeitCandidates/serverFrontendTest/company/getList')
  .then(res => res.json())
  .then(data => {
    // processing data got from the server in this scope
    let companiesArr = data.list;
    
    // hiding total companies' loaders
    document.getElementById('loader1').style.display = 'none';
    document.getElementById('total').style.display = 'flex';

    // getting the total amount of companies and showing it in html
    document.getElementById('total').innerHTML = companiesArr.length;
    
    // hiding loaders of the list of companies
    document.getElementById('loader2').style.display = 'none';

    // showing the list of companies in html
    for (let i=0; i < companiesArr.length; i++) {
      document.getElementById('list').innerHTML += `<li class="arrElement" id='${i}'>` + companiesArr[i].name + '</li>';
      
    };
    
    document.getElementById('list').addEventListener('click', (e) => {
      if (e.target.tagName === 'LI'){
        let partners = companiesArr[`${e.target.id}`].partners;
        
        for (let i=0; i < partners.length; i++) {
          document.getElementById('partners').innerHTML += '<li><div>' + partners[i].name + '</div>' + '<div id ="percentage">' + partners[i].value + '%' + '</div></li>';
          document.getElementById(`${e.target.id}`).style.backgroundColor = '#ccc';
          document.getElementById('partnersSection').style.display = 'block';
        }

        // hiding partners of the previous company
        let companiesList = document.getElementsByClassName('arrElement');

        for (let i=0; i < companiesList.length; i++) {
          companiesList[i].addEventListener('click', () => { 
            document.getElementById('partners').innerHTML = '';
            document.getElementById(`${e.target.id}`).style.backgroundColor = null;
          });
        }

      }

    });

  })
};

// hiding partners' section
$(document).ready(function() {
  $('#list').on('click', () => {
      $('#partnersSection:not(".hide")').stop().fadeOut('slow', () => {
          $(this).addClass('hide');
          $('#partnersSection').fadeIn('slow').removeClass('hide');
      });
    });
  $(document).on('click', (e) => {
    var $trigger = $('#list, #partnersSection');
    if($trigger !== e.target && !$trigger.has(e.target).length) {
      $('#partnersSection').fadeOut('fast').addClass('.hide');
    };
  });
});
