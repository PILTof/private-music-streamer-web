<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('music_files', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('file_name');
            $table->integer('file_size');
            $table->string('file_type');
            $table->string('file_dir');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('music_files');
    }
};
