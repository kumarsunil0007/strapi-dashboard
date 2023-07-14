'use strict';

/**
 * wales-agent service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wales-agent.wales-agent');
