import { TranslationNamespaces } from '@modules/localization/src/enums';
import changePassword from './changePassword';
import common from './common';
import contact from './contact';
import editProfile from './editProfile';
import help from './help';
import home from './home';
import landing from './landing';
import login from './login';
import networkLogs from './networkLogs';
import notifications from './notifications';
import settings from './settings';
import signup from './signup';

export default {
  [TranslationNamespaces.COMMON]: common,
  [TranslationNamespaces.NETWORK_LOGS]: networkLogs,
  [TranslationNamespaces.LOGIN]: login,
  [TranslationNamespaces.HOME]: home,
  [TranslationNamespaces.NOTIFICATIONS]: notifications,
  [TranslationNamespaces.LANDING]: landing,
  [TranslationNamespaces.SIGNUP]: signup,
  [TranslationNamespaces.SETTINGS]: settings,
  [TranslationNamespaces.HELP]: help,
  [TranslationNamespaces.CONTACT]: contact,
  [TranslationNamespaces.CHANGE_PASSWORD]: changePassword,
  [TranslationNamespaces.EDIT_PROFILE]: editProfile,
};
