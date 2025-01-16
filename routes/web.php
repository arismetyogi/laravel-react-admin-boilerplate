<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Enum\Permissions;

Route::redirect('/','login');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Verified User can Access
    Route::middleware('verified')->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');

        Route::middleware(['can:'.Permissions::ManageUsers->value])->group(function () {
            Route::resource('user', UserController::class);
        });
    });

    Route::post('/logout', function () {
        return redirect('/login');
    });
});

require __DIR__.'/auth.php';
