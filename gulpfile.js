let project_folder = "dist";
let source_folder = "#src";

let path = {
    build:{
        html: project_folder+"/",
        img:project_folder+"/img/",
    },
    src:{
        html: source_folder+"/*.html",
        img:source_folder+"/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    },
    // То что нужно слушать постоянно
    watch:{
        html: source_folder+"/**/*.html",
        css:source_folder+"/css/**/*.css",
        img:source_folder+"/img/**/*.+(png|jpg|gif|ico|svg|webp)",
    },
    //То чо бдет удалятся каждый раз, когда будет запскатся gulp
    clean:"./"+project_folder+"/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    // browsersync = require('browser-sync').create(),
    emailBuilder = require('gulp-email-builder'),
    del = require('del');

let fs = require('fs');

// function browserSync(params){
//     browsersync.init({
//         server:{
//             baseDir:"./"+project_folder+"/"
//         },
//         port:3000,
//     })
// }

function html(){
    return src(path.src.html)
        .pipe(emailBuilder().build())
        .pipe(dest(path.build.html))
        // .pipe(browsersync.stream());
}


function images(){
    return src(path.src.img)
        .pipe(dest(path.build.img))
}
    

function watchFiles(){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.img], images);
    gulp.watch([path.watch.css], html);
}

function clean(params){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, images));
let watch = gulp.parallel(build, watchFiles);

exports.images = images;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;