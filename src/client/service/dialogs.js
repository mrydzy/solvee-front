const $ = require('jquery');

function buildWrapper() {
  return $('<div></div>', {
    class: 'modal-wrapper'
  });
}


function buildConfirmBtns() {
  return $('<div></div>', {
    class: 'modal-btns confirm-btns'
  })
    .append($('<button class="yes-btn">Yes</button>'))
    .append($('<button class="no-btn">No</button>'));
}

function buildOkBtn() {
  return $('<div></div>', {
    class: 'modal-btns alert-btns'
  })
    .append($('<button class="ok-btn">OK</button>'));
}

function buildContent(message) {
  return $('<div></div>', {
    class: 'modal-content'
  }).text(message);
}

function appendToBody(modal) {
  $(modal).appendTo('body');
}

function confirm(message) {
  return new Promise((resolve, reject) => {
    const modal = buildWrapper()
      .append(buildContent(message))
      .append(buildConfirmBtns());
    appendToBody(modal);
    modal.find('.yes-btn').click(() => resolve(modal));
    modal.find('.no-btn').click(() => reject(modal));
  })
    .then(removeModal)
    .catch((modal) => {
      throw removeModal(modal);
    });
}

function removeModal(modal) {
  if (modal.remove) {
    modal.remove();
  }
  return false;
}

function alert(message) {
  return new Promise(resolve => {
    const modal = buildWrapper()
      .append(buildContent(message))
      .append(buildOkBtn());
    appendToBody(modal);
    $('.ok-btn', $(modal)).click(() => resolve(modal));
  })
    .then(removeModal)
    .catch((modal) => {
      throw removeModal(modal);
    });
}

module.exports = {
  alert,
  confirm
};
