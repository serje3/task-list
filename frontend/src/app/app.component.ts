import {Component, OnDestroy, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Select} from '@ngxs/store';
import {AppConfig} from '@app/shared/types/app-config.interface';
import {Observable, Subscription} from 'rxjs';
import {en_US} from './i18n/en/index';
import {ru_RU} from '@app/i18n/ru';

const storageKey = 'lang';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;
  private langChangeSubscription!: Subscription;
  currentLang: string;

  constructor(private translateService: TranslateService) {
    translateService.setTranslation('ru_RU', ru_RU);
    translateService.setTranslation('en_US', en_US);
  }

  ngOnInit() {
    this.app$.subscribe(app => {
      this.currentLang = localStorage.getItem(storageKey) || app.lang || this.translateService.getBrowserCultureLang();
      this.translateService.use(this.currentLang);
    });
    this.langChangeSubscription = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      localStorage.setItem(storageKey, event.lang);
    });
  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

}
