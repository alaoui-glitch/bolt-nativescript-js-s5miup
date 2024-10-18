import { EventData, Frame, Page } from '@nativescript/core';
import { Animation, Enums } from '@nativescript/core';

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    const logo = page.getViewById('logo');
    const logoIcon = page.getViewById('logoIcon');
    const titleContainer = page.getViewById('titleContainer');
    const progressBarContainer = page.getViewById('progressBarContainer');
    const progressBar = page.getViewById('progressBar');

    // Initial logo animation
    new Animation([
        { target: logo, rotate: 360, scale: { x: 1.2, y: 1.2 }, duration: 1000, iterations: 1, curve: Enums.AnimationCurve.easeInOut },
        { target: logoIcon, rotate: 360, duration: 1000, iterations: Infinity, curve: Enums.AnimationCurve.linear }
    ]).play();

    // Delayed title and subtitle animation
    setTimeout(() => {
        titleContainer.animate({ opacity: 1, translate: { x: 0, y: -20 }, duration: 500 });
    }, 1000);

    // Progress bar animation
    setTimeout(() => {
        progressBarContainer.animate({ opacity: 1, duration: 500 });
        progressBar.animate({ width: '100%', duration: 2500 }).then(() => {
            Frame.topmost().navigate({
                moduleName: 'onboarding-page',
                clearHistory: true,
                transition: {
                    name: 'fade',
                    duration: 300
                }
            });
        });
    }, 2000);
}