var COS = require('cos-js-sdk-v5');
var cos = new COS({
    SecretId: '',
    SecretKey: '',
});

export const uploadImage=(filename,file,callback)=>{
    cos.putObject({
        Bucket: '',
        Region: 'ap-shanghai',
        Key: filename,
        StorageClass: 'STANDARD',
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
            console.log(JSON.stringify(progressData));
        }
    }, function(err, data) {
        console.log(err||data);
        console.log(data);
        callback(data);
    });
}
