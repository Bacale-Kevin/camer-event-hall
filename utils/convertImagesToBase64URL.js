// export function convertImagesToBase64URL(src, callback) {
//   var image = new Image();
//   image.crossOrigin = "Anonymous";
//   image.onload = function () {
//     var canvas = document.createElement("canvas");
//     var context = canvas.getContext("2d");
//     canvas.height = this.naturalHeight;
//     canvas.width = this.naturalWidth;
//     context.drawImage(this, 0, 0);
//     var dataURL = canvas.toDataURL("image/jpeg");
//     return callback(dataURL);
//   };
//   image.src = src;
// }

export const convertImagesToBase64DataURL = (url) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
