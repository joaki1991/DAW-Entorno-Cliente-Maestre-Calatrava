$(() => {
  const examples = document.getElementById('examples');
  const divExamples = examples.children[16];
  const buttons = divExamples.getElementsByClassName('tab-pane')[7].getElementsByTagName('button');

  function testBasicEffects() {
    const categories = $('#categories > div.row > div');
    const bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
    const bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
    const bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

    bShow.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      img.show(1000);
    });

    bHide.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      img.hide(2000);
    });

    bToggle.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      img.toggle(3000);
    });

    categories.prepend(bShow, bHide, bToggle);
  }

  buttons[0].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Botones para ocultar y mostrar las categorías.');
    testBasicEffects();
  });

  function testCallBack() {
    const categories = $('#categories > div.row > div');
    const bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
    bShow.attr('disabled', true);
    const bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
    const bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

    bShow.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.show(1000, () => {
        button.attr('disabled', true);
        button.next().removeAttr('disabled');
      });
    });

    bHide.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.hide(2000, () => {
        button.attr('disabled', true);
        button.prev().removeAttr('disabled');
      });
    });

    bToggle.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.toggle(3000, () => {
        if (button.prev().attr('disabled')) {
          button.prev().removeAttr('disabled');
          button.prev().prev().attr('disabled', true);
        } else {
          button.prev().attr('disabled', true);
          button.prev().prev().removeAttr('disabled');
        }
      });
    });

    categories.prepend(bShow, bHide, bToggle);
  }

  buttons[1].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Botones para ocultar y mostrar las categorías.');
    $$result.log('Los botones quedan deshabilitados.');
    testCallBack();
  });

  function testSlideEffects() {
    const categories = $('#categories > div.row > div');
    const bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
    bShow.attr('disabled', true);
    const bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
    const bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

    bShow.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.slideDown(1000, () => {
        button.attr('disabled', true);
        button.next().removeAttr('disabled');
      });
    });

    bHide.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.slideUp(2000, () => {
        button.attr('disabled', true);
        button.prev().removeAttr('disabled');
      });
    });

    bToggle.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.slideToggle(3000, () => {
        if (button.prev().attr('disabled')) {
          button.prev().removeAttr('disabled');
          button.prev().prev().attr('disabled', true);
        } else {
          button.prev().attr('disabled', true);
          button.prev().prev().removeAttr('disabled');
        }
      });
    });

    categories.prepend(bShow, bHide, bToggle);
  }

  buttons[2].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Botones para ocultar y mostrar las categorías en un slide.');
    $$result.log('Los botones quedan deshabilitados.');
    testSlideEffects();
  });

  function testFadeEffects() {
    const categories = $('#categories > div.row > div');
    const bShow = $('<button class="btn btn-primary m-1"></button>').text('Show');
    bShow.attr('disabled', true);
    const bHide = $('<button class="btn btn-primary m-1"></button>').text('Hide');
    const bToggle = $('<button class="btn btn-primary m-1"></button>').text('Toggle');

    bShow.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.fadeIn(1000, () => {
        button.attr('disabled', true);
        button.next().removeAttr('disabled');
      });
    });

    bHide.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      const button = $(this);
      img.fadeOut(2000, () => {
        button.attr('disabled', true);
        button.prev().removeAttr('disabled');
      });
    });

    bToggle.click(function () {
      const img = $(this).parent().find('div.cat-list-image').first();
      console.dir(img);
      const button = $(this);
      img.fadeToggle(3000, () => {
        if (button.prev().attr('disabled')) {
          button.prev().removeAttr('disabled');
          button.prev().prev().attr('disabled', true);
        } else {
          button.prev().attr('disabled', true);
          button.prev().prev().removeAttr('disabled');
        }
      });
    });

    categories.find('div.cat-list-image').mouseenter(function () {
      $(this).fadeTo(1000, 0.5);
    });

    categories.find('div.cat-list-image').mouseleave(function () {
      $(this).fadeTo(1000, 1);
    });

    categories.prepend(bShow, bHide, bToggle);
  }

  buttons[3].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Botones para ocultar y mostrar las categorías desvaneciendose.');
    $$result.log('Los botones quedan deshabilitados.');
    $$result.log('Al entrar o salir de las categorías cambia la opacidad.');
    testFadeEffects();
  });

  function testAnimate() {
    const container = $('#categories');
    const categories = $('#categories > div.row > div');
    container.css('position', 'relative');
    const button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
    container.prepend(button1);

    const first = categories.first();
    const last = categories.last();

    const coordinates = {
      first: {
        left: first.get(0).offsetLeft,
        top: first.get(0).offsetTop,
      },
      last: {
        left: last.get(0).offsetLeft,
        top: last.get(0).offsetTop,
      },
    };

    button1.click(() => {
      first.css({ position: 'absolute', zIndex: '1', border: '10px solid red' });
      first
        .animate({ left: '+=200', top: '-=200', opacity: '0.5' }, 1000)
        .animate({ left: coordinates.last.left - 200 }, 1000)
        .animate({ left: coordinates.last.left, top: coordinates.last.top, opacity: '1' }, 1000);
    });
  }

  buttons[4].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Animación personalizada.');
    $$result.log('La primera categoría pasa a la última posición.');
    testAnimate();
  });

  function testStop() {
    const container = $('#categories');
    const categories = $('#categories > div.row > div');
    container.css('position', 'relative');
    const button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
    const button2 = $('<button class="btn btn-primary m-1"></button>').text('Stop');
    container.prepend(button1, button2);

    const first = categories.first();
    const last = categories.last();

    const coordinates = {
      first: {
        left: first.get(0).offsetLeft,
        top: first.get(0).offsetTop,
      },
      last: {
        left: last.get(0).offsetLeft,
        top: last.get(0).offsetTop,
      },
    };

    button1.click(() => {
      first.css({ position: 'absolute', zIndex: '1', border: '10px solid red' });
      first
        .animate({ left: '+=200', top: '-=200', opacity: '0.5' }, 1000)
        .animate({ left: coordinates.last.left - 200 }, 1000)
        .animate({ left: coordinates.last.left, top: coordinates.last.top, opacity: '1' }, 1000);
    });

    button2.click(() => {
      first.stop(true);
    });
  }

  buttons[5].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Animación personalizada.');
    $$result.log('La primera categoría pasa a la última posición.');
    $$result.log('El botón de stop.');
    testStop();
  });

  function testAnimateOptionsV1() {
    const container = $('#categories');
    const categories = $('#categories > div.row > div');
    container.css('position', 'relative');
    const button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
    const button2 = $('<button class="btn btn-primary m-1"></button>').text('Stop');
    container.prepend(button1, button2);

    const first = categories.first();
    const last = categories.last();

    const coordinates = {
      first: {
        left: first.get(0).offsetLeft,
        top: first.get(0).offsetTop,
      },
      last: {
        left: last.get(0).offsetLeft,
        top: last.get(0).offsetTop,
      },
    };

    button1.click(() => {
      let progress = $('#progress');
      if (progress.length === 0) {
        const progressBar = $('<div class="row border border-primary mt-2"><div id="progress"></div></div>');
        container.append(progressBar);
        progress = $('#progress');
        progress.css({
          height: '40px',
          color: '#ffffff',
          fontSize: '2em',
          textAlign: 'center',
        });
      }

      const duration = 1000;
      first
        .animate({ left: '+=200', top: '-=200', opacity: '0.5' }, {
          duration,
          start() {
            $(this).css({ position: 'absolute', zIndex: '1', border: '10px solid red' });
            progress.css({
              background: 'red',
              width: '0%',
            });
            progress.animate({ width: '100%' }, {
              duration: duration * 3,
              easing: 'linear',
              step(width, fx) {
                $(this).text(`${width.toFixed(2)}%`);
              },
            });
          },
          done() {
            first.css({ border: '10px solid blue' });
            progress.css({ background: 'blue' });
          },
        })
        .animate({ left: coordinates.last.left - 200 }, {
          duration,
          done() {
            first.css({ border: '10px solid green' });
            progress.css({ background: 'green' });
          },
        })
        .animate({ left: coordinates.last.left, top: coordinates.last.top, opacity: '1' }, {
          duration,
        });
    });

    button2.click(() => {
      first.stop(true);
      $('#progress').stop();
    });
  }

  buttons[6].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Animación personalizada.');
    $$result.log('La primera categoría pasa a la última posición.');
    $$result.log('El botón de stop.');
    $$result.log('Personalizamos la animación en cada paso.');
    testAnimateOptionsV1();
  });

  function testAnimateExercise() {
    const categoryList = $('#category-list');
    if (categoryList.length === 1) categoryList.remove();
    const container = $('#categories');
    const categories = $('#categories > div.row > div');
    container.children().first().css('position', 'relative');
    container.children().first().height(container.height());
    const button1 = $('<button class="btn btn-primary m-1"></button>').text('Animate');
    const button2 = $('<button class="btn btn-primary m-1"></button>').text('Stop');
    container.prepend(button1, button2);

    const coordinates = [];
    for (const img of categories) {
      coordinates.push({
        left: img.offsetLeft,
        top: img.offsetTop,
      });
    }
    for (let i = 0; i < categories.length; i++) {
      $(categories[i]).css({
        position: 'absolute',
        left: coordinates[i].left,
        top: coordinates[i].top,
      });
    }

    button1.click(function () {
      const categories = $('#categories > div.row > div');
      const first = categories.first();
      const last = categories.last();
      const button = $(this);
      button.attr('disabled', true);
      let progress = $('#progress');
      if (progress.length === 0) {
        const progressBar = $('<div class="row border border-primary mt-2"><div id="progress"></div></div>');
        container.append(progressBar);
        progress = $('#progress');
        progress.css({
          height: '40px',
          color: '#ffffff',
          fontSize: '2em',
          textAlign: 'center',
        });
      }

      const duration = 1000;
      first
        .animate({ left: '+=200', top: '-=200', opacity: '0.5' }, {
          duration,
          start() {
            $(this).css({ position: 'absolute', zIndex: '1', border: '10px solid red' });
            progress.css({
              background: 'red',
              width: '0%',
            });
            progress.animate({ width: '100%' }, {
              duration: duration * 3,
              easing: 'linear',
              step(width, fx) {
                $(this).text(`${width.toFixed(2)}%`);
              },
            });
            const siblings = $(this).siblings();
            for (let i = 0; i < siblings.length; i++) {
              $(siblings[i]).animate({
                left: coordinates[i].left,
              }, duration);
            }
          },
          done() {
            first.css({ border: '10px solid blue' });
            progress.css({ background: 'blue' });
          },
        })
        .animate({ left: coordinates[coordinates.length - 1].left - 200 }, {
          duration,
          done() {
            first.css({ border: '10px solid green' });
            progress.css({ background: 'green' });
          },
        })
        .animate({
          left: coordinates[coordinates.length - 1].left,
          top: coordinates[coordinates.length - 1].top,
          borderWidth: '0px',
          opacity: '1',
        }, {
          duration,
          done() {
            button.removeAttr('disabled');
            $(this).parent().append($(this));
            $(this).css({ zIndex: '0' });
            console.dir($(this));
          },
        });
    });

    button2.click(function () {
      $('#progress').stop(true);
      categories.stop(true);
      $(this).prev().removeAttr('disabled');
    });
  }

  buttons[7].addEventListener('click', () => {
    $$result.clear();
    $$result.logBold('Animación personalizada.');
    $$result.log('La primera categoría pasa a la última posición.');
    $$result.log('El botón de stop.');
    $$result.log('Personalizamos la animación en cada paso.');
    testAnimateExercise();
  });
});
