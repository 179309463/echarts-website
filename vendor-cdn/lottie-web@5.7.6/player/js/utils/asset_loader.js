/* exported assetLoader */

var assetLoader = (function () {
  function formatResponse(xhr) {
    if (xhr.response && typeof xhr.response === 'object') {
      return xhr.response;
    } if (xhr.response && typeof xhr.response === 'string') {
      return JSON.parse(xhr.response);
    } if (xhr.responseText) {
      return JSON.parse(xhr.responseText);
    }
    return null;
  }

  function loadAsset(path, callback, errorCallback) {
    var response;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    // set responseType after calling open or IE will break.
    try {
      // This crashes on Android WebView prior to KitKat
      xhr.responseType = 'json';
    } catch (err) {} // eslint-disable-line no-empty
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          response = formatResponse(xhr);
          callback(response);
        } else {
          try {
            response = formatResponse(xhr);
            callback(response);
          } catch (err) {
            if (errorCallback) {
              errorCallback(err);
            }
          }
        }
      }
    };
  }
  return {
    load: loadAsset,
  };
}());
