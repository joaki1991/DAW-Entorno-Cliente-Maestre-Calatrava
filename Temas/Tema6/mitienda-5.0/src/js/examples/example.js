function cloneForm(container, form) {
  const clone = form.cloneNode(true);
  form.remove();
  container.append(clone);
  return clone;
}

function showFormExample(id) {
  const container = document.getElementById('forms');
  for (const child of container.children) {
    child.classList.add('d-none');
  }
  let form = document.getElementById(id);
  form = cloneForm(container, form);
  form.classList.remove('d-none');
}
