export default [
	{
		name: 'core',
		path: '/',
		redirect: {
			name: 'core-index',
		},
		component: () => import(/* webpackChunkName "CoreWrapper" */ './../layout/Wrapper'),
		children: [
			{
				name: 'core-index',
				path: 'home',
				component: () => import(/* webpackChunkName "CoreIndex" */ './../pages/Home/pages/Dashboard'),
			},
			{
				name: 'core-settings',
				path: 'settings',
				redirect: {
					name: 'core-user-management',
				},
				component: () => import(/* webpackChunkName "CoreMainSettings" */ './../pages/Settings/Layout'),
				children: [
					{
						name: 'core-user-management',
						path: 'user-management',
						redirect: {
							name: 'core-user-accounts',
						},
						component: () =>
							import(/* webpackChunkName "CoreMainSettings" */ './../pages/Settings/pages/Main'),
						children: [
							{
								name: 'core-user-accounts',
								path: 'user-accounts',
								component: () =>
									import(
										/* webpackChunkName "CoreUserManagement" */ './../pages/Settings/pages/UserManagement/UserManagement'
									),
							},
							{
								name: 'core-user-form',
								path: 'user-form/:id?/:reset?',
								component: () =>
									import(
										/* webpackChunkName "CoreUserManagement" */ './../pages/Settings/pages/UserManagement/UserForm'
									),
							},
							{
								name: 'core-permissions',
								path: 'permissions/:system_name?/:account_id?',
								component: () =>
									import(
										/* webpackChunkName "CorePermission" */ './../pages/Settings/pages/UserManagement/Permissions'
									),
							},
							{
								name: 'core-ip-management',
								path: 'ip-management',
								component: () =>
									import(
										/* webpackChunkName "CoreIPManagement" */ './../pages/Settings/pages/IPManagement/IPManagement'
									),
							},
						],
					},
				],
			},
			{
				// Help Center
				name: 'core-help-center',
				path: 'help-center',
				redirect: {
					name: 'frequently-ask-questions',
				},
				component: () => import(/* webpackChunkName "CoreHelpCenter" */ './../pages/HelpCenter/Main'),
				children: [
					{
						name: 'frequently-ask-questions',
						path: 'frequently-ask-questions',
						component: () =>
							import(
								/* webpackChunkName "FrequentlyAskQuestions" */ './../pages/HelpCenter/pages/FrequentlyAskQuestions'
							),
					},
					{
						name: 'search-questions',
						path: 'search-questions',
						component: () =>
							import(
								/* webpackChunkName "SearchQuestions" */ './../pages/HelpCenter/pages/SearchQuestions'
							),
					},
					{
						name: 'customer-support',
						path: 'customer-support',
						component: () =>
							import(
								/* webpackChunkName "CustomerSupport" */ './../pages/HelpCenter/pages/CustomerSupport'
							),
					},
				],
			},
			{
				name: 'core-profile',
				path: 'account',
				redirect: {
					name: 'profile',
				},
				component: () => import(/* webpackChunkName "CoreProfileMain" */ './../pages/Profile/Main'),
				children: [
					{
						path: 'profile/:id?',
						name: 'profile',
						component: () => import(/* webpackChunkName "CoreProfile" */ './../pages/Profile/Profile'),
					},
					{
						path: 'edit-profile/:id?',
						name: 'edit-profile',
						component: () =>
							import(/* webpackChunkName "CoreProfileForm" */ './../pages/Profile/ProfileForm'),
					},
				],
			},
		],
	},
	{
		path: '/login',
		name: 'core-login',
		component: () => import(/* webpackChunkName "CoreLogin" */ '../pages/Login'),
	},
	{
		path: '/core-forgot-password',
		name: 'core-forgot-password',
		component: () =>
			import(/* webpackChunkName "OrgForgotPassword" */ '../pages/ForgotPassword/ForgotPassword.vue'),
	},
	{
		path: '/core-reset-password/:id?',
		name: 'core-reset-password',
		component: () => import(/* webpackChunkName "OrgForgotPassword" */ '../pages/ResetPassword/ResetPassword.vue'),
	},
	{
		path: '/',
		name: '',
		component: () => import('./../layout/main.vue'),
		children: [
			{
				path: 'core-registration',
				name: 'core-registration',
				component: () => import(/* webpackChunkName "CoreRegistration" */ '../pages/Register/Registration'),
			},
			{
				path: 'core-org-registration',
				name: 'core-org-registration',
				component: () => import(/* webpackChunkName "CoreRegistration" */ '../pages/Register/OrgRegistration.vue'),
			},
			{
				path: 'core-verify-email/:email?',
				name: 'core-verify-email',
				component: () => import(/* webpackChunkName "VerifyEmail" */ '../pages/Register/VerifyEmail'),
			},
			{
				path: 'core-org-verify-email/:email?',
				name: 'core-org-verify-email',
				component: () => import(/* webpackChunkName "OrgVerifyEmail" */ '../pages/Register/OrgVerifyEmail'),
			},
			{
				path: 'core-verify-sms',
				name: 'core-verify-sms',
				component: () => import(/* webpackChunkName "VerifySMS" */ '../pages/Register/VerifySMS'),
			},
			{
				path: 'core-org-verify-sms',
				name: 'core-org-verify-sms',
				component: () => import(/* webpackChunkName "OrgVerifySMS" */ '../pages/Register/OrgVerifySMS'),
			},
			{
				path: 'core-registration-steps',
				name: 'core-registration-steps',
				component: () => import(/* webpackChunkName "RegistrationSteps" */ '../pages/Register/RegistrationSteps'),
			},
			{
				path: 'core-org-registration-steps',
				name: 'core-org-registration-steps',
				component: () => import(/* webpackChunkName "OrgRegistrationSteps" */ '../pages/Register/OrgRegistrationSteps'),
			},
			{
				path: 'core-registration-confirmation',
				name: 'core-registration-confirmation',
				component: () =>
					import(/* webpackChunkName "OrgRegistrationConfirmation" */ '../pages/Register/RegistrationConfirmation'),
			},
			{
				path: 'core-org-registration-confirmation',
				name: 'core-org-registration-confirmation',
				component: () =>
					import(
				/* webpackChunkName "OrgRegistrationConfirmation" */ '../pages/Register/OrgRegistrationConfirmation'
					),
			},
		]
	},
];
