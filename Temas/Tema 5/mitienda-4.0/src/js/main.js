/* eslint-disable func-names */
(function () {
  const toparrow = document.getElementById('toparrow');
  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 100) {
      toparrow.classList.remove('animate__animated', 'animate__fadeOut');
      toparrow.classList.add('animate__animated', 'animate__fadeIn');
      toparrow.style.display = 'block';
    } else {
      toparrow.classList.remove('animate__animated', 'animate__fadeIn');
      toparrow.classList.add('animate__animated', 'animate__fadeOut');
      toparrow.style.display = 'none';
    }
  });

  class LinksHandler {
    constructor(...linksCollections) {
      this.links = [];
      for (const links of linksCollections) {
        this.links.push(...links);
        links.forEach((link) => link.addEventListener('click', this));
      }
    }

    handleEvent(event) {
      const index = this.links.indexOf(event.target);
      examples.classList.remove('d-none');
      exercises.classList.remove('d-none');
      examplesRows.forEach((row) => {
        row.classList.add('d-none');
      });
      examplesRows[index].classList.remove('d-none');

      examplesRows[examplesRows.length - 1].classList.remove('d-none');
      result.innerHTML = '';
    }
  }

  const examples = document.getElementById('examples');
  const exercises = document.getElementById('exercises');
  const examplesRows = Array.from(examples.children);
  const examplesLinks1 = document.querySelectorAll('#examplesLinks1 a');
  const examplesLinks2 = document.querySelectorAll('#examplesLinks2 a');
  const result = document.getElementById('result');

  const lh = new LinksHandler(examplesLinks1, examplesLinks2);

  const bHideResult = document.getElementById('hide-result');
  bHideResult.addEventListener('click', () => {
    examples.classList.add('d-none');
    exercises.classList.add('d-none');
  });
}());
