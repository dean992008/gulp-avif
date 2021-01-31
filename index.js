const through = require('through2').obj;
const sharp = require('sharp');
const PluginError = require('plugin-error');

ENABLED_FORMATS = ['png', 'jpg']

function avif(options) {
    return stream = through(async (file, enc, callback) => {

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
                    .avif()
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