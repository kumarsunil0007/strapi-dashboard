module.exports = ({ env }) => ({
	ckeditor: true,
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
