'use strict';

/**
 * inventory-room service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::inventory-room.inventory-room');
