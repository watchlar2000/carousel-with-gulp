const buildFolder = './dest';
const srcFolder = './src';

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    assets: `${buildFolder}/assets`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/styles.scss`,
    js: `${srcFolder}/js/app.js`,
    assets: `${srcFolder}/assets/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/assets/**/*.svg`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    assets: `${srcFolder}/assets/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
  },
  clean: {
    files: `${buildFolder}/**/*.*`,
  },
};
