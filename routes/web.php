<?php

use App\Http\Controllers\ProfileController;
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

    Route::middleware(['can:'.\App\Enum\Permissions::ManageUsers->value])->group(function () {
        Route::get('/users', function () {
            return Inertia::render('user');
        })->name('users');
    });

    Route::post('/logout', function () {
        return redirect('/login');
    });
});

require __DIR__.'/auth.php';
