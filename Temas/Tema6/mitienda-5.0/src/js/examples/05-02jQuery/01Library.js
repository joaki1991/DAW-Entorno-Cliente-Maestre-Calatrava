$(document).ready(() => {
  console.log('Documento DOM cargado1');
});

$(() => {
  console.log('Documento DOM cargado2');
});

document.addEventListener('DOMContentLoaded', () => console.log('DOMContentLoaded'));

window.onload = function () {
  console.log('window.onload');
};

$(() => {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[16];
  const buttons = divExamples.getElementsByClassName('tab-pane')[0].getElementsByTagName('button');

  function showCategories() {
    $('#categories').show();
  }
  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Método show()');
    $$result.log('Mostramos las categorías.');
    showCategories();
  });

  function hideCategories() {
    $('#categories').hide();
  }
  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Método hide()');
    $$result.log('Ocultar las categorías.');
    hideCategories();
  });

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Métodos text() y html()');
    $$result.log('Mostramos texto en el banner.');
    $('#message').text('Texto normal');
    $('#message2').html('Texto <span class="text-primary">HTML</span>');
    hideCategories();
  });
});

/*
(function ($) {
  console.log('Compartir $ con otras librería.');
  $('#categories').hide();
}(jQuery));

const jq = $.noConflict();
jq(() => {
  console.log('Nuevo prefijo.');
});
*/
