# Laravel + react + shadcn/ui + InertiaJS Boilerplate

![Laravel + react + shadcn/ui + InertiaJS Boilerplate](https://raw.githubusercontent.com/arismetyogi/laravel-react-admin-boilerplate/main/public/repository-cover.png)

This is a template to start building a custom user/admin panel quickly.
Feel free to customize this template to fit the specific needs of your Laravel application!

## Technologies

- [Laravel 11](https://laravel.com/docs/)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [InertiaJS](https://inertiajs.com/)
- [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- PHP >= 8.3
- Composer (for package management)
- Node.js 20+ & npm 10.9+ (for frontend dependencies)
- MySQL or another [compatible database](https://laravel.com/docs/11.x/database#configuration)

## Installation

1. Clone the repository: `git clone https://github.com/arismetyogi/laravel-react-admin-boilerplate.git [project directory]`
2. Navigate into the project directory: `cd [project directory]`
3. Install PHP dependencies: `composer install`
4. Copy `.env.example` to `.env` and configure your environment variables, including database settings and application key.
5. Generate application key: `php artisan key:generate`
6. Run database migrations: `php artisan migrate`
7. Optionally, seed the database: `php artisan db:seed`
8. Install frontend dependencies: `npm install && npm run dev` (for development) or `npm install && npm run build` (for production)

## Usage

To start the development server, run:

```
php artisan serve
```

Access the application in your browser at `http://localhost:8000` by default.

## Contact

If you have any questions, feedback, or support requests, you can reach me here [arismetyogi@gmail.com](https://github.com/arismetyogi/laravel-react-admin-boilerplate.git)

## Credit

Big shout out to [mahmudz](https://github.com/mahmudz/laravel-shadcn-app-panel.git)
