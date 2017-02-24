import React from 'react';
import { expect } from 'chai';
import jsdom from 'jsdom';
import { shallow, mount, render } from 'enzyme';

const doc = jsdom.jsdom('<!doctype html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
        global.requestAnimationFrame = global[vendors[x]+'RequestAnimationFrame'];
        global.cancelAnimationFrame = global[vendors[x]+'CancelAnimationFrame']
                                   || global[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!global.requestAnimationFrame)
        global.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = global.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!global.cancelAnimationFrame)
        global.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

global.React = React;
global.expect = expect;
global.shallow = shallow;
global.mount = mount;
global.render = render;
