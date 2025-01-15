<?php

namespace Database\Seeders;

use App\Enum\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class
        ]);
        // Index::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin Index',
            'username' => 'admin',
            'email' => 'admin@admin.com',
        ])->assignRole(Roles::SuperAdmin);
    }
}
