document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id || !projectsData[id]) {
    return;
  }
  const data = projectsData[id];

  const titleEl = document.getElementById('project-title');
  if (titleEl) titleEl.textContent = data.title;

  const imagesWrapper = document.getElementById('project-images');
  if (imagesWrapper && Array.isArray(data.images)) {
    data.images.forEach(src => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      slide.appendChild(img);
      imagesWrapper.appendChild(slide);
    });
  }

  const infoList = document.getElementById('project-info');
  if (infoList) {
    const addItem = (label, value, isLink = false) => {
      if (!value) return;
      const li = document.createElement('li');
      if (isLink) {
        li.innerHTML = `<strong>${label}</strong>: <a href="${value}" target="_blank">${value}</a>`;
      } else {
        li.innerHTML = `<strong>${label}</strong>: ${value}`;
      }
      infoList.appendChild(li);
    };
    addItem('Category', data.category);
    addItem('Client', data.client);
    addItem('Project date', data.date);
    addItem('Project URL', data.url, true);
    if (data.repository) {
      addItem('Repository', data.repository, true);
    }
  }

  const descEl = document.getElementById('project-description');
  if (descEl) {
    descEl.innerHTML = data.description;
  }

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
});
