// compress-images.mjs
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

(async () => {
    await imagemin(['src/public/images/heros/hero-image_4.jpg'], {
        destination: 'dist/images/heros',
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    console.log('Gambar hero telah dioptimalkan dan disimpan di dist/images');
})();