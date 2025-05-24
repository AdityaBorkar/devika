# GitHub OAuth Setup for Devika

To enable GitHub authentication in Devika, you need to create a GitHub OAuth App and configure environment variables.

## 1. Create GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Devika (or your preferred name)
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

## 2. Environment Variables

Add the following environment variables to your `.env` file or create one:

```bash
# Database
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token

# Better Auth
BETTER_AUTH_SECRET=your_super_secret_key_here
BETTER_AUTH_URL=http://localhost:3000

# GitHub OAuth (Required for login)
GITHUB_CLIENT_ID=your_github_client_id_from_oauth_app
GITHUB_CLIENT_SECRET=your_github_client_secret_from_oauth_app
```

## 3. Generate Secret Key

Generate a secure secret key for Better Auth:

```bash
openssl rand -base64 32
```

## 4. Database Setup

Run the database migrations to create the necessary auth tables:

```bash
bun db:push
```

## 5. Start Development Server

```bash
bun dev
```

Your login screen will now be available at `http://localhost:3000` with GitHub authentication enabled.

## Production Setup

For production deployment:

1. Update the OAuth App callback URL to your production domain
2. Update `BETTER_AUTH_URL` to your production URL
3. Use secure, randomly generated secrets
4. Configure your production database credentials

## Features

The login screen includes:
- ✅ Modern, responsive design
- ✅ GitHub OAuth integration
- ✅ Terms & conditions acceptance requirement
- ✅ Loading states and error handling
- ✅ Animated UI components
- ✅ Mobile-friendly design 