module.exports = ({ env }) => ({
	slugify: {
		enabled: true,
		config: {
		  contentTypes: {
			question: {
			  field: 'slug',
			  references: 'title',
			},
		  },
		},
	},
	/* ckeditor: {
		enabled: true,
		//resolve: "./src/plugins/strapi-plugin-ckeditor"
	}, */

	email: {
		config:{
			provider: 'strapi-provider-email-smtp',
			providerOptions: {
			  host: env('MAIL_HOST',''), //SMTP Host
			  port: 465   , //SMTP Port
			  secure: true,
			  username: env('MAIL_USERNAME',''),
			  password: env('MAIL_PASSWORD',''),
			  rejectUnauthorized: true,
			  requireTLS: true,
			  connectionTimeout: 1,
			},
		},
		settings: {
		  defaultFrom: env('MAIL_FROM',''),
		  defaultReplyTo: env('MAIL_REPLY_TO',''),
		},
	}
});
