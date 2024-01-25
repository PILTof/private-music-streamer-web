<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Faker\Core\File;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File as FacadesFile;
use Illuminate\Support\Facades\Storage;

class MusicPlaylistsController extends Controller
{
    //
    /** @var User $user */
    public function add(Request $request)
    {
        $table = DB::table('music_playlists');
        $res = $request->get("selected");
        $imgUrl = $request->get("imageUrl");
        

        $playlistId = $table->insertGetId(["name" => $request->name, "desc" => $request->desc, "tracks" => $request->get("selected"), "img_path" => $imgUrl]);
        $CUser = auth('sanctum')->user()->id;
        $table = DB::table('users');
        $existsplaylists = $table->where("id", '=', $CUser)->get("playlists");
        $table->where("id", '=', $CUser)->update(["playlists" => $existsplaylists[0]->playlists !== "" ? $existsplaylists[0]->playlists . ',' . $playlistId : $playlistId]);
        $res = $table->where("id", '=', $CUser)->get("playlists");
        $res = [$res[0]->playlists, $request];
        return response([$res]);
    }

    public function getUserPlaylists(Request $request)
    {
        $table = DB::table('users');
        $CUser = auth('sanctum')->user()->id;
        $dblist = $table->where("id", '=', $CUser)->get("playlists");
        $playlists = explode(",", $dblist[0]->playlists);
        $table = DB::table('music_playlists');
        $res = [$playlists];
        $res = [];
        foreach ($playlists as $item) {
            $table = DB::table('music_playlists');
            $itemRes = $table->where("id", '=', $item)->get()->first();
            $res[$itemRes->id] = $itemRes;
        }

        return response($res);
    }

    public function getPlayList(Request $request)
    {
        $res = [];
        foreach ($request["tracks"] as $ID) {
            $table = DB::table('music_files');
            if ($list = $table->where("id", '=', $ID)->get()->first()) {
                $res[] = $list;
            }
        }
        if (!empty($res)) {
            return response($res, 200);
        } else {
            return response(["unnown tracks", ...[$request->get("tracks")]], 500);
        }
    }


    public function uploadTmpImg(Request $request)
    {
        $res = [];
        if ($request->hasFile('files')) {
            $file_name = $request->file('files')->getClientOriginalName();
            $path = $request->file('files')->storeAs('public/upload/tmp_img', $file_name);
            
            return response(Storage::url($path));
        }
    }
}
