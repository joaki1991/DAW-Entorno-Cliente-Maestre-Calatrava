$(() => {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[16];
  const buttons = divExamples.getElementsByClassName('tab-pane')[6].getElementsByTagName('button');

  function lottery() {
    $('#loto').show();
    const Prize = (function () {
      let instantiated;

      function init() {
        let number = null;
        return { // Devuelve el objeto que será único.
          setNumber() {
            number = Math.floor(Math.random() * 100000);
          },
          getNumber() {
            const ciphers = [];
            let tmpNumber = number;
            for (let i = 4; i >= 0; i--) {
              ciphers[i] = tmpNumber % 10;
              tmpNumber = Math.floor(tmpNumber / 10);
            }
            return ciphers;
          },
        };
      }
      return {
        getInstance() {
          if (!instantiated) {
            instantiated = init();
          }
          return instantiated;
        },
      };
    }());

    $('#b-start').click(function () {
      Prize.getInstance().setNumber();
      $('#game').show();
      $(this).attr('disabled', 'true');
      const ciphers = $('#ciphers').find('input');
      $(ciphers).css('background', 'white');
      $('#ciphers').find('input').get(0).focus();
      $('#b-guess').removeAttr('disabled');
      alert(Prize.getInstance().getNumber());
    });

    function checkNumber(cipher, num) {
      // alert(num + " " + cipher);
      if (cipher < num) return 'red';
      if (cipher > num) return 'blue';
      if (cipher === num) return 'green';
    }

    $('#b-guess').click(function () {
      let winning = true;
      const ciphers = $('#ciphers').find('input');
      let color;
      const numbers = Prize.getInstance().getNumber();
      for (let i = 0; i < 5; i++) {
        console.log(numbers);
        color = checkNumber(Number.parseInt($(ciphers[i]).val()), numbers[i]);
        if (color !== 'green') winning = false;
        $(ciphers[i]).css('background', color);
      }
      if (winning) {
        $('#output').text(`El número ganador es: ${numbers.join('')}`).show();
        $(this).attr('disabled', 'true');
        $('#b-start').removeAttr('disabled');
      } else {
        $('#ciphers').find('input').get(0).focus();
      }
    });
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra ejercicio de la lotería.');
    lottery();
  });

  function searchExercise() {
    $('#search').show();
    $('#b-search').on('keyup', function () {
      const value = $(this).val().toLowerCase();
      const rows = $('#players tr');
      rows.filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });

      const hideRows = $('#players tr[style = "display: none;"]');
      if (hideRows.length === rows.length) {
        if ($('#players').parent().next().length === 0) $('#players').parent().after($('<div>No hay registros emparejados al criterio de búsqueda.</div>'));
      } else {
        $('#players').parent().next().remove();
      }
    });
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra ejercicio del buscador.');
    searchExercise();
  });
});
