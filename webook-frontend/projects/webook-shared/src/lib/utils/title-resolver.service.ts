import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TitleResolverService {
    private alreadyStarted = false;

    constructor(private router: Router, private titleService: Title) {
        this.startTitleResolver();
    }

    public startTitleResolver(): void {
        if (this.alreadyStarted) {
            return;
        }
        this.alreadyStarted = true;
        const appName = 'Webook';

        this.router.events.pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => {
                const title = this.getTitle(this.router.routerState, this.router.routerState.root);
                // TODO: Set Title Correctly (app name)
                return title ? `${title.trim()} | ${appName}` : appName;
            }))
            .subscribe((title: string) => this.titleService.setTitle(title));
    }

    private getTitle(state: any, parent: any): string {
        let title: string;
        if (parent && parent.snapshot.data && parent.snapshot.data.title) {
            title = parent.snapshot.data.title;
        } else if (state && parent) {
            title = this.getTitle(state, state.firstChild(parent));
        }
        return title;
    }
}
