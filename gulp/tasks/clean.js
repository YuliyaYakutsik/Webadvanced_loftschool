'use strict';

module.exports = function() {
  $.gulp.task('clean', function(cb) {
    return $.del([$.config.root, './source/style/common/sprite.scss', './source/images/sprite.png'], cb);
  });
};

