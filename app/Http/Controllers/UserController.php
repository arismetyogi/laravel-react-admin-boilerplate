<?php

namespace App\Http\Controllers;

use App\Enum\Permissions;
use App\Enum\Roles;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
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
        $users = User::orderByDesc('created_at')->get();

        return Inertia::render('user/index', [
        'users' => UserResource::collection($users)->collection->toArray(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'username' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->has('image')) {
            $fileUrl = $request->file('image')->store('avatars', 'public');
            $validated['avatar'] = $fileUrl;
        }

        User::create($validated);
        return back();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('user/edit', [
            'user' => new UserResource($user),
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
        $validated = $request->validate([
            'name' => 'required',
            'username' => [
                'required',
                Rule::unique('users','username')->ignore($user),
                ],
            'email' => [
                'sometimes',
                'email',
                Rule::unique('users', 'email')->ignore($user),
                ],
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->has('image')) {
            $disk = Storage::disk('public');

            # remove prev avatar
            if ($user->avatar && $disk->exists($user->avatar)) {
                $disk->delete($user->avatar);
            }

            $fileUrl = $request->file('image')->store('avatars', 'public');
            $validated['avatar'] = $fileUrl;
        }

        $user->update($validated);
        return back();
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }

    public function updateStatus(User $user, Request $request)
    {
        $request->validate([
            'status' => ['sometimes', 'lowercase', 'in:block,activate'],
        ]);
        $user->is_active = $request->status === 'activate';
        $user->save();
        return back();
    }

    public function update_roles(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => ['sometimes', 'array'],
            'permissions' => ['sometimes', 'array'],
        ]);

        $user->syncRoles($data['roles']);
        $user->syncPermissions($data['permissions']);

        return back();
    }
}
