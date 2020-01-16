// This object will be populated with Image HTML Elements with preloaded image from url given in imagesToPreloadList.
var preloadedImagesObj = {
    optInIcon: null,
    optInArrowIcon: null
};

var imagesToPreloadList = [
    {optInArrowIcon: "image url", classNames: "ntfcsn-icon helperIcon"},
    {optInIcon: "image url", classNames: "classes you want to give"}
];


function preloadImagesFromList(imagesToPreload, callBackFunc) {
        var imgPreloadCount = 0;
        var totalImgToPreload = imagesToPreload.length;
        var preloadedImages = {};

        var tempCB = function(preloadedImgKey, preloadedImgHTMLObject) {
            imgPreloadCount++;
            preloadedImages[preloadedImgKey] = preloadedImgHTMLObject;
            if (imgPreloadCount === totalImgToPreload) {
                /* All images have been preloaded, returning those in preloaded Object */
                callBackFunc(preloadedImages);
            }
        };

        var preloadMain = function(imgToPreload) {
            var imgName = Object.keys(imgToPreload)[0];
            var imgURL = Object.values(imgToPreload)[0];
            var imgEl = new Image();
            imgEl.src = imgURL;
            imgEl.className = 'preloaded-'+ imgName +'-image ';
            if (imgToPreload.classNames) { imgEl.className = imgEl.className + imgToPreload.classNames; }
            imgEl.onload = function() { tempCB(imgName, imgEl) };
        };

        for (var i=0; i<totalImgToPreload; i++) {
            preloadMain(imagesToPreload[i]);
        }
};


preloadImagesFromList(imagesToPreloadList, function(preloadedImages_){
        preloadedImagesObj = preloadedImages_;
});
