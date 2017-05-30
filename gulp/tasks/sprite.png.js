'use strict';

module.exports = function() {
  $.gulp.task('sprite:png', function() {
      return $.gulp.src('./source/sprite/*.{png,gif}')
      .pipe($.gp.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        imgPath: '../img/sprite.png'
      }))
      .pipe($.gp.if('*.png', $.gulp.dest('./source/images/')))
      .pipe($.gp.if('*.css', $.gp.replace('-hover', ':hover')))
      .pipe($.gp.if('*.css', $.gp.rename('sprite.scss')))
      .pipe($.gp.if('*.scss',$.gulp.dest('./source/style/common')));
  })
};