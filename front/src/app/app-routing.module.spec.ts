import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { UnauthGuard } from './guards/unauth.guard';
import { MeComponent } from './components/me/me.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { expect, it, describe, beforeEach } from '@jest/globals';

describe('AppRoutingModule', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        AppRoutingModule,
      ],
      providers: [AuthGuard, UnauthGuard],
    });

    router = TestBed.inject(Router);
  });

  it('should register exactly 5 routes', () => {
    expect(router.config.length).toBe(5);
  });

  it('should have the root "" path guarded by UnauthGuard and lazy-load AuthModule', () => {
    const r = router.config.find((r) => r.path === '');
    expect(r).toBeTruthy();
    if (!r) {
      return;
    }
    expect(r.canActivate).toEqual([UnauthGuard]);
    if (!r) {
      return;
    }
    expect(typeof r.loadChildren).toBe('function');
  });

  it('should have "sessions" path guarded by AuthGuard and lazy-load SessionsModule', () => {
    const r = router.config.find((r) => r.path === 'sessions');
    expect(r).toBeTruthy();
    if (!r) {
      return;
    }
    expect(r.canActivate).toEqual([AuthGuard]);

    expect(typeof r.loadChildren).toBe('function');
  });

  it('should have "me" path guarded by AuthGuard and use MeComponent', () => {
    const r = router.config.find((r) => r.path === 'me');
    expect(r).toBeTruthy();
    if (!r) {
      return;
    }
    expect(r.canActivate).toEqual([AuthGuard]);
    if (!r) {
      return;
    }
    expect(r.component).toBe(MeComponent);
  });

  it('should map "404" to NotFoundComponent', () => {
    const r = router.config.find((r) => r.path === '404');
    expect(r).toBeTruthy();
    if (!r) {
      return;
    }
    expect(r.component).toBe(NotFoundComponent);
  });

  it('should redirect wildcard "**" to "404"', () => {
    const r = router.config.find((r) => r.path === '**');
    expect(r).toBeTruthy();
    if (!r) {
      return;
    }
    expect(r.redirectTo).toBe('404');
  });

  it('should map "404" to NotFoundComponent', () => {
    const r = router.config.find((r) => r.path === '404');
    expect(r).toBeDefined();
    if (!r) {
      return;
    }
    expect(r.component).toBe(NotFoundComponent);
  });
});