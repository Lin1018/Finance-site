var gulp = require('gulp')
var rev = require('gulp-rev')  // 监听文件变化，通过哈希码给文件更名
var revReplace = require('gulp-rev-replace') // 更新文件名引用
var useref = require('gulp-useref')  // 通过注释，指定某部分文件合并成一个文件
var filter = require('gulp-filter')  // 筛选文件
var uglify = require('gulp-uglify')  // js压缩
var csso = require('gulp-csso')  // css压缩

gulp.task('js-css', function() {
    var jsFilter = filter('**/*.js', {restore: true})
    var cssFilter = filter('**/*.css', {restore: true})
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true})

    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest('dist'))
})

gulp.task('img', function (){
    return gulp.src('src/img/*.png')
        .pipe(gulp.dest('dist/img'))
})

gulp.task('default', ['js-css', 'img'])
