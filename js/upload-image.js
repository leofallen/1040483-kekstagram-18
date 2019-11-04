'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.form.upLoader.addEventListener('change', function () {

    var file = window.form.upLoader.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
    }

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.form.img.src = reader.result;
      });
    }

    reader.readAsDataURL(file);

  });

})();
