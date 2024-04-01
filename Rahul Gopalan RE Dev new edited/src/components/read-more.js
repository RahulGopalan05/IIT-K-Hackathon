document.addEventListener('DOMContentLoaded', function () {
    const readMoreButtons = document.querySelectorAll('.read-more-button');
    const popup = document.createElement('div');
    popup.classList.add('popup');
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    const closePopup = document.createElement('span');
    closePopup.classList.add('close-popup');
    closePopup.textContent = 'X';
    popupContent.appendChild(closePopup);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);
  
    readMoreButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        popup.style.display = 'flex';
        const iframe = document.createElement('iframe');
        iframe.src = button.dataset.url;
        iframe.width = '100%';
        iframe.height = '100%';
        popupContent.appendChild(iframe);
      });
    });
  
    closePopup.addEventListener('click', function () {
      popup.style.display = 'none';
      popupContent.innerHTML = '';
    });
  });