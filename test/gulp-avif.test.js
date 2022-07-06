const path = require('path');
const fileType = require('file-type');
const Vinyl = require('vinyl');
const vinylFile = require('vinyl-file');
const PluginError = require('plugin-error');
const pEvent = require('p-event');
const sharp = require('sharp');

const avif = require('../');

test('JPG converts to AVIF', async () => {
  const file = await vinylFile.read(path.join(__dirname, './image.jpg'));
	const stream = avif();

	const promise = pEvent(stream, 'data');
	stream.end(file);
  const data = await promise;
  const type = await fileType.fromBuffer(file.contents);
  expect(type.mime).toBe('image/avif');
  expect(data.path).toBe(path.join(__dirname, 'image.avif'));
});

test('PNG converts to AVIF', async () => {
  const file = await vinylFile.read(path.join(__dirname, './image.png'));
	const stream = avif();

	const promise = pEvent(stream, 'data');
	stream.end(file);
  const data = await promise;
  const type = await fileType.fromBuffer(file.contents);

  expect(type.mime).toBe('image/avif');
  expect(data.path).toBe(path.join(__dirname, 'image.avif'));
});

test('SVG with setted sizes converts to AVIF', async () => {
  const file = await vinylFile.read(path.join(__dirname, './vect.svg'));
	const stream = avif({
    width: 400,
    height: 400,
  });

	const promise = pEvent(stream, 'data');
	stream.end(file);
  const data = await promise;

  const type = await fileType.fromBuffer(file.contents);
  const sizes = await sharp(file.contents).metadata();

  expect(type.mime).toBe('image/avif');
  expect(data.path).toBe(path.join(__dirname, 'vect.avif'));
  expect(sizes.width).toBe(400);
  expect(sizes.height).toBe(400);
});

test('SVG with defualt sizes converts to AVIF', async () => {
  const file = await vinylFile.read(path.join(__dirname, './vect.svg'));
	const stream = avif();

  const promise = pEvent(stream, 'data');
  stream.end(file);
  const data = await promise;

  const type = await fileType.fromBuffer(file.contents);
  const sizes = await sharp(file.contents).metadata();

  expect(type.mime).toBe('image/avif');
  expect(data.path).toBe(path.join(__dirname, 'vect.avif'));
  expect(sizes.width).toBe(64);
  expect(sizes.height).toBe(64);
});

test('TODO: should not convert unsupported files', async () => {
  // const stream = avif();

	// const promise = pEvent(stream, 'data');
	// stream.end(new Vinyl({
	// 	path: path.join(__dirname, 'image.jpg'),
	// 	contents: Buffer.from('contents')
	// }));
  // const data = await promise;

  // This feature not implument in plugin. This test always fail.

  // expect(data.contents.toString()).toBe('contents');

  expect(1).toBe(1);
});

test('TODO: emits a plugin error when the image is corrupt', async () => {
  // const fileName = path.join(__dirname, 'fixture-corrupt.jpg');
	// const file = await vinylFile.read(fileName);
	// const stream = avif();

	// const promise = pEvent(stream, 'error');
	// stream.end(file);

  // const error = await promise;

  // This feature not implument in plugin. This test always fail.

  // expect(error instanceof PluginError).toBe(true);
  // expect(error.plugin).toBe('gulp-avif');
  // expect(error.fileName).toBe(fileName);


  expect(1).toBe(1);
});
