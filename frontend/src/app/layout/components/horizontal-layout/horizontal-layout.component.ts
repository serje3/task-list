import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {AppConfig, NavMenuColor} from '@app/shared/types/app-config.interface';
import {ScreenSizeService} from '@app/shared/services/screen-size.service';
import {delay, filter, map, startWith} from 'rxjs/operators';
import {SCREEN_SIZE} from '@app/shared/types/screen-size.enum';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'horizontal-layout',
  templateUrl: './horizontal-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.horizontal-layout]': 'true'
  },
  providers: [ScreenSizeService]
})
export class HorizontalLayoutComponent implements OnInit, OnDestroy {

  @Select((state: { app: AppConfig; }) => state.app) app$: Observable<AppConfig>;

  navMenuColor: NavMenuColor;
  headerNavColor: string;
  showHeaderNavbar: boolean = true;
  isMobile: boolean;
  subscription: Subscription;

  constructor(private cdr: ChangeDetectorRef, private screenSizeSvc: ScreenSizeService,
              private router: Router, private activatedRoute: ActivatedRoute) {
    this.screenSizeSvc.onResize$.pipe(delay(0)).subscribe(sizes => {
      const sizeTabletAbove = sizes.includes(SCREEN_SIZE.XXL) || sizes.includes(SCREEN_SIZE.XL) || sizes.includes(SCREEN_SIZE.LG);
      if (sizeTabletAbove) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
      this.cdr.markForCheck();
    });
    this.setHeaderNavbarVisibility();
  }

  setHeaderNavbarVisibility() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(this.router),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          console.log(child);
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['hideHeaderNavbar']) {
            return child.snapshot.data['hideHeaderNavbar'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe((data: NavigationEnd) => {
      data ? this.showHeaderNavbar = false : this.showHeaderNavbar = true;
    });
  }

  @HostListener('window:resize', ['$event']) windowResize(event) {
    this.getScreenWidth(event.target.innerWidth);
  }

  ngOnInit() {
    this.subscription = this.app$.subscribe(app => {
      this.navMenuColor = app.navMenuColor;
      this.headerNavColor = app.headerNavColor;
      this.cdr.markForCheck();
    });
    this.getScreenWidth(window.innerWidth);
  }

  getScreenWidth(size: number) {
    this.screenSizeSvc.onResize(size);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
