<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'avatar' => $this->avatar ? asset($this->avatar) : '',
            'is_active' => $this->is_active,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => $this->created_at,
            'roles' => $this->getRoleNames(),
            'permissions' =>  $this->getAllPermissions()
                ->map(function ($permission) {
                    return $permission->name;
                }),
        ];
    }
}
