const $ = require('jquery');

function buildWrapper() {
  return $('<div></div>', {
    class: 'modal-wrapper'
  });
}

function buildForm() {
  return $('<form></form>', {
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


function buildSubmitBtn() {
  return $('<div></div>', {
    class: 'modal-btns alert-btns'
  })
    .append($('<input type="submit" value="Submit" class="yes-btn">'))
    .append($('<button type="button" class="no-btn">Cancel</button>'));
}

function buildContent(message) {
  return $('<div></div>', {
    class: 'modal-content'
  }).text(message);
}

function buildInput(inputType, linkValue) {
  return $(`<span></span>`, {
    class: 'field-container'
  }).append($(`<input id="modal-input" class="modal-input" type=${inputType} value=${linkValue}> `));
}

function buildPreview(imageUrl) {
  return $(`<img src="${imageUrl}" class="modal-image-preview">`, {
    class: 'modal-image-preview'
  });
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

function input(message, inputType, currentNode) {
  return new Promise((resolve, reject) => {
    const imageUrl = currentNode.image? currentNode.image : '';
    const form = buildForm()
      .append(buildContent(message))
      .append(buildInput(inputType, imageUrl))
      .append(buildPreview(imageUrl))
      .append(buildSubmitBtn());

    const modal = buildWrapper()
      .append(form);
    appendToBody(modal);
    modal.find('.modal-wrapper').submit((e) => {
      resolve(modal.find('#modal-input').val());
      modal.remove();
      return false;
    });
    modal.find('.no-btn').click(() => reject(modal));
    let input = modal.find('#modal-input');
    const preview = modal.find('.modal-image-preview')
    preview.attr("src", input.val());
      input.blur(() => {
        preview.attr("src", input.val());
      })
  })
  .catch((modal) => {
    throw removeModal(modal);
  });
}

module.exports = {
  alert,
  confirm,
  input
};
