const through = require('through2').obj;
const sharp = require('sharp');
const PluginError = require('plugin-error');

const ENABLED_FORMATS = ['png', 'jpg', 'jpeg', 'svg'];

const optionsByDefualt = {
    quality: 90,
    lossless: false,
    speed: 5,
    chromaSubsampling: '4:2:0'
}

function avif(options) {
    return through(async (file, _, callback) => {
        if (file.isNull()) {
			callback(null, file);
			return;
        }
        
        const ext = file.extname.slice(1).toLowerCase();
		if (!ENABLED_FORMATS.includes(ext)) {
			callback(null, file);
			return;
		}

        const source = await sharp(file.contents);

        source
            .metadata()
            .then((metadata) => {
                if (metadata.format === 'svg' && options && (options.width || options.height)) {
                    source.resize(options.width, options.height);
                }
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
                callback(new PluginError('gulp-avif', err, {fileName: file.path}));
            });
    });
}

module.exports = avif;
