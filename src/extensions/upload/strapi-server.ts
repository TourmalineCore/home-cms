import sharp from "sharp";

// More information about plugin extensions here https://docs.strapi.io/cms/plugins-development/plugins-extension#extending-a-plugins-interface

module.exports = (plugin) => {
  // Add blurDataURL to content types
  plugin.contentTypes.file.schema.attributes.blurDataURL = {
    type: `text`,
    configurable: false,
    required: false,
  };

  // Add custom service for generate blur and get buffer by url
  plugin.services[`blur-generator`] = {
    generateBlurDataURL: async (buffer) => {
      try {
        const sharpImage = await sharp(buffer)
          .resize(10, 10, {
            fit: `inside` 
          })
          .jpeg({
            quality: 20,
            mozjpeg: true 
          })
          .toBuffer();
        
        return `data:image/jpeg;base64,${sharpImage.toString(`base64`)}`;
      } catch (error) {
        strapi.log.error(`Blur generation error:`, error);
        return null;
      }
    },

    getBufferFromUrl: async (url) => {
      try {
        const arrayBuffer = await fetch(url)
          .then((response) => response.arrayBuffer());

        return Buffer.from(arrayBuffer);
      } catch (error) {
        strapi.log.error(`Error fetching from URL ${url}:`, error);
        return null;
      }
    }
  };


  
  // Add lifecycle hooks https://docs.strapi.io/cms/configurations/functions#lifecycle-functions
  // for add blurDataUrl after upload images
  strapi.db.lifecycles.subscribe({
    models: [`plugin::upload.file`],
    
    async afterCreate(event) {
      const {
        result: file 
      } = event;

      // Generates only for images, no need for videos
      if (file.mime?.startsWith(`image/`)) {
        const blurService = strapi.service(`plugin::upload.blur-generator`);

        try {
          const buffer = await blurService.getBufferFromUrl(file.url);

          if (buffer) {
            const blurDataURL = await blurService.generateBlurDataURL(buffer);

            await strapi.db.query(`plugin::upload.file`)
              .update({
                where: {
                  id: file.id 
                },
                data: {
                  blurDataURL 
                }
              });
          }
        } catch (error) {
          strapi.log.error(`Error adding blur to ${file.name}:`, error);
        }
      }
    }
  });

  return plugin;
};