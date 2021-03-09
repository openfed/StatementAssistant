const proto = {
    init() {
        window.iFrameResizer = {
            onReady: () => this.onIFrameResizerReady()
        };

        window.scrollToOrig = window.scrollTo;

        return this;
    },
    attachListeners() {
        this.retainedInvalidListener = (event) => this.onInputInvalid(event);
        document.querySelector('body').addEventListener('invalid', this.retainedInvalidListener , true);
    },
    removeListeners() {
        document.querySelector('body').removeEventListener('invalid', this.retainedInvalidListener, true);
    },
    onIFrameResizerReady() {
        if ('parentIFrame' in window) {
            window.scrollTo = window.parentIFrame.scrollToOffset;
            window.scrollToOrig = window.parentIFrame.scrollTo;
            this.attachListeners();
        }
    },
    onInputInvalid(event) {
        const { target } = event;

        setTimeout(() => {
            const { activeElement } = document;

            if (target === activeElement && target.type === 'radio') {
                const { top } = activeElement.getBoundingClientRect();
                window.scrollTo(0, top - 100);

                // prevent infinite loop
                this.removeListeners();
                setTimeout(() => {
                    activeElement.reportValidity();
                    this.attachListeners();
                }, 0);
            }
        }, 0);
    }
}

export default () => Object.create(proto).init();
