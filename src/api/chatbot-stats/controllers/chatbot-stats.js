'use strict';

/**
 * A set of functions called "actions" for `chatbot-stats`
 */
 
const moment = require("moment");

module.exports = {
   getStats: async (ctx, next) => {
     try {
	
		 const accurateCount = await strapi.db.query('api::chatbot.chatbot').count({
		  where: {
			voting: {
			  $eqi: 'Accurate',
			}
		  },
		});
		const wrongCount = await strapi.db.query('api::chatbot.chatbot').count({
		  where: {
			voting: {
			  $eqi: 'Wrong',
			},
		  },
		});
		const naCount = await strapi.db.query('api::chatbot.chatbot').count({
		  where: {
			voting: {
			  $eqi: 'N/A',
			},
		  },
		});
       ctx.body = {status: true, data: {accurate: accurateCount, wrong: wrongCount, other: naCount}};
     } catch (err) {
       ctx.badRequest("Something went wrong.", { error: err });
     }
   },
   resetStats: async (ctx, next) => {
	    try {
			const resp = await strapi.db.query('api::chatbot.chatbot').updateMany({
				where:{
					$or: [
						{ 
							voting: { $eqi: 'Accurate'}
						},
						{ 
							voting: { $eqi: 'Wrong'}
						},
						{ 
							voting: { $eqi: 'N/A'}
						},
					]
				},
				data: {
					voting: null
				}
			});
			ctx.body = {status: true};
		}catch (err) {
			ctx.badRequest("Something went wrong.", { error: err });
		}
   },
   getStatsByYear: async (ctx, next) => {
	    try {

			var start_date = new Date();
				start_date.setYear(start_date.getFullYear()-1);
			
			const stats = {};
			const statsCount = {accurate: 0, wrong: 0, other: 0, total: 0};
			const today = moment();
			const lastYear = moment().subtract(11, 'month');
			
			while(!lastYear.isAfter(today)){
				stats[lastYear.format('MM-YYYY')] = {accurate: 0, wrong: 0, other: 0, total: 0};
				lastYear.add(1,'month');
			}
			const accurateCount = await strapi.db.query('api::chatbot.chatbot').findMany({
				  where: {
					voting: {
					  $eqi: 'Accurate',
					},
					createdAt:{
						$gte: start_date
					}
				  },
				 _count: true,
				 _sortBy: 'createdAt:desc',
			});
			
			accurateCount.forEach((item)=>{ 
				const date = moment(item.createdAt);
				const date_str = date.format('MM-YYYY');
				
				if(!stats[date_str]){
					stats[date_str] = {accurate: 0, wrong: 0, other: 0, total: 0}
				}
				stats[date_str].accurate +=1;
				statsCount.accurate +=1;
				stats[date_str].total +=1;
			});
			
			const wrongCount = await strapi.db.query('api::chatbot.chatbot').findMany({
				  where: {
					voting: {
					  $eqi: 'Wrong',
					},
					createdAt:{
						$gte: start_date
					}
				  },
				 _count: true,
				 _sortBy: 'createdAt:desc',
			});
			
			wrongCount.forEach((item)=>{
				const date_str = moment(item.createdAt).format('MM-YYYY');
				if(!stats[date_str]){
					stats[date_str] = {accurate: 0, wrong: 0, other: 0, total: 0}
				}
				stats[date_str].wrong +=1;
				statsCount.wrong +=1;
				stats[date_str].total +=1;
			});
			
			const naCount = await strapi.db.query('api::chatbot.chatbot').findMany({
				  where: {
					voting: {
					  $eqi: 'N/A',
					},
					createdAt:{
						$gte: start_date
					}
				  },
				 _count: true,
				 _sortBy: 'createdAt:desc',
			});
			
			naCount.forEach((item)=>{
				const date_str = moment(item.createdAt).format('MM-YYYY');
				if(!stats[date_str]){
					stats[date_str] = {accurate: 0, wrong: 0, other: 0, total: 0}
				}
				stats[date_str].other +=1;
				statsCount.other +=1;
				stats[date_str].total +=1;
			});
			
			statsCount.total = statsCount.accurate + statsCount.wrong + statsCount.other;
		
			ctx.body = {status: true, data: stats, count: statsCount};
			
		}catch (err) {
			ctx.badRequest("Something went wrong.", { error: err, message: err.message });
		}
   }
};
