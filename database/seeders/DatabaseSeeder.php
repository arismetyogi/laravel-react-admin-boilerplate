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


        User::factory()->create([
            'name' => 'Admin User',
            'username' => 'admin',
            'is_active' => true,
            'email' => 'admin@admin.com',
        ])->assignRole(Roles::SuperAdmin);

        User::factory(4)->create();
        User::factory(5)->unverified()->create();
        User::factory(90)->create();
    }
}
