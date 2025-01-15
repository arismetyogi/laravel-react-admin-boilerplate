<?php

namespace App\Enum\Enums;

enum Permissions: string
{
    case ManageUsers = 'manage-users';
    case ManageRoles = 'manage-roles';
    case ManagePermissions = 'manage-permissions';

    public function label()
    {
        return match ($this) {
            self::ManageUsers => 'Manage Users',
            self::ManageRoles => 'Manage Roles',
            self::ManagePermissions => 'Manage Permissions',
        };
    }

}
