$(() => {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[16];
  const buttons = divExamples.getElementsByClassName('tab-pane')[5].getElementsByTagName('button');

  function interestLinksExample() {
    const links = $('#footer div.row div:nth-child(2) ul');
    const input = $('<input>').attr({
      type: 'text',
      id: 'new-link',
      placeholder: 'Nuevo enlace',
    });
    const button = $('<button></button>').text('Añadir');
    links.after(button);
    links.after(input);

    button.click(() => {
      const input = $('#new-link');
      if (input.val().length > 4) {
        const links = $('#footer div.row div:nth-child(2) ul');
        const li = $('<li></li>');
        const anchor = $('<a></a>').attr({
          href: '#',
        }).text(input.val());
        const i = $('<i></i>').addClass('bi bi-chevron-right');
        li.append(i, anchor);
        links.append(li);
      } else {
        alert('La longitud debe ser de al menos 5 caracteres.');
      }
    });
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añadir enlaces de interés');
    if ($('#new-link').length === 0) interestLinksExample();
  });

  function fullScreenImageEvent() {
    const categories = $('#categories');
    const images = categories.find('img');

    function imageFullScreen() {
      if (this.requestFullscreen) {
        this.requestFullscreen();
      }
    }

    images.click(imageFullScreen);
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Imágenes categorías en pantalla completa');
    fullScreenImageEvent();
  });

  function testOnEvent() {
    const categories = $('#categories');
    const images = categories.find('img');

    function imageFullScreen() {
      if (this.requestFullscreen) {
        this.requestFullscreen();
      }
    }

    images.on('click', imageFullScreen);
    images.on('click', function () {
      $(this).css('border', '5px solid blue');
    });
    images.on({
      mouseenter() {
        $(this).css('border', '5px solid red');
      },
      mouseleave() {
        $(this).css('border', 'none');
      },
    });

    // images.off('click', imageFullScreen);
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Bordes en imágenes');
    testOnEvent();
  });

  function testOneEvent() {
    const categories = $('#categories');
    const images = categories.find('img');

    function imageFullScreen() {
      if (this.requestFullscreen) {
        this.requestFullscreen();
      }
    }

    images.one('click', imageFullScreen);
    images.one('click', function () {
      $(this).css('border', '5px solid blue');
    });
    images.on({
      mouseenter() {
        $(this).css('border', '5px solid red');
      },
      mouseleave() {
        $(this).css('border', 'none');
      },
    });
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Imagen de categorías a tamaño completo un única vez.');
    testOneEvent();
  });

  function testEventData() {
    const categories = $('#categories > div.row > div');
    const images = categories.find('img');
    const info = categories.find('div.cat-list-text');
    function showInfo(event) {
      const name = $(event.data[0]).find('h3').text();
      alert(`Categoría: ${name} Posición: ${event.data[1].index}`);
      event.stopPropagation();
    }

    for (let i = 0; i < images.length; i++) {
      $(images[i]).click([info[i], { index: i }], showInfo);
    }
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Pasamos información de cada categoría al evento.');
    testEventData();
  });

  window.testClickEvent = function () {
    const banner = $('.banner');
    const div = $('<div></div>').attr('id', 'references').css('border', '5px solid red');
    banner.after(div);
    banner.click((event) => {
      let str = '';
      str = `offsetX: ${event.offsetX} offsetY: ${event.offsetY}<br>`;
      str += `clientX: ${event.clientX} clientY: ${event.clientY}<br>`;
      str += `pageX: ${event.pageX} pageY: ${event.pageY}<br>`;
      str += `screenX: ${event.screenX} screenY: ${event.screenY}<br>`;
      div.html(str);
    });
  };

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra posición del ratón al cliquear en el banner.');
    testClickEvent();
  });

  function testMouseEnterEvent() {
    const categories = $('#categories');
    const divImages = categories.find('.cat-list-image');

    function showDimensions(event) {
      const dimensionsDiv = $('<div></div>')
        .addClass('border border-primary p-2')
        .css({
          background: '#f5f5f5',
          width: '150px',
          position: 'absolute',
          zIndex: '1',
          top: `${event.offsetY + 5}px`,
          left: `${event.offsetX + 5}px`,
        });

      const str = `offsetWidth: ${$(this).innerWidth()}<br>` + `offsetHeight: ${$(this).innerHeight()}`;
      dimensionsDiv.html(str);
      $(this).append(dimensionsDiv);
    }

    function hideDimensions(event) {
      $(this).children().remove(':nth-child(2)');
    }

    function moveDimensions(event) {
      event.stopPropagation();
      event.preventDefault();
      $(this).children(':nth-child(2)').css({
        top: `${event.offsetY + 5}px`,
        left: `${event.offsetX + 5}px`,
      });
    }

    divImages.css('position', 'relative');
    divImages.on({
      mouseenter: showDimensions,
      mouseleave: hideDimensions,
      mousemove: moveDimensions,
    });
  }

  buttons[6].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra dimensiones de las categorías.');
    testMouseEnterEvent();
  });

  window.testMouseOverEvent = function () {
    $('body').on({
      mouseover(event) {
        $(event.target).addClass('border border-danger');
      },
      mouseout(event) {
        $(event.target).removeClass('border border-danger');
      },
    });
  };

  buttons[7].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra borde en cada elemento.');
    testMouseOverEvent();
  });

  function testFocusEvent() {
    const input = $('input[name = "email"]');
    input.on({
      focus() {
        const div = $('<div></div>');
        $(this).parent().append(div);
        div.text('Introduce un correo electrónico.');
      },
      blur() {
        $(this).next().next().remove();
      },
    });
  }

  buttons[8].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra capa al seleccionar el input de subscripción.');
    testFocusEvent();
  });

  function testHoverEventV1() {
    const categories = $('#categories');
    const divImages = categories.find('.cat-list-image');

    $(divImages).hover(function () {
      $(this).addClass('border border-danger');
    }, function () {
      $(this).removeClass('border border-danger');
    });
  }

  buttons[9].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Añade y elimina bordes de las categorías.');
    testHoverEventV1();
  });

  window.testHoverEventV2 = function () {
    const categories = $('#categories');
    const divImages = categories.find('.cat-list-image');

    $(divImages).hover(
      function () {
        $(this).toggleClass('border border-success');
      },
    );
  };

  function testKeydownEvent() {
    const input = $('input[name = "email"]');
    const div = $('<div></div>');
    input.parent().append(div);
    input.focus();
    input.keydown(function (event) {
      const div = $(this).next().next();
      div.text(`${div.text()}${event.key}(${event.code}) `);
    });
  }

  buttons[10].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra teclas pulsadas en el input de subscripción.');
    testKeydownEvent();
  });

  function testKeyupEvent() {
    const categories = $('#categories');
    const divImages = categories.find('.cat-list-image');

    $(document).on({
      keydown(event) {
        if (event.altKey) {
          if (event.code.indexOf('Numpad') > -1
						|| event.code.indexOf('Digit') > -1) {
            let number = (event.code.length === 7)
              ? event.code.substring(6)
              : event.code.substring(5);
            number = +number;

            const divImage = $(divImages[number]);
            if (number < divImages.length && divImage.children().length < 2) {
              const dimensionsDiv = $('<div></div>')
                .addClass('border border-primary p-2')
                .css({
                  background: '#f5f5f5',
                  width: '150px',
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                });
              const str = `offsetWidth: ${divImage.innerWidth()}<br>` + `offsetHeight: ${divImage.innerHeight()}`;
              dimensionsDiv.html(str);
              divImage.css('position', 'relative');
              divImage.append(dimensionsDiv);
            }
          }
        }
      },
      keyup(event) {
        if (event.altKey) {
          if (event.code.indexOf('Numpad') > -1
						|| event.code.indexOf('Digit') > -1) {
            let number = (event.code.length === 7)
              ? event.code.substring(6)
              : event.code.substring(5);
            number = +number;
            if (number < divImages.length) {
              $(divImages[number]).children(':nth-child(2)').remove();
            }
          }
        }
      },
    });
  }

  buttons[11].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Muestra dimensiones al pulsar alt + Num de las categorías.');
    testKeyupEvent();
  });
});
