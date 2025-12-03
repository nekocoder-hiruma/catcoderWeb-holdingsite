import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

/**
 * Custom render function that wraps components with necessary providers
 * Follows DRY principle by centralizing provider setup
 */
export function renderWithProviders(ui, options = {}) {
    const {
        route = '/',
        ...renderOptions
    } = options;

    window.history.pushState({}, 'Test page', route);

    function Wrapper({ children }) {
        return (
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    {children}
                </I18nextProvider>
            </BrowserRouter>
        );
    }

    return render(ui, { wrapper: Wrapper, ...renderOptions });
}

/**
 * Re-export everything from testing library
 */
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
