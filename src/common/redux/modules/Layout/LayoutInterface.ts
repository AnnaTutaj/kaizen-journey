import { ITranslationConfig } from '@common/lang/config/types';
export interface ILayoutOwnState {
  layout: ILayoutState;
}

export interface ILayoutState {
  hideContentPadding: boolean;
  siteLanguage: ITranslationConfig['locale'];
}
