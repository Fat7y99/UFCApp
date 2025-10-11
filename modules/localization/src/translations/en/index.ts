import { TranslationNamespaces } from '@modules/localization/src/enums';
import common from './common';
import home from './home';
import landing from './landing';
import login from './login';
import networkLogs from './networkLogs';
import notifications from './notifications';
import signup from './signup';

export default {
  [TranslationNamespaces.COMMON]: common,
  [TranslationNamespaces.NETWORK_LOGS]: networkLogs,
  [TranslationNamespaces.LOGIN]: login,
  [TranslationNamespaces.HOME]: home,
  [TranslationNamespaces.NOTIFICATIONS]: notifications,
  [TranslationNamespaces.LANDING]: landing,
  [TranslationNamespaces.SIGNUP]: signup,
};
