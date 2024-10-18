import { EventData, Frame, Observable, Page } from '@nativescript/core';
import { Animation } from '@nativescript/core';

class OnboardingViewModel extends Observable {
    private _currentStep: number = 0;
    private steps = [
        { icon: '&#xf06e;', title: 'Observe', description: 'Look closely at the images presented to you.' },
        { icon: '&#xf030;', title: 'Capture', description: 'Take photos to match the given descriptions.' },
        { icon: '&#xf0e7;', title: 'Win', description: 'Score points and climb the leaderboard!' }
    ];

    constructor() {
        super();
        this.updateContent();
    }

    get currentIcon(): string {
        return this.steps[this._currentStep].icon;
    }

    get currentTitle(): string {
        return this.steps[this._currentStep].title;
    }

    get currentDescription(): string {
        return this.steps[this._currentStep].description;
    }

    get buttonText(): string {
        return this._currentStep === this.steps.length - 1 ? 'Sign in with Google' : 'Next';
    }

    get currentStep(): number {
        return this._currentStep;
    }

    onButtonTap() {
        if (this._currentStep < this.steps.length - 1) {
            this._currentStep++;
            this.updateContent();
        } else {
            console.log('Sign in with Google');
            // Implement Google Sign-In logic here
        }
    }

    private updateContent() {
        this.notifyPropertyChange('currentIcon', this.currentIcon);
        this.notifyPropertyChange('currentTitle', this.currentTitle);
        this.notifyPropertyChange('currentDescription', this.currentDescription);
        this.notifyPropertyChange('buttonText', this.buttonText);
        this.notifyPropertyChange('currentStep', this.currentStep);
    }
}

export function onNavigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new OnboardingViewModel();

    // Animate content
    const content = page.getViewById('content');
    const dots = page.getViewById('dots');
    const button = page.getViewById('button');

    new Animation([
        { target: content, translate: { x: 0, y: 50 }, opacity: 0, duration: 0 },
        { target: content, translate: { x: 0, y: 0 }, opacity: 1, duration: 500, delay: 100 },
        { target: dots, opacity: 0, duration: 0 },
        { target: dots, opacity: 1, duration: 300, delay: 300 },
        { target: button, scale: { x: 0.5, y: 0.5 }, opacity: 0, duration: 0 },
        { target: button, scale: { x: 1, y: 1 }, opacity: 1, duration: 300, delay: 500 }
    ]).play();
}