const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const Image = require("@11ty/eleventy-img");
const pluginDropcap = require("eleventy-plugin-dropcap");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toLocaleString(
      DateTime.DATE_FULL
    );
  });

  eleventyConfig.addFilter("head", (list, num = 10) => {
    return list.slice(0, num);
  });

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./src/admin/index.html": "./admin/index.html",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  const imageOptions = {
    formats: ["webp", "svg"],
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
    sharpWebpOptions: {
      quality: 86,
    },
    svgShortCircuit: "size",
  };

  eleventyConfig.addPlugin(Image.eleventyImageTransformPlugin, {
    ...imageOptions,
    extensions: "html",
  });

  eleventyConfig.addPlugin(pluginDropcap, {
    dropCapClass: "mati-drop-cap",
    hiddenTextClass: "screen-reader-only",
  });

  eleventyConfig.addShortcode(
    "lightbox",
    async function (imageUrl, alt = "", title = "") {
      let metadata = await Image("src/" + imageUrl, {
        ...imageOptions,
        outputDir: "_site/img",
        widths: ["auto"],
      });

      let imageAttributes = {
        alt,
        title,
      };

      const image = Image.generateObject(metadata, imageAttributes);

      //Keep in sync with max article width
      return `<a x-on:click.stop="$dispatch('img-modal', {  image: ${JSON.stringify(
        image
      ).replaceAll('"', "'")}})" class="cursor-pointer">
        <img src="${imageUrl}" eleventy:widths="780" alt="${alt}" title="${title}" />
      </a>`;
    }
  );

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  eleventyConfig.ignores.add("src/admin/**");
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
