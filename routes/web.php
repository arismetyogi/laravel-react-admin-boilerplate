<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/','login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['role:'.\App\Enum\Roles::SuperAdmin->value])->group(function () {
        Route::resource('users', UserController::class);
    });

    Route::middleware(['can:'.\App\Enum\Permissions::ManageUsers->value])->group(function () {
        Route::resource('users', UserController::class);
    });

    Route::post('/logout', function () {
        return redirect('/login');
    });
});

require __DIR__.'/auth.php';
