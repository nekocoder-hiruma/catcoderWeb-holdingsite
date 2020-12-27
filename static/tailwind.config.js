module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    // purge: {
    //     enabled: true,
    //     content: [
    //         '../templates/**/*.html',
    //         '../sgga_user/templates/**/*.html',
    //         '../sgga_website/templates/**/*.html',
    //         '../sgga_membership/templates/**/*.html'
    //     ],
    // },
    theme: {
        extend: {},
    },
    variants: {},
    plugins: [
        require('@tailwindcss/ui')
    ],
}
