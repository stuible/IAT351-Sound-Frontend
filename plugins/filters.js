import Vue from 'vue'

Vue.filter('HHMMSS', function (num) {
    // jacked from: https://github.com/sindresorhus/pretty-bytes
    if (typeof num !== 'number' || isNaN(num)) {
      throw new TypeError('Expected a number');
    }
  
    let hhmmss = new Date(num * 1000).toISOString().substr(11, 8);

    return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
  });