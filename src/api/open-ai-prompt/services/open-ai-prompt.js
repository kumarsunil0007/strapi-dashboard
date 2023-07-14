'use strict';

/**
 * open-ai-prompt service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::open-ai-prompt.open-ai-prompt');
