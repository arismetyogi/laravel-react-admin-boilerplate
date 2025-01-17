<?php

namespace App\Http\Controllers;

use App\Enum\Permissions;
use App\Enum\Roles;
use App\Http\Resources\AuthUserResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Return Inertia::render('user/index', [
        'users' => AuthUserResource::collection(User::all())->collection->toArray(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('user/edit', [
            'user' => new AuthUserResource($user),
            'roles' => Role::all(),
            'roleLabels' => Roles::labels(),
            'permissions' => Permission::all(),
            'permissionLabels' => Permissions::labels()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => ['sometimes', 'array'],
            'permissions' => ['sometimes', 'array'],
        ]);

        $user->syncRoles($data['roles']);
        $user->syncPermissions($data['permissions']);

        return redirect()->to(route('user.index'))->with(['success' => 'User roles and permissions has been updated']);
    }

}
