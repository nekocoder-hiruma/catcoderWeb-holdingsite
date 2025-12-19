import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Helmet } from 'react-helmet-async';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ContactContent = () => {
    const { t } = useTranslation();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            console.error('Execute recaptcha not yet available');
            return;
        }

        setStatus('sending');

        try {
            // Generate ReCaptcha token
            const token = await executeRecaptcha('contact_form_submit');

            if (!token) {
                setStatus('error');
                return;
            }

            // Prepare data for Google Apps Script
            // Note: Google Apps Script expects form data or URL encoded data usually,
            // but we'll send JSON if the script is set up to handle it (doPost(e)).
            // Standard approach for simple scripts is often URLSearchParams.
            const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

            if (!scriptUrl) {
                console.error('Google Script URL not configured');
                setStatus('error');
                return;
            }

            // Using URLSearchParams to ensure compatibility with typical GAS doPost(e) implementations
            const params = new URLSearchParams();
            params.append('name', formData.name);
            params.append('email', formData.email);
            params.append('message', formData.message);
            params.append('g-recaptcha-response', token);

            const response = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors', // Important for GAS to avoid CORS errors (opaque response)
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            });

            // Since mode is 'no-cors', we get an opaque response and can't check response.ok
            // We assume success if no network error occurred.
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex items-center justify-center">
            <Helmet>
                <title>Contact Me | Wong Wai Keat</title>
                <meta name="description" content="Contact Wai Keat for inquiries or collaboration." />
            </Helmet>
            <div className="w-full max-w-lg">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-4">{t('contact.title')}</h1>
                    <p className="text-gray-400">{t('contact.subtitle')}</p>
                </div>

                <div className="bg-navy-800/50 backdrop-blur-sm border border-navy-700 rounded-2xl p-8 shadow-xl">
                    {status === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="text-green-500" size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{t('contact.success')}</h3>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-6 text-orange hover:text-orange-400 font-medium transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.name')}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-navy-900/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.email')}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-navy-900/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                    {t('contact.message')}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-navy-900/50 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-colors resize-none"
                                    placeholder="Your message here..."
                                />
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                                    <AlertCircle size={16} />
                                    <span>{t('contact.error')}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-gradient-to-r from-orange to-magenta text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-orange/20 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {status === 'sending' ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        {t('contact.sending')}
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        {t('contact.send')}
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                This site is protected by reCAPTCHA and the Google
                                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white mx-1">Privacy Policy</a> and
                                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white mx-1">Terms of Service</a> apply.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

// Wrap the content with the provider so it only loads when this component matches the route
const Contact = () => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            <ContactContent />
        </GoogleReCaptchaProvider>
    );
};

export default Contact;
