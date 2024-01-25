// Конвертация из байтов в мб
export const formatBytes = (bytes, decimals = 2) => {
	if (bytes === 0) {
		return '0';
	} else {
		var k = 1024;
		var dm = decimals < 0 ? 0 : decimals;
		var sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
		var i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}
}

// Мимтипы музыки
export const music_mimetypes = (type) => {
    switch (type) {
        case "audio/basic":
            return true;
        case "audio/L24":
            return true;
        case "audio/mp4":
            return true;
        case "audio/aac":
            return true;
        case "audio/mpeg":
            return true;
        case "audio/ogg":
            return true;
        case "audio/vorbis":
            return true;
        case "audio/x-ms-wma":
            return true;
        case "audio/x-ms-wax":
            return true;
        case "audio/wav":
            return true;
        case "audio/vnd.rn-realaudio":
            return true;
        case "audio/vnd.wave":
            return true;
        case "audio/webm":
            return true;
        default:
            return false;
    }
};
