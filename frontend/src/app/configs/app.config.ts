import {AppConfig} from '@app/shared/types/app-config.interface';
import {defaultLanguage} from './i18n.config';

export const AppConfiguration: AppConfig = {
  layoutType: 'horizontal',
  sideNavCollapse: false,
  mobileNavCollapse: false,
  lang: defaultLanguage,
  navMenuColor: 'light',
  headerNavColor: '#ffffff'
};

// Change your API endpoint here
export const API_ENDPOINT = '/api';
