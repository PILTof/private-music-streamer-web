<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use App\Models\User;

class AuthController extends Controller
{
    //

    public function login(LoginRequest $request) {

        $credentials = $request->validated();
        // Auth::attempt($credentials);
        if(!Auth::attempt($credentials)) {
            return response([
                'message' => 'Input incorrect'
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;


        return response([
            'user' => $user, 'token' => $token
        ]);
    }

    public function logout(Request $request) {
        /** @var User $user */
        $user = $request->user();
        return response($request);
        $user->currentAccessToken()->delete();
    }

    // public function create_admin(LoginRequest $request) {
    //     $cred = $request->validated();
    //     /** @var \App\Models\User $user */
    //     $user = User::create([
    //         'name' => $cred["name"],
    //         'email' => $cred["name"].'@ya.ru',
    //         "password" => bcrypt($cred["password"])
    //     ]);
    //     return response([
    //         'user' => $user
    //     ]);
    // }

}
