<?php

namespace App\Enum;

enum Permissions: string
{
    case ManageUsers = 'manage-users';
    case ManageRoles = 'manage-roles';
    case ManagePermissions = 'manage-permissions';
    case ManageDepartments = 'manage-departments';
    case ManageStores = 'manage-stores';
    case ManageEmployees = 'manage-employees';
    case ManagePayrolls = 'manage-payrolls';

    public function label()
    {
        return match ($this) {
            self::ManageUsers => 'Manage Users',
            self::ManageRoles => 'Manage Roles',
            self::ManagePermissions => 'Manage Permissions',
            self::ManageDepartments => 'Manage Departments',
            self::ManageStores => 'Manage Stores',
            self::ManageEmployees => 'Manage Employees',
            self::ManagePayrolls => 'Manage Payrolls',
        };
    }

}
