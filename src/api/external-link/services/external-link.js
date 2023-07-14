'use strict';

/**
 * external-link service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::external-link.external-link');
