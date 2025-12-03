module.exports = {
  purge: {
    enabled: true,
    content: [
      '../**/*.html',
      '**/*.js',
    ]
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
