const through = require('through2').obj;
const sharp = require('sharp');
const PluginError = require('plugin-error');

const ENABLED_FORMATS = ['png', 'jpg', 'jpeg'];

const optionsByDefualt = {
    quality: 90,
    lossless: false,
    speed: 5,
    chromaSubsampling: '4:2:0'
}

function avif(options) {
    return through(async (file, enc, callback) => {
        const source = await sharp(file.contents);

        source
            .metadata()
            .then((metadata) => {
                if (!ENABLED_FORMATS.includes(metadata.format)) {
                    throw new Error(`.${metadata.format} not supported`);
                }
            })
            .then(() => {
                return source
                    .avif(Object.assign(optionsByDefualt, options))
                    .toBuffer();
            })
            .then((stream) => {
                file.contents = stream;
                file.extname = '.avif';
                callback(null, file);
            })
            .catch((err) => {
                callback(new PluginError('gulp-avif', err));
            });
    });
}

module.exports = avif;
