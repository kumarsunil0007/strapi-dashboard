'use strict';

/**
 * england-agent service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::england-agent.england-agent');
