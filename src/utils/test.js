!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
      ? define([], e)
      : 'object' == typeof exports
        ? (exports.odoo = e())
        : (t.odoo = e());
})(this, function () {
  return (function (t) {
    function e(a) {
      if (r[a]) return r[a].exports;
      var n = (r[a] = { exports: {}, id: a, loaded: !1 });
      return t[a].call(n.exports, n, n.exports, e), (n.loaded = !0), n.exports;
    }
    var r = {};
    return (e.m = t), (e.c = r), (e.p = '/'), e(0);
  })([
    function (t, e, r) {
      'use strict';
      function a(t) {
        return t && t.__esModule ? t : { default: t };
      }
      Object.defineProperty(e, '__esModule', { value: !0 });
      var n = r(2);
      Object.defineProperty(e, 'default', {
        enumerable: !0,
        get: function () {
          return a(n)['default'];
        },
      });
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e['default'] = function (t) {
          var e = void 0,
            r = function a(r) {
              (e = requestAnimationFrame(a)), t(r);
            };
          return (
            r(0),
            function () {
              return cancelAnimationFrame(e);
            }
          );
        });
    },
    function (t, e, r) {
      'use strict';
      function a(t) {
        return t && t.__esModule ? t : { default: t };
      }
      Object.defineProperty(e, '__esModule', { value: !0 });
      var n = r(1),
        l = a(n),
        o = r(5),
        i = r(10),
        c = a(i),
        u = '0123456789ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnoprstuvwxyz'.split(''),
        f = u.length - 1,
        d = 2,
        s = function (t, e, r, a) {
          var n,
            l = ((n = ((n = o.append.call(t, 'g')), o.attr).call(n, 'id', 'digit-' + a)), o.style).call(n, 'filter', 'url(#motionFilter-' + a + ')');
          return (
            u.forEach(function (t, a) {
              var n;
              ((n = ((n = o.append.call(l, 'text')), o.attr).call(n, 'y', -a * e * r)), o.text).call(n, t);
            }),
            l
          );
        },
        p = function (t, e) {
          var r;
          return ((r = ((r = ((r = ((r = ((r = ((r = ((r = o.append.call(t, 'filter')), o.attr).call(r, 'id', 'motionFilter-' + e)), o.attr).call(
            r,
            'width',
            '300%',
          )),
          o.attr).call(r, 'x', '-100%')),
          o.append).call(r, 'feGaussianBlur')),
          o.attr).call(r, 'class', 'blurValues')),
          o.attr).call(r, 'in', 'SourceGraphic')),
          o.attr).call(r, 'stdDeviation', '0 0');
        },
        v = function (t) {
          var e;
          return ((e = ((e = ((e = ((e = ((e = o.append.call(t, 'filter')), o.attr).call(e, 'id', 'createShadowFailFilter')), o.attr).call(e, 'width', '300%')),
          o.attr).call(e, 'x', '-100%')),
          o.append).call(e, 'feGaussianBlur')),
          o.attr).call(e, 'stdDeviation', '0 0');
        },
        y = function (t, e) {
          var r;
          return ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r = ((r =
            o.append.call(t, 'linearGradient')),
          o.attr).call(r, 'id', 'gradient-' + e)),
          o.attr).call(r, 'x1', '0%')),
          o.attr).call(r, 'y1', '0%')),
          o.attr).call(r, 'x2', '0%')),
          o.attr).call(r, 'y2', '100%')),
          o.append).call(r, 'stop')),
          o.attr).call(r, 'offset', '0')),
          o.attr).call(r, 'stop-color', 'white')),
          o.attr).call(r, 'stop-opacity', '0')),
          o.select).call(r, '#gradient-' + e)),
          o.append).call(r, 'stop')),
          o.attr).call(r, 'offset', '0.2')),
          o.attr).call(r, 'stop-color', 'white')),
          o.attr).call(r, 'stop-opacity', '1')),
          o.select).call(r, '#gradient-' + e)),
          o.append).call(r, 'stop')),
          o.attr).call(r, 'offset', '0.8')),
          o.attr).call(r, 'stop-color', 'white')),
          o.attr).call(r, 'stop-opacity', '1')),
          o.select).call(r, '#gradient-' + e)),
          o.append).call(r, 'stop')),
          o.attr).call(r, 'offset', '1')),
          o.attr).call(r, 'stop-color', 'white')),
          o.attr).call(r, 'stop-opacity', '0');
        },
        h = function (t, e) {
          var r;
          return ((r = ((r = ((r = ((r = ((r = ((r = ((r = o.append.call(t, 'mask')), o.attr).call(r, 'id', 'mask-' + e)), o.append).call(r, 'rect')),
          o.attr).call(r, 'x', 0)),
          o.attr).call(r, 'y', 0)),
          o.attr).call(r, 'width', '100%')),
          o.attr).call(r, 'height', '100%')),
          o.attr).call(r, 'fill', 'url(#gradient-' + e + ')');
        },
        m = function (t, e, r) {
          var a;
          return ((a = ((a = ((a = o.attr.call(t, 'width', e)), o.attr).call(a, 'height', r)), o.attr).call(a, 'viewBox', '0 0 ' + e + ' ' + r)), o.style).call(
            a,
            'overflow',
            'hidden',
          );
        };
      e['default'] = function (t) {
        var e,
          r = t.el,
          a = t.from,
          n = t.to,
          i = t.lineHeight,
          g = void 0 === i ? 1.35 : i,
          b = t.letterSpacing,
          _ = void 0 === b ? 1 : b,
          x = t.animationDelay,
          j = void 0 === x ? 100 : x,
          M = t.letterAnimationDelay,
          w = void 0 === M ? 100 : M,
          O = (0, o.select)(r),
          P = window.getComputedStyle(O),
          S = parseInt(P.fontSize, 10),
          D = (S * g - S) / 2 + S / 10,
          E = S * g - D,
          F = Date.now(),
          B = 0,
          k = S * g + D;
        O.innerHTML = '';
        var A = o.append.call(O, 'svg'),
          G = ((e = o.append.call(A, 'svg')), o.attr).call(e, 'mask', 'url(#mask-' + F + ')'),
          C = o.append.call(A, 'defs');
        y(C, F), h(C, F), v(C);
        var H = String(a).replace(/ /g, ' ').split(''),
          q = String(n).replace(/ /g, ' ').split(''),
          z = q.map(function (t, e) {
            var r = e + '-' + F;
            return { id: r, node: s(G, S, g, r), filter: p(C, r), from: u.indexOf(H[e]), value: u.indexOf(t), offset: { x: 0, y: E } };
          }),
          I = [];
        z.forEach(function (t, e) {
          var r = t.from * (S * g),
            a = (d * f + t.value) * (S * g),
            n = (0, c['default'])({
              from: r,
              to: a,
              delay: (z.length - 1 - e) * w + j,
              step: function (e) {
                var n;
                (t.offset.y = E + (e % (S * g * f))), ((n = t.node), o.attr).call(n, 'transform', 'translate(' + t.offset.x + ', ' + t.offset.y + ')');
                var l = (a - r) / 2,
                  i = Math.abs(Math.abs(e - r - l) - l) / 100;
                ((n = t.filter), o.attr).call(n, 'stdDeviation', '0 ' + i);
              },
              end:
                0 === e
                  ? function () {
                      return N();
                    }
                  : function (t) {
                      return t;
                    },
            });
          I.push(n);
        });
        var L = function (t) {
            (B = 0),
              z.forEach(function (t) {
                var e = t.node.getBBox(),
                  r = e.width;
                (t.offset.x = B), (B += r + _);
              }),
              z.forEach(function (t) {
                var e;
                ((e = t.node), o.attr).call(e, 'transform', 'translate(' + t.offset.x + ', ' + t.offset.y + ')');
              }),
              m(A, B, k),
              I.forEach(function (e) {
                return e.update(t);
              });
          },
          N = (0, l['default'])(L);
        return N;
      };
    },
    function (t, e, r) {
      'use strict';
      function a(t) {
        return t && t.__esModule ? t : { default: t };
      }
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e['default'] = function (t) {
          var e = document.createElementNS(l['default'].svg, t);
          return this.appendChild(e), e;
        });
      var n = r(6),
        l = a(n);
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e['default'] = function (t, e) {
          return this.setAttribute(t, e), this;
        });
    },
    function (t, e, r) {
      'use strict';
      function a(t) {
        return t && t.__esModule ? t : { default: t };
      }
      Object.defineProperty(e, '__esModule', { value: !0 });
      var n = r(7);
      Object.defineProperty(e, 'select', {
        enumerable: !0,
        get: function () {
          return a(n)['default'];
        },
      });
      var l = r(3);
      Object.defineProperty(e, 'append', {
        enumerable: !0,
        get: function () {
          return a(l)['default'];
        },
      });
      var o = r(4);
      Object.defineProperty(e, 'attr', {
        enumerable: !0,
        get: function () {
          return a(o)['default'];
        },
      });
      var i = r(8);
      Object.defineProperty(e, 'style', {
        enumerable: !0,
        get: function () {
          return a(i)['default'];
        },
      });
      var c = r(9);
      Object.defineProperty(e, 'text', {
        enumerable: !0,
        get: function () {
          return a(c)['default'];
        },
      });
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 }), (e['default'] = { svg: 'http://www.w3.org/2000/svg' });
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e['default'] = function (t) {
          return t === String(t) ? document.querySelector(t) : t;
        });
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e['default'] = function (t, e) {
          var r = arguments.length <= 2 || void 0 === arguments[2] ? '' : arguments[2];
          return this.style.setProperty(t, e, r), this;
        });
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 }),
        (e['default'] = function (t) {
          return (this.textContent = t), this;
        });
    },
    function (t, e) {
      'use strict';
      Object.defineProperty(e, '__esModule', { value: !0 });
      var r = function (t) {
        return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
      };
      e['default'] = function (t) {
        var e = t.from,
          a = t.to,
          n = t.duration,
          l = void 0 === n ? 3e3 : n,
          o = t.delay,
          i = void 0 === o ? 0 : o,
          c = t.easing,
          u = void 0 === c ? r : c,
          f = t.start,
          d =
            void 0 === f
              ? function (t) {
                  return t;
                }
              : f,
          s = t.step,
          p =
            void 0 === s
              ? function (t) {
                  return t;
                }
              : s,
          v = t.end,
          y =
            void 0 === v
              ? function (t) {
                  return t;
                }
              : v,
          h = e,
          m = 0,
          g = !1,
          b = function (t) {
            if (!g) {
              m || ((m = t), d(h));
              var r = Math.min(Math.max(t - m - i, 0), l) / l;
              (h = u(r) * (a - e) + e), p(h), 1 === r && ((g = !0), y(h));
            }
          };
        return { update: b };
      };
    },
  ]);
});
