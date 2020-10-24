import {modulePath} from './consts.js';

/**
 * Define a set of template paths to pre-load. Pre-loaded templates
 * are compiled and cached for fast-access when rendering.
 * @return {Promise}
 */
export const preloadTemplates = async () => {
  const templatePaths = [
    `${modulePath}/templates/skill-selector.html`,
    `${modulePath}/items/sub-items/templates/skill-option-sheet.html`,
  ];

  return loadTemplates(templatePaths);
};
