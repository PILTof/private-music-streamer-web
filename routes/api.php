<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MusicFilesController;
use App\Http\Controllers\MusicPlaylistsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/add_tracks', [MusicFilesController::class, 'add']);
Route::get('/admin/getMusic', [MusicFilesController::class, 'getAll']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::post('/admin/setDirForSelected', [MusicFilesController::class, 'setDirectory']);
Route::post('/admin/deleteElement', [MusicFilesController::class, 'deleteElement']);
Route::post('/admin/addPlaylist', [MusicPlaylistsController::class, 'add']);
Route::get('/admin/getPlaylists', [MusicPlaylistsController::class, 'getUserPlaylists']);
Route::post('/admin/getPlaylist', [MusicPlaylistsController::class, 'getPlayList']);
Route::post('/admin/uploadTmpImg', [MusicPlaylistsController::class, 'uploadTmpImg']);
Route::post('/admin/createPlayList', [MusicPlaylistsController::class, 'createPlayList']);

// Route::post('/create_admin', [AuthController::class, 'create_admin']);
