import {Injectable} from '@angular/core';
import {LoggerService} from "@app/views/tasks/common/services/logger.service";
import {GroupAlertService} from "@app/views/tasks/common/services/group.alert.service";
import {TranslateService} from "@ngx-translate/core";
import {Clipboard} from "@angular/cdk/clipboard";
import {AlertService} from "@app/views/tasks/common/services/alert.service";

type CopyOptions = {
  translate: {
    nothingToCopy?: string,
    filteredCopied?: string,
    copied?: string,
    allCopied?: string,
    somethingWrong?: string,
  }
}

const componentName = 'COMMON:COPY.SERVICE'
const initTranslate: CopyOptions["translate"] = {
  nothingToCopy: 'COMMON.ALERT.COPY.NOTHING_TO_COPY',
  filteredCopied: 'COMMON.ALERT.COPY.FILTERED_COPIED',
  copied: 'COMMON.ALERT.COPY.COPIED',
  allCopied: 'COMMON.ALERT.COPY.ALL_COPIED',
  somethingWrong: 'COMMON.ALERT.SOMETHING_WRONG',
}

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  private strToCopy: string = '';

  constructor(
    private loggerService: LoggerService,
    private alertService: AlertService,
    private translateService: TranslateService,
    private clipboard: Clipboard
  ) {
  }

  initializeStrToCopy(rows, property, selected) {
    if (!rows && (!selected || selected.length === 0)) {
      this.strToCopy = '';
      return;
    }
    let strToCopy = '';
    const toCopy = participant => {
      strToCopy += participant[property] + '\n';
    }
    if (!selected || selected.length === 0) {
      rows.forEach(toCopy);
    } else {
      selected.forEach(toCopy)
    }
    this.strToCopy = strToCopy;
  }

  copy<T>(rows: T[] | null, property: keyof T, selected: T[] | null, filtersEnabled = false, options: CopyOptions = {
    translate: initTranslate
  }) {
    this.initializeStrToCopy(rows, property, selected)

    const pending = this.clipboard.beginCopy(this.strToCopy);
    let remainingAttempts = 3;
    const attempt = () => {
      const copied: boolean = pending.copy();
      if (!copied && --remainingAttempts) {
        setTimeout(attempt);
      } else {
        this.alert(rows, copied, selected, filtersEnabled, options.translate);
        pending.destroy();
      }
    };
    attempt();
  }

  alert(rows, copied, selected, isFiltersEnabled, translate: CopyOptions['translate']) {
    this.loggerService.logByComponent(componentName, `alertCopy:
       rowsExist:${rows !== null}
       rowsEmpty:${rows === null || rows.length === 0}
       selectedExist:${selected !== null}
       selectedEmpty:${selected === null || selected.length === 0}`)
    if (!copied) { // !! NOT WORKING FOR FIREFOX
      this.loggerService.logByComponent(componentName, `alertCopy: NOT COPIED`)
      // Somehow the text wasn't copied
      if (rows && rows.length === 0) {
        // if rows list is empty
        this.alertService.add(this.translateService.instant(this.getTranslateProperty(translate, 'nothingToCopy')), 'warning', 4000)
      } else if (!rows && selected && selected.length === 0) {
        // if rows is null and selected list is empty
        this.alertService.add(this.translateService.instant(this.getTranslateProperty(translate, 'nothingToCopy')), 'warning', 4000)
      } else {
        this.loggerService.log(componentName, 'alertCopy: SOMETHING WRONG', rows, selected)
        // everything else
        this.alertService.add(this.translateService.instant(this.getTranslateProperty(translate, 'somethingWrong')), 'danger', 4000)
      }
      return
    }

    this.loggerService.logByComponent(componentName, 'alertCopy: COPIED or not because you use firefox..... :(');
    if (!selected || selected.length === 0) { // if no selected rows
      if (rows && rows.length) { // if rows list is not empty
        if (isFiltersEnabled) {
          // if filters was enabled
          this.alertService.add(this.translateService.instant(this.getTranslateProperty(translate, 'filteredCopied')), 'success', 4000)
        } else {
          // if no filters
          this.alertService.add(this.translateService.instant(this.getTranslateProperty(translate, 'allCopied')), 'success', 4000);
        }
      } else { // if rows list empty
        this.alertService.add(this.translateService.instant(this.getTranslateProperty(translate, 'nothingToCopy')), 'warning', 4000)
      }
    } else {
      // is selected list is not empty
      this.alertService.add(`${selected.length} ${this.translateService.instant(this.getTranslateProperty(translate, 'copied'))}`, 'success', 4000);
    }
  }

  private getTranslateProperty(translate: CopyOptions['translate'], property: keyof CopyOptions['translate']) {
    return translate[property] ?? initTranslate[property];
  }
}
