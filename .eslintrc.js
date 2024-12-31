module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
};
