const multer = require('multer');
const BadRequestException = require('../exception/BadRequestException');
const Exception = require('../exception/Exception');
const ConflictException = require('../exception/ConflictException');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, `./source`); // 업로드할 디렉토리의 위치 (server.js를 기준으로 하는 위치)
        },
        filename(req, file, done) {
            const fileName = `${new Date().getTime()}.svg`; // 업로드할 파일 이름 ( 확장자명 반드시 고려 )
            done(null, fileName);
        }
    }),
    fileFilter: async (req, file, done) => {
        if (!(file.mimetype == 'text/csv')) {
            return done(new BadRequestException('유효하지 않은 파일 형식입니다.'));
        }

        done(null, true);
    },
    limits: {
        fileSize: 1 * 1024 * 1024 // 파일 사이즈 제한 ( ex. 1MB )
    }
});
const uploadMiddleware = async (req, res, next) => {
    upload.array('files')(req, res, (err) => {
        if (err) {
            if (err instanceof Exception) {
                return next(err);
            }

            return next(new ConflictException('예상하지 못한 에러가 발생했습니다.', err));
        }

        next();
    });
};

module.exports = uploadMiddleware;