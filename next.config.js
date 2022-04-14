const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const { withRasterImages, withPlayback, withFonts, withSVG, with3D } = require('@moxy/next-common-files');
module.exports = withImages()
module.exports = withPlugins(
    [
        withImages,
        withPlayback(),

    ],

    { /* nextConfig options here */ }
);
