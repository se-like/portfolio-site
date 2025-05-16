/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              frame-src 'self' https://www.google.com/recaptcha/;
              connect-src 'self';
              form-action 'self';
              base-uri 'self';
              frame-ancestors 'none';
              object-src 'none';
            `.replace(/\s+/g, ' ').trim()
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 