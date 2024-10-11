module.exports = {
  routes: [
     {
      method: 'GET',
      path: '/chatbot-stats',
      handler: 'chatbot-stats.getStats',
      config: {
        policies: [],
        middlewares: [],
      },
     },
	 {
      method: 'GET',
      path: '/chatbot-stats-by-year',
      handler: 'chatbot-stats.getStatsByYear',
      config: {
        policies: [],
        middlewares: [],
      },
     },
	 {
      method: 'POST',
      path: '/chatbot-stats/reset',
      handler: 'chatbot-stats.resetStats',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
