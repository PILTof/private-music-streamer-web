<?php

namespace App\Http\Controllers;

use App\Http\Requests\MusicFilesRequest;
use App\Models\MusicFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MusicFilesController extends Controller
{
    //
    public function add(MusicFilesRequest $request)
    {
        $res = [];
        if ($request->hasFile('files')) {
            $table = DB::table('music_files');
            $file_name = $request->file('files')->getClientOriginalName();
            $table->where('file_name', 'public/upload/music/' . $file_name);
            $type = $request->file('files')->getMimeType();
            $file_exist = $table->where([['file_name', '=', 'public/upload/music/' . $file_name], ['file_type', '=', $type]])->get();
            $size = $request->file('files')->getSize();
            $path = $request->file('files')->storeAs('public/upload/music', $file_name);
            $res = [
                "file_name" => $path,
                "file_size" => $size,
                "file_type" => $type,
                "file_dir" => $request["dir"]
            ];

            if (count($file_exist) <= 0) {
                $insertRes = $table->insertGetId($res);
                $res["file_name"] = $path . '_' . time();
                $res["id"] = $insertRes;
                return response(["data" => $res, 'message' => 'Файл ' . '"' . $file_name . '"' . ' добавлен успешно', 'error' => ''], 200);
            } else {
                $res = $file_exist[0];
                return response(["data" => $res, 'message' => '', 'error' => 'Файл ' . '"' . $file_name . '"' . ' уже существует'], 303);
            }
        } else {
            return response(['data' => [], "message" => '', 'error' => 'Нет контента('], 400);
        }
    }
    public function getAll(MusicFilesRequest $request)
    {
        $res = [];
        $table = DB::table('music_files');
        $res[] = $table->get();
        return response($res);
    }


    public function setDirectory(MusicFilesRequest $request)
    {
        $res = [];
        foreach ($request->all() as $item) {
            $table = DB::table('music_files');
            $table_item = $table->where('id', '=', $item["id"])->update(["file_dir" => $item["dir"]]);
            $res[] = $item;
        }
        // $res = $request;
        return response($res);
    }
    public function deleteElement(MusicFilesRequest $request)
    {
        $table = DB::table('music_files')->delete($request[0]);
        return response($request[0]);
    }
}
