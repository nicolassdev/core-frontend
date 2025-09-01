import Triggers from './modules/Triggers';
import Notifications from './modules/Notifications';
import Searches from './modules/Searches';
import Permissions from './modules/Settings/Permissions';
import IPManagement from './modules/Settings/IPManagement';
import CustomerSupport from './modules/HelpCenter/CustomerSupport';

const store = {
	Core: {
		modules: {
			Triggers,
			Notifications,
			Searches,
			Permissions,
			IPManagement,
			CustomerSupport,
		},
		namespaced: true,
	},
};

export default store;
