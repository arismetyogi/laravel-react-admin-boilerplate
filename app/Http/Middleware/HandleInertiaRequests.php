<?php

namespace App\Http\Middleware;

use App\Enum\Permissions;
use App\Enum\Roles;
use App\Http\Resources\AuthUserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? new AuthUserResource($user) : null,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'appName' => config('app.name'),
            'locale' => config('app.locale'),
            'roles' => Role::all(),
            'roleLabels' => Roles::labels(),
            'permissions' => Permission::all(),
            'permissionLabels' => Permissions::labels(),
        ];
    }
}
