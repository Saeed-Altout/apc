# Deployment Guide for APC Prime Admin Dashboard

This guide provides instructions for deploying the APC Prime Admin Dashboard to a production server.

## Building for Deployment

The static build for deployment is now in the `dist` folder. Follow these steps:

1. Run the deployment build:

   ```bash
   npm run build:deploy
   ```

2. This will create a static build in the `dist` directory, ready for deployment.

## Deployment Instructions

### Step 1: Copy Files to Your Web Server

Upload the entire contents of the `dist` directory to your web server's public directory (e.g., `/var/www/html/`).

### Step 2: Configure Your Web Server

#### Apache Configuration

If you're using Apache, create or edit the virtual host configuration:

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/html/dist

    <Directory "/var/www/html/dist">
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Also, create a `.htaccess` file in the root of your deployment with:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx Configuration

If you're using Nginx, configure your server block:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/dist;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }

    error_page 404 /404.html;
}
```

### Step 3: Set Up API Environment

Make sure your API endpoint is properly configured. Create a `.env.local` file at the root of your deployment directory with:

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## Notes on Static Deployment

- The build is set to generate static pages for specific user IDs (new, 1, 2, 3). If you need to support more IDs, update the `generateStaticParams` function in `app/(dashboard)/(routes)/users/[id]/page.tsx`.
- Client-side navigation will work for routes not explicitly pre-rendered.
- Images and assets should work correctly as they're optimized for static deployment.

## Troubleshooting

If you encounter issues:

1. Check for 404 errors in the browser console - this could indicate routing issues
2. Verify that your server is configured to serve the `index.html` file for missing routes
3. Ensure all API endpoints are correctly configured and accessible
4. For client-side routing issues, make sure your web server is configured to redirect all requests to `index.html`

## Additional Resources

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Deploying Next.js to Production](https://nextjs.org/docs/deployment)
