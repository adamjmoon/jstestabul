/*!chai.js*/
(function () {
    function require(e, t, n) {
        var r = require.resolve(e);
        if (null == r) {
            n = n || e;
            t = t || "root";
            var i = new Error('Failed to require "' + n + '" from "' + t + '"');
            i.path = n;
            i.parent = t;
            i.require = true;
            throw i
        }
        var s = require.modules[r];
        if (!s.exports) {
            s.exports = {};
            s.client = s.component = true;
            s.call(this, s.exports, require.relative(r), s)
        }
        return s.exports
    }

    require.modules = {};
    require.aliases = {};
    require.resolve = function (e) {
        if (e.charAt(0) === "/")e = e.slice(1);
        var t = e + "/index.js";
        var n = [e, e + ".js", e + ".json", e + "/index.js", e + "/index.json"];
        for (var r = 0; r < n.length; r++) {
            var e = n[r];
            if (require.modules.hasOwnProperty(e))return e
        }
        if (require.aliases.hasOwnProperty(t)) {
            return require.aliases[t]
        }
    };
    require.normalize = function (e, t) {
        var n = [];
        if ("." != t.charAt(0))return t;
        e = e.split("/");
        t = t.split("/");
        for (var r = 0; r < t.length; ++r) {
            if (".." == t[r]) {
                e.pop()
            } else if ("." != t[r] && "" != t[r]) {
                n.push(t[r])
            }
        }
        return e.concat(n).join("/")
    };
    require.register = function (e, t) {
        require.modules[e] = t
    };
    require.alias = function (e, t) {
        if (!require.modules.hasOwnProperty(e)) {
            throw new Error('Failed to alias "' + e + '", it does not exist')
        }
        require.aliases[t] = e
    };
    require.relative = function (e) {
        function n(e, t) {
            var n = e.length;
            while (n--) {
                if (e[n] === t)return n
            }
            return-1
        }

        function r(t) {
            var n = r.resolve(t);
            return require(n, e, t)
        }

        var t = require.normalize(e, "..");
        r.resolve = function (r) {
            var i = r.charAt(0);
            if ("/" == i)return r.slice(1);
            if ("." == i)return require.normalize(t, r);
            var s = e.split("/");
            var o = n(s, "deps") + 1;
            if (!o)o = 0;
            r = s.slice(0, o + 1).join("/") + "/deps/" + r;
            return r
        };
        r.exists = function (e) {
            return require.modules.hasOwnProperty(r.resolve(e))
        };
        return r
    };
    require.register("chai/index.js", function (e, t, n) {
        n.exports = t("./lib/chai")
    });
    require.register("chai/lib/chai.js", function (e, t, n) {
        var r = [], e = n.exports = {};
        e.version = "1.6.0";
        e.Assertion = t("./chai/assertion");
        e.AssertionError = t("./chai/error");
        var i = t("./chai/utils");
        e.use = function (e) {
            if (!~r.indexOf(e)) {
                e(this, i);
                r.push(e)
            }
            return this
        };
        var s = t("./chai/core/assertions");
        e.use(s);
        var o = t("./chai/interface/expect");
        e.use(o);
        var u = t("./chai/interface/should");
        e.use(u);
        var a = t("./chai/interface/assert");
        e.use(a)
    });
    require.register("chai/lib/chai/assertion.js", function (e, t, n) {
        function o(e, t, n) {
            s(this, "ssfi", n || arguments.callee);
            s(this, "object", e);
            s(this, "message", t)
        }

        var r = t("./error"), i = t("./utils"), s = i.flag;
        n.exports = o;
        o.includeStack = false;
        o.showDiff = true;
        o.addProperty = function (e, t) {
            i.addProperty(this.prototype, e, t)
        };
        o.addMethod = function (e, t) {
            i.addMethod(this.prototype, e, t)
        };
        o.addChainableMethod = function (e, t, n) {
            i.addChainableMethod(this.prototype, e, t, n)
        };
        o.overwriteProperty = function (e, t) {
            i.overwriteProperty(this.prototype, e, t)
        };
        o.overwriteMethod = function (e, t) {
            i.overwriteMethod(this.prototype, e, t)
        };
        o.prototype.assert = function (e, t, n, u, a, f) {
            var l = i.test(this, arguments);
            if (true !== f)f = false;
            if (true !== o.showDiff)f = false;
            if (!l) {
                var t = i.getMessage(this, arguments), c = i.getActual(this, arguments);
                throw new r({message: t, actual: c, expected: u, stackStartFunction: o.includeStack ? this.assert : s(this, "ssfi"), showDiff: f})
            }
        };
        Object.defineProperty(o.prototype, "_obj", {get: function () {
            return s(this, "object")
        }, set: function (e) {
            s(this, "object", e)
        }})
    });
    require.register("chai/lib/chai/error.js", function (e, t, n) {
        function r(e) {
            e = e || {};
            this.message = e.message;
            this.actual = e.actual;
            this.expected = e.expected;
            this.operator = e.operator;
            this.showDiff = e.showDiff;
            if (e.stackStartFunction && Error.captureStackTrace) {
                var t = e.stackStartFunction;
                Error.captureStackTrace(this, t)
            }
        }

        n.exports = r;
        r.prototype = Object.create(Error.prototype);
        r.prototype.name = "AssertionError";
        r.prototype.constructor = r;
        r.prototype.toString = function () {
            return this.message
        }
    });
    require.register("chai/lib/chai/core/assertions.js", function (e, t, n) {
        n.exports = function (e, t) {
            function s(e, n) {
                if (n)i(this, "message", n);
                e = e.toLowerCase();
                var r = i(this, "object"), s = ~["a", "e", "i", "o", "u"].indexOf(e.charAt(0)) ? "an " : "a ";
                this.assert(e === t.type(r), "expected #{this} to be " + s + e, "expected #{this} not to be " + s + e)
            }

            function o() {
                i(this, "contains", true)
            }

            function u(e, n) {
                if (n)i(this, "message", n);
                var r = i(this, "object");
                this.assert(~r.indexOf(e), "expected #{this} to include " + t.inspect(e), "expected #{this} to not include " + t.inspect(e))
            }

            function a() {
                var e = i(this, "object"), t = Object.prototype.toString.call(e);
                this.assert("[object Arguments]" === t, "expected #{this} to be arguments but got " + t, "expected #{this} to not be arguments")
            }

            function f(e, t) {
                if (t)i(this, "message", t);
                var n = i(this, "object");
                if (i(this, "deep")) {
                    return this.eql(e)
                } else {
                    this.assert(e === n, "expected #{this} to equal #{exp}", "expected #{this} to not equal #{exp}", e, this._obj, true)
                }
            }

            function l(e, n) {
                if (n)i(this, "message", n);
                this.assert(t.eql(e, i(this, "object")), "expected #{this} to deeply equal #{exp}", "expected #{this} to not deeply equal #{exp}", e, this._obj, true)
            }

            function c(e, t) {
                if (t)i(this, "message", t);
                var r = i(this, "object");
                if (i(this, "doLength")) {
                    (new n(r, t)).to.have.property("length");
                    var s = r.length;
                    this.assert(s > e, "expected #{this} to have a length above #{exp} but got #{act}", "expected #{this} to not have a length above #{exp}", e, s)
                } else {
                    this.assert(r > e, "expected #{this} to be above " + e, "expected #{this} to be at most " + e)
                }
            }

            function h(e, t) {
                if (t)i(this, "message", t);
                var r = i(this, "object");
                if (i(this, "doLength")) {
                    (new n(r, t)).to.have.property("length");
                    var s = r.length;
                    this.assert(s >= e, "expected #{this} to have a length at least #{exp} but got #{act}", "expected #{this} to have a length below #{exp}", e, s)
                } else {
                    this.assert(r >= e, "expected #{this} to be at least " + e, "expected #{this} to be below " + e)
                }
            }

            function p(e, t) {
                if (t)i(this, "message", t);
                var r = i(this, "object");
                if (i(this, "doLength")) {
                    (new n(r, t)).to.have.property("length");
                    var s = r.length;
                    this.assert(s < e, "expected #{this} to have a length below #{exp} but got #{act}", "expected #{this} to not have a length below #{exp}", e, s)
                } else {
                    this.assert(r < e, "expected #{this} to be below " + e, "expected #{this} to be at least " + e)
                }
            }

            function d(e, t) {
                if (t)i(this, "message", t);
                var r = i(this, "object");
                if (i(this, "doLength")) {
                    (new n(r, t)).to.have.property("length");
                    var s = r.length;
                    this.assert(s <= e, "expected #{this} to have a length at most #{exp} but got #{act}", "expected #{this} to have a length above #{exp}", e, s)
                } else {
                    this.assert(r <= e, "expected #{this} to be at most " + e, "expected #{this} to be above " + e)
                }
            }

            function v(e, n) {
                if (n)i(this, "message", n);
                var r = t.getName(e);
                this.assert(i(this, "object")instanceof e, "expected #{this} to be an instance of " + r, "expected #{this} to not be an instance of " + r)
            }

            function m(e, n) {
                if (n)i(this, "message", n);
                var r = i(this, "object");
                this.assert(r.hasOwnProperty(e), "expected #{this} to have own property " + t.inspect(e), "expected #{this} to not have own property " + t.inspect(e))
            }

            function g() {
                i(this, "doLength", true)
            }

            function y(e, t) {
                if (t)i(this, "message", t);
                var r = i(this, "object");
                (new n(r, t)).to.have.property("length");
                var s = r.length;
                this.assert(s == e, "expected #{this} to have a length of #{exp} but got #{act}", "expected #{this} to not have a length of #{act}", e, s)
            }

            function b(e) {
                var n = i(this, "object"), r, s = true;
                e = e instanceof Array ? e : Array.prototype.slice.call(arguments);
                if (!e.length)throw new Error("keys required");
                var o = Object.keys(n), u = e.length;
                s = e.every(function (e) {
                    return~o.indexOf(e)
                });
                if (!i(this, "negate") && !i(this, "contains")) {
                    s = s && e.length == o.length
                }
                if (u > 1) {
                    e = e.map(function (e) {
                        return t.inspect(e)
                    });
                    var a = e.pop();
                    r = e.join(", ") + ", and " + a
                } else {
                    r = t.inspect(e[0])
                }
                r = (u > 1 ? "keys " : "key ") + r;
                r = (i(this, "contains") ? "contain " : "have ") + r;
                this.assert(s, "expected #{this} to " + r, "expected #{this} to not " + r)
            }

            function w(e, r, s) {
                if (s)i(this, "message", s);
                var o = i(this, "object");
                (new n(o, s)).is.a("function");
                var u = false, a = null, f = null, l = null;
                if (arguments.length === 0) {
                    r = null;
                    e = null
                } else if (e && (e instanceof RegExp || "string" === typeof e)) {
                    r = e;
                    e = null
                } else if (e && e instanceof Error) {
                    a = e;
                    e = null;
                    r = null
                } else if (typeof e === "function") {
                    f = (new e).name
                } else {
                    e = null
                }
                try {
                    o()
                } catch (c) {
                    if (a) {
                        this.assert(c === a, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp}", a, c);
                        return this
                    }
                    if (e) {
                        this.assert(c instanceof e, "expected #{this} to throw #{exp} but #{act} was thrown", "expected #{this} to not throw #{exp} but #{act} was thrown", f, c);
                        if (!r)return this
                    }
                    var h = "object" === t.type(c) && "message"in c ? c.message : "" + c;
                    if (h != null && r && r instanceof RegExp) {
                        this.assert(r.exec(h), "expected #{this} to throw error matching #{exp} but got #{act}", "expected #{this} to throw error not matching #{exp}", r, h);
                        return this
                    } else if (h != null && r && "string" === typeof r) {
                        this.assert(~h.indexOf(r), "expected #{this} to throw error including #{exp} but got #{act}", "expected #{this} to throw error not including #{act}", r, h);
                        return this
                    } else {
                        u = true;
                        l = c
                    }
                }
                var p = "", d = f !== null ? f : a ? "#{exp}" : "an error";
                if (u) {
                    p = " but #{act} was thrown"
                }
                this.assert(u === true, "expected #{this} to throw " + d + p, "expected #{this} to not throw " + d + p, a, l)
            }

            function E(e, t) {
                return e.every(function (e) {
                    return t.indexOf(e) !== -1
                })
            }

            var n = e.Assertion, r = Object.prototype.toString, i = t.flag;
            ["to", "be", "been", "is", "and", "have", "with", "that", "at", "of", "same"].forEach(function (e) {
                n.addProperty(e, function () {
                    return this
                })
            });
            n.addProperty("not", function () {
                i(this, "negate", true)
            });
            n.addProperty("deep", function () {
                i(this, "deep", true)
            });
            n.addChainableMethod("an", s);
            n.addChainableMethod("a", s);
            n.addChainableMethod("include", u, o);
            n.addChainableMethod("contain", u, o);
            n.addProperty("ok", function () {
                this.assert(i(this, "object"), "expected #{this} to be truthy", "expected #{this} to be falsy")
            });
            n.addProperty("true", function () {
                this.assert(true === i(this, "object"), "expected #{this} to be true", "expected #{this} to be false", this.negate ? false : true)
            });
            n.addProperty("false", function () {
                this.assert(false === i(this, "object"), "expected #{this} to be false", "expected #{this} to be true", this.negate ? true : false)
            });
            n.addProperty("null", function () {
                this.assert(null === i(this, "object"), "expected #{this} to be null", "expected #{this} not to be null")
            });
            n.addProperty("undefined", function () {
                this.assert(undefined === i(this, "object"), "expected #{this} to be undefined", "expected #{this} not to be undefined")
            });
            n.addProperty("exist", function () {
                this.assert(null != i(this, "object"), "expected #{this} to exist", "expected #{this} to not exist")
            });
            n.addProperty("empty", function () {
                var e = i(this, "object"), t = e;
                if (Array.isArray(e) || "string" === typeof object) {
                    t = e.length
                } else if (typeof e === "object") {
                    t = Object.keys(e).length
                }
                this.assert(!t, "expected #{this} to be empty", "expected #{this} not to be empty")
            });
            n.addProperty("arguments", a);
            n.addProperty("Arguments", a);
            n.addMethod("equal", f);
            n.addMethod("equals", f);
            n.addMethod("eq", f);
            n.addMethod("eql", l);
            n.addMethod("eqls", l);
            n.addMethod("above", c);
            n.addMethod("gt", c);
            n.addMethod("greaterThan", c);
            n.addMethod("least", h);
            n.addMethod("gte", h);
            n.addMethod("below", p);
            n.addMethod("lt", p);
            n.addMethod("lessThan", p);
            n.addMethod("most", d);
            n.addMethod("lte", d);
            n.addMethod("within", function (e, t, r) {
                if (r)i(this, "message", r);
                var s = i(this, "object"), o = e + ".." + t;
                if (i(this, "doLength")) {
                    (new n(s, r)).to.have.property("length");
                    var u = s.length;
                    this.assert(u >= e && u <= t, "expected #{this} to have a length within " + o, "expected #{this} to not have a length within " + o)
                } else {
                    this.assert(s >= e && s <= t, "expected #{this} to be within " + o, "expected #{this} to not be within " + o)
                }
            });
            n.addMethod("instanceof", v);
            n.addMethod("instanceOf", v);
            n.addMethod("property", function (e, n, r) {
                if (r)i(this, "message", r);
                var s = i(this, "deep") ? "deep property " : "property ", o = i(this, "negate"), u = i(this, "object"), a = i(this, "deep") ? t.getPathValue(e, u) : u[e];
                if (o && undefined !== n) {
                    if (undefined === a) {
                        r = r != null ? r + ": " : "";
                        throw new Error(r + t.inspect(u) + " has no " + s + t.inspect(e))
                    }
                } else {
                    this.assert(undefined !== a, "expected #{this} to have a " + s + t.inspect(e), "expected #{this} to not have " + s + t.inspect(e))
                }
                if (undefined !== n) {
                    this.assert(n === a, "expected #{this} to have a " + s + t.inspect(e) + " of #{exp}, but got #{act}", "expected #{this} to not have a " + s + t.inspect(e) + " of #{act}", n, a)
                }
                i(this, "object", a)
            });
            n.addMethod("ownProperty", m);
            n.addMethod("haveOwnProperty", m);
            n.addChainableMethod("length", y, g);
            n.addMethod("lengthOf", y, g);
            n.addMethod("match", function (e, t) {
                if (t)i(this, "message", t);
                var n = i(this, "object");
                this.assert(e.exec(n), "expected #{this} to match " + e, "expected #{this} not to match " + e)
            });
            n.addMethod("string", function (e, r) {
                if (r)i(this, "message", r);
                var s = i(this, "object");
                (new n(s, r)).is.a("string");
                this.assert(~s.indexOf(e), "expected #{this} to contain " + t.inspect(e), "expected #{this} to not contain " + t.inspect(e))
            });
            n.addMethod("keys", b);
            n.addMethod("key", b);
            n.addMethod("throw", w);
            n.addMethod("throws", w);
            n.addMethod("Throw", w);
            n.addMethod("respondTo", function (e, n) {
                if (n)i(this, "message", n);
                var r = i(this, "object"), s = i(this, "itself"), o = "function" === t.type(r) && !s ? r.prototype[e] : r[e];
                this.assert("function" === typeof o, "expected #{this} to respond to " + t.inspect(e), "expected #{this} to not respond to " + t.inspect(e))
            });
            n.addProperty("itself", function () {
                i(this, "itself", true)
            });
            n.addMethod("satisfy", function (e, n) {
                if (n)i(this, "message", n);
                var r = i(this, "object");
                this.assert(e(r), "expected #{this} to satisfy " + t.objDisplay(e), "expected #{this} to not satisfy" + t.objDisplay(e), this.negate ? false : true, e(r))
            });
            n.addMethod("closeTo", function (e, t, n) {
                if (n)i(this, "message", n);
                var r = i(this, "object");
                this.assert(Math.abs(r - e) <= t, "expected #{this} to be close to " + e + " +/- " + t, "expected #{this} not to be close to " + e + " +/- " + t)
            });
            n.addMethod("members", function (e, t) {
                if (t)i(this, "message", t);
                var r = i(this, "object");
                (new n(r)).to.be.an("array");
                (new n(e)).to.be.an("array");
                if (i(this, "contains")) {
                    return this.assert(E(e, r), "expected #{this} to be a superset of #{act}", "expected #{this} to not be a superset of #{act}", r, e)
                }
                this.assert(E(r, e) && E(e, r), "expected #{this} to have the same members as #{act}", "expected #{this} to not have the same members as #{act}", r, e)
            })
        }
    });
    require.register("chai/lib/chai/interface/assert.js", function (exports, require, module) {
        module.exports = function (chai, util) {
            var Assertion = chai.Assertion, flag = util.flag;
            var assert = chai.assert = function (e, t) {
                var n = new Assertion(null);
                n.assert(e, t, "[ negation message unavailable ]")
            };
            assert.fail = function (e, t, n, r) {
                throw new chai.AssertionError({actual: e, expected: t, message: n, operator: r, stackStartFunction: assert.fail})
            };
            assert.ok = function (e, t) {
                (new Assertion(e, t)).is.ok
            };
            assert.equal = function (e, t, n) {
                var r = new Assertion(e, n);
                r.assert(t == flag(r, "object"), "expected #{this} to equal #{exp}", "expected #{this} to not equal #{act}", t, e)
            };
            assert.notEqual = function (e, t, n) {
                var r = new Assertion(e, n);
                r.assert(t != flag(r, "object"), "expected #{this} to not equal #{exp}", "expected #{this} to equal #{act}", t, e)
            };
            assert.strictEqual = function (e, t, n) {
                (new Assertion(e, n)).to.equal(t)
            };
            assert.notStrictEqual = function (e, t, n) {
                (new Assertion(e, n)).to.not.equal(t)
            };
            assert.deepEqual = function (e, t, n) {
                (new Assertion(e, n)).to.eql(t)
            };
            assert.notDeepEqual = function (e, t, n) {
                (new Assertion(e, n)).to.not.eql(t)
            };
            assert.isTrue = function (e, t) {
                (new Assertion(e, t)).is["true"]
            };
            assert.isFalse = function (e, t) {
                (new Assertion(e, t)).is["false"]
            };
            assert.isNull = function (e, t) {
                (new Assertion(e, t)).to.equal(null)
            };
            assert.isNotNull = function (e, t) {
                (new Assertion(e, t)).to.not.equal(null)
            };
            assert.isUndefined = function (e, t) {
                (new Assertion(e, t)).to.equal(undefined)
            };
            assert.isDefined = function (e, t) {
                (new Assertion(e, t)).to.not.equal(undefined)
            };
            assert.isFunction = function (e, t) {
                (new Assertion(e, t)).to.be.a("function")
            };
            assert.isNotFunction = function (e, t) {
                (new Assertion(e, t)).to.not.be.a("function")
            };
            assert.isObject = function (e, t) {
                (new Assertion(e, t)).to.be.a("object")
            };
            assert.isNotObject = function (e, t) {
                (new Assertion(e, t)).to.not.be.a("object")
            };
            assert.isArray = function (e, t) {
                (new Assertion(e, t)).to.be.an("array")
            };
            assert.isNotArray = function (e, t) {
                (new Assertion(e, t)).to.not.be.an("array")
            };
            assert.isString = function (e, t) {
                (new Assertion(e, t)).to.be.a("string")
            };
            assert.isNotString = function (e, t) {
                (new Assertion(e, t)).to.not.be.a("string")
            };
            assert.isNumber = function (e, t) {
                (new Assertion(e, t)).to.be.a("number")
            };
            assert.isNotNumber = function (e, t) {
                (new Assertion(e, t)).to.not.be.a("number")
            };
            assert.isBoolean = function (e, t) {
                (new Assertion(e, t)).to.be.a("boolean")
            };
            assert.isNotBoolean = function (e, t) {
                (new Assertion(e, t)).to.not.be.a("boolean")
            };
            assert.typeOf = function (e, t, n) {
                (new Assertion(e, n)).to.be.a(t)
            };
            assert.notTypeOf = function (e, t, n) {
                (new Assertion(e, n)).to.not.be.a(t)
            };
            assert.instanceOf = function (e, t, n) {
                (new Assertion(e, n)).to.be.instanceOf(t)
            };
            assert.notInstanceOf = function (e, t, n) {
                (new Assertion(e, n)).to.not.be.instanceOf(t)
            };
            assert.include = function (e, t, n) {
                var r = new Assertion(e, n);
                if (Array.isArray(e)) {
                    r.to.include(t)
                } else if ("string" === typeof e) {
                    r.to.contain.string(t)
                } else {
                    throw new chai.AssertionError({message: "expected an array or string", stackStartFunction: assert.include})
                }
            };
            assert.notInclude = function (e, t, n) {
                var r = new Assertion(e, n);
                if (Array.isArray(e)) {
                    r.to.not.include(t)
                } else if ("string" === typeof e) {
                    r.to.not.contain.string(t)
                } else {
                    throw new chai.AssertionError({message: "expected an array or string", stackStartFunction: assert.include})
                }
            };
            assert.match = function (e, t, n) {
                (new Assertion(e, n)).to.match(t)
            };
            assert.notMatch = function (e, t, n) {
                (new Assertion(e, n)).to.not.match(t)
            };
            assert.property = function (e, t, n) {
                (new Assertion(e, n)).to.have.property(t)
            };
            assert.notProperty = function (e, t, n) {
                (new Assertion(e, n)).to.not.have.property(t)
            };
            assert.deepProperty = function (e, t, n) {
                (new Assertion(e, n)).to.have.deep.property(t)
            };
            assert.notDeepProperty = function (e, t, n) {
                (new Assertion(e, n)).to.not.have.deep.property(t)
            };
            assert.propertyVal = function (e, t, n, r) {
                (new Assertion(e, r)).to.have.property(t, n)
            };
            assert.propertyNotVal = function (e, t, n, r) {
                (new Assertion(e, r)).to.not.have.property(t, n)
            };
            assert.deepPropertyVal = function (e, t, n, r) {
                (new Assertion(e, r)).to.have.deep.property(t, n)
            };
            assert.deepPropertyNotVal = function (e, t, n, r) {
                (new Assertion(e, r)).to.not.have.deep.property(t, n)
            };
            assert.lengthOf = function (e, t, n) {
                (new Assertion(e, n)).to.have.length(t)
            };
            assert.Throw = function (e, t, n, r) {
                if ("string" === typeof t || t instanceof RegExp) {
                    n = t;
                    t = null
                }
                (new Assertion(e, r)).to.Throw(t, n)
            };
            assert.doesNotThrow = function (e, t, n) {
                if ("string" === typeof t) {
                    n = t;
                    t = null
                }
                (new Assertion(e, n)).to.not.Throw(t)
            };
            assert.operator = function (val, operator, val2, msg) {
                if (!~["==", "===", ">", ">=", "<", "<=", "!=", "!=="].indexOf(operator)) {
                    throw new Error('Invalid operator "' + operator + '"')
                }
                var test = new Assertion(eval(val + operator + val2), msg);
                test.assert(true === flag(test, "object"), "expected " + util.inspect(val) + " to be " + operator + " " + util.inspect(val2), "expected " + util.inspect(val) + " to not be " + operator + " " + util.inspect(val2))
            };
            assert.closeTo = function (e, t, n, r) {
                (new Assertion(e, r)).to.be.closeTo(t, n)
            };
            assert.sameMembers = function (e, t, n) {
                (new Assertion(e, n)).to.have.same.members(t)
            };
            assert.includeMembers = function (e, t, n) {
                (new Assertion(e, n)).to.include.members(t)
            };
            assert.ifError = function (e, t) {
                (new Assertion(e, t)).to.not.be.ok
            };
            (function alias(e, t) {
                assert[t] = assert[e];
                return alias
            })("Throw", "throw")("Throw", "throws")
        }
    });
    require.register("chai/lib/chai/interface/expect.js", function (e, t, n) {
        n.exports = function (e, t) {
            e.expect = function (t, n) {
                return new e.Assertion(t, n)
            }
        }
    });
    require.register("chai/lib/chai/interface/should.js", function (e, t, n) {
        n.exports = function (e, t) {
            function r() {
                Object.defineProperty(Object.prototype, "should", {set: function (e) {
                    Object.defineProperty(this, "should", {value: e, enumerable: true, configurable: true, writable: true})
                }, get: function () {
                    if (this instanceof String || this instanceof Number) {
                        return new n(this.constructor(this))
                    } else if (this instanceof Boolean) {
                        return new n(this == true)
                    }
                    return new n(this)
                }, configurable: true});
                var e = {};
                e.equal = function (e, t, r) {
                    (new n(e, r)).to.equal(t)
                };
                e.Throw = function (e, t, r, i) {
                    (new n(e, i)).to.Throw(t, r)
                };
                e.exist = function (e, t) {
                    (new n(e, t)).to.exist
                };
                e.not = {};
                e.not.equal = function (e, t, r) {
                    (new n(e, r)).to.not.equal(t)
                };
                e.not.Throw = function (e, t, r, i) {
                    (new n(e, i)).to.not.Throw(t, r)
                };
                e.not.exist = function (e, t) {
                    (new n(e, t)).to.not.exist
                };
                e["throw"] = e["Throw"];
                e.not["throw"] = e.not["Throw"];
                return e
            }

            var n = e.Assertion;
            e.should = r;
            e.Should = r
        }
    });
    require.register("chai/lib/chai/utils/addChainableMethod.js", function (e, t, n) {
        var r = t("./transferFlags");
        var i = "__proto__"in Object;
        var s = /^(?:length|name|arguments|caller)$/;
        var o = Function.prototype.call, u = Function.prototype.apply;
        n.exports = function (e, t, n, a) {
            if (typeof a !== "function")a = function () {
            };
            Object.defineProperty(e, t, {get: function () {
                a.call(this);
                var t = function () {
                    var e = n.apply(this, arguments);
                    return e === undefined ? this : e
                };
                if (i) {
                    var f = t.__proto__ = Object.create(this);
                    f.call = o;
                    f.apply = u
                } else {
                    var l = Object.getOwnPropertyNames(e);
                    l.forEach(function (n) {
                        if (!s.test(n)) {
                            var r = Object.getOwnPropertyDescriptor(e, n);
                            Object.defineProperty(t, n, r)
                        }
                    })
                }
                r(this, t);
                return t
            }, configurable: true})
        }
    });
    require.register("chai/lib/chai/utils/addMethod.js", function (e, t, n) {
        n.exports = function (e, t, n) {
            e[t] = function () {
                var e = n.apply(this, arguments);
                return e === undefined ? this : e
            }
        }
    });
    require.register("chai/lib/chai/utils/addProperty.js", function (e, t, n) {
        n.exports = function (e, t, n) {
            Object.defineProperty(e, t, {get: function () {
                var e = n.call(this);
                return e === undefined ? this : e
            }, configurable: true})
        }
    });
    require.register("chai/lib/chai/utils/eql.js", function (e, t, n) {
        function o(e, t, n) {
            if (e === t) {
                return true
            } else if (i.isBuffer(e) && i.isBuffer(t)) {
                if (e.length != t.length)return false;
                for (var r = 0; r < e.length; r++) {
                    if (e[r] !== t[r])return false
                }
                return true
            } else if (e instanceof Date && t instanceof Date) {
                return e.getTime() === t.getTime()
            } else if (typeof e != "object" && typeof t != "object") {
                return e === t
            } else {
                return f(e, t, n)
            }
        }

        function u(e) {
            return e === null || e === undefined
        }

        function a(e) {
            return Object.prototype.toString.call(e) == "[object Arguments]"
        }

        function f(e, t, n) {
            if (u(e) || u(t))return false;
            if (e.prototype !== t.prototype)return false;
            var i;
            if (n) {
                for (i = 0; i < n.length; i++) {
                    if (n[i][0] === e && n[i][1] === t || n[i][0] === t && n[i][1] === e)return true
                }
            } else {
                n = []
            }
            if (a(e)) {
                if (!a(t)) {
                    return false
                }
                e = pSlice.call(e);
                t = pSlice.call(t);
                return o(e, t, n)
            }
            try {
                var s = r(e), f = r(t), l
            } catch (c) {
                return false
            }
            if (s.length != f.length)return false;
            s.sort();
            f.sort();
            for (i = s.length - 1; i >= 0; i--) {
                if (s[i] != f[i])return false
            }
            n.push([e, t]);
            for (i = s.length - 1; i >= 0; i--) {
                l = s[i];
                if (!o(e[l], t[l], n))return false
            }
            return true
        }

        n.exports = o;
        var r = t("./getEnumerableProperties");
        var i;
        try {
            i = t("buffer").Buffer
        } catch (s) {
            i = {isBuffer: function () {
                return false
            }}
        }
    });
    require.register("chai/lib/chai/utils/flag.js", function (e, t, n) {
        n.exports = function (e, t, n) {
            var r = e.__flags || (e.__flags = Object.create(null));
            if (arguments.length === 3) {
                r[t] = n
            } else {
                return r[t]
            }
        }
    });
    require.register("chai/lib/chai/utils/getActual.js", function (e, t, n) {
        n.exports = function (e, t) {
            var n = t[4];
            return"undefined" !== typeof n ? n : e._obj
        }
    });
    require.register("chai/lib/chai/utils/getEnumerableProperties.js", function (e, t, n) {
        n.exports = function (t) {
            var n = [];
            for (var r in t) {
                n.push(r)
            }
            return n
        }
    });
    require.register("chai/lib/chai/utils/getMessage.js", function (e, t, n) {
        var r = t("./flag"), i = t("./getActual"), s = t("./inspect"), o = t("./objDisplay");
        n.exports = function (e, t) {
            var n = r(e, "negate"), s = r(e, "object"), u = t[3], a = i(e, t), f = n ? t[2] : t[1], l = r(e, "message");
            f = f || "";
            f = f.replace(/#{this}/g, o(s)).replace(/#{act}/g, o(a)).replace(/#{exp}/g, o(u));
            return l ? l + ": " + f : f
        }
    });
    require.register("chai/lib/chai/utils/getName.js", function (e, t, n) {
        n.exports = function (e) {
            if (e.name)return e.name;
            var t = /^\s?function ([^(]*)\(/.exec(e);
            return t && t[1] ? t[1] : ""
        }
    });
    require.register("chai/lib/chai/utils/getPathValue.js", function (e, t, n) {
        function i(e) {
            var t = e.replace(/\[/g, ".["), n = t.match(/(\\\.|[^.]+?)+/g);
            return n.map(function (e) {
                var t = /\[(\d+)\]$/, n = t.exec(e);
                if (n)return{i: parseFloat(n[1])}; else return{p: e}
            })
        }

        function s(e, t) {
            var n = t, r;
            for (var i = 0, s = e.length; i < s; i++) {
                var o = e[i];
                if (n) {
                    if ("undefined" !== typeof o.p)n = n[o.p]; else if ("undefined" !== typeof o.i)n = n[o.i];
                    if (i == s - 1)r = n
                } else {
                    r = undefined
                }
            }
            return r
        }

        var r = n.exports = function (e, t) {
            var n = i(e);
            return s(n, t)
        };
    });
    require.register("chai/lib/chai/utils/getProperties.js", function (e, t, n) {
        n.exports = function (t) {
            function r(e) {
                if (n.indexOf(e) === -1) {
                    n.push(e)
                }
            }

            var n = Object.getOwnPropertyNames(subject);
            var i = Object.getPrototypeOf(subject);
            while (i !== null) {
                Object.getOwnPropertyNames(i).forEach(r);
                i = Object.getPrototypeOf(i)
            }
            return n
        }
    });
    require.register("chai/lib/chai/utils/index.js", function (e, t, n) {
        var e = n.exports = {};
        e.test = t("./test");
        e.type = t("./type");
        e.getMessage = t("./getMessage");
        e.getActual = t("./getActual");
        e.inspect = t("./inspect");
        e.objDisplay = t("./objDisplay");
        e.flag = t("./flag");
        e.transferFlags = t("./transferFlags");
        e.eql = t("./eql");
        e.getPathValue = t("./getPathValue");
        e.getName = t("./getName");
        e.addProperty = t("./addProperty");
        e.addMethod = t("./addMethod");
        e.overwriteProperty = t("./overwriteProperty");
        e.overwriteMethod = t("./overwriteMethod");
        e.addChainableMethod = t("./addChainableMethod")
    });
    require.register("chai/lib/chai/utils/inspect.js", function (e, t, n) {
        function o(e, t, n, r) {
            var i = {showHidden: t, seen: [], stylize: function (e) {
                return e
            }};
            return f(i, e, typeof n === "undefined" ? 2 : n)
        }

        function f(t, n, o) {
            if (n && typeof n.inspect === "function" && n.inspect !== e.inspect && !(n.constructor && n.constructor.prototype === n)) {
                return n.inspect(o)
            }
            var f = l(t, n);
            if (f) {
                return f
            }
            if (a(n)) {
                return u(n)
            }
            var b = s(n);
            var w = t.showHidden ? i(n) : b;
            if (w.length === 0 || y(n) && (w.length === 1 && w[0] === "stack" || w.length === 2 && w[0] === "description" && w[1] === "stack")) {
                if (typeof n === "function") {
                    var E = r(n);
                    var S = E ? ": " + E : "";
                    return t.stylize("[Function" + S + "]", "special")
                }
                if (m(n)) {
                    return t.stylize(RegExp.prototype.toString.call(n), "regexp")
                }
                if (g(n)) {
                    return t.stylize(Date.prototype.toUTCString.call(n), "date")
                }
                if (y(n)) {
                    return c(n)
                }
            }
            var x = "", T = false, N = ["{", "}"];
            if (v(n)) {
                T = true;
                N = ["[", "]"]
            }
            if (typeof n === "function") {
                var E = r(n);
                var S = E ? ": " + E : "";
                x = " [Function" + S + "]"
            }
            if (m(n)) {
                x = " " + RegExp.prototype.toString.call(n)
            }
            if (g(n)) {
                x = " " + Date.prototype.toUTCString.call(n)
            }
            if (y(n)) {
                return c(n)
            }
            if (w.length === 0 && (!T || n.length == 0)) {
                return N[0] + x + N[1]
            }
            if (o < 0) {
                if (m(n)) {
                    return t.stylize(RegExp.prototype.toString.call(n), "regexp")
                } else {
                    return t.stylize("[Object]", "special")
                }
            }
            t.seen.push(n);
            var C;
            if (T) {
                C = h(t, n, o, b, w)
            } else {
                C = w.map(function (e) {
                    return p(t, n, o, b, e, T)
                })
            }
            t.seen.pop();
            return d(C, x, N)
        }

        function l(e, t) {
            switch (typeof t) {
                case"undefined":
                    return e.stylize("undefined", "undefined");
                case"string":
                    var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                    return e.stylize(n, "string");
                case"number":
                    return e.stylize("" + t, "number");
                case"boolean":
                    return e.stylize("" + t, "boolean")
            }
            if (t === null) {
                return e.stylize("null", "null")
            }
        }

        function c(e) {
            return"[" + Error.prototype.toString.call(e) + "]"
        }

        function h(e, t, n, r, i) {
            var s = [];
            for (var o = 0, u = t.length; o < u; ++o) {
                if (Object.prototype.hasOwnProperty.call(t, String(o))) {
                    s.push(p(e, t, n, r, String(o), true))
                } else {
                    s.push("")
                }
            }
            i.forEach(function (i) {
                if (!i.match(/^\d+$/)) {
                    s.push(p(e, t, n, r, i, true))
                }
            });
            return s
        }

        function p(e, t, n, r, i, s) {
            var o, u;
            if (t.__lookupGetter__) {
                if (t.__lookupGetter__(i)) {
                    if (t.__lookupSetter__(i)) {
                        u = e.stylize("[Getter/Setter]", "special")
                    } else {
                        u = e.stylize("[Getter]", "special")
                    }
                } else {
                    if (t.__lookupSetter__(i)) {
                        u = e.stylize("[Setter]", "special")
                    }
                }
            }
            if (r.indexOf(i) < 0) {
                o = "[" + i + "]"
            }
            if (!u) {
                if (e.seen.indexOf(t[i]) < 0) {
                    if (n === null) {
                        u = f(e, t[i], null)
                    } else {
                        u = f(e, t[i], n - 1)
                    }
                    if (u.indexOf("\n") > -1) {
                        if (s) {
                            u = u.split("\n").map(function (e) {
                                return"  " + e
                            }).join("\n").substr(2)
                        } else {
                            u = "\n" + u.split("\n").map(function (e) {
                                return"   " + e
                            }).join("\n")
                        }
                    }
                } else {
                    u = e.stylize("[Circular]", "special")
                }
            }
            if (typeof o === "undefined") {
                if (s && i.match(/^\d+$/)) {
                    return u
                }
                o = JSON.stringify("" + i);
                if (o.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                    o = o.substr(1, o.length - 2);
                    o = e.stylize(o, "name")
                } else {
                    o = o.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                    o = e.stylize(o, "string")
                }
            }
            return o + ": " + u
        }

        function d(e, t, n) {
            var r = 0;
            var i = e.reduce(function (e, t) {
                r++;
                if (t.indexOf("\n") >= 0)r++;
                return e + t.length + 1
            }, 0);
            if (i > 60) {
                return n[0] + (t === "" ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1]
            }
            return n[0] + t + " " + e.join(", ") + " " + n[1]
        }

        function v(e) {
            return Array.isArray(e) || typeof e === "object" && b(e) === "[object Array]"
        }

        function m(e) {
            return typeof e === "object" && b(e) === "[object RegExp]"
        }

        function g(e) {
            return typeof e === "object" && b(e) === "[object Date]"
        }

        function y(e) {
            return typeof e === "object" && b(e) === "[object Error]"
        }

        function b(e) {
            return Object.prototype.toString.call(e)
        }

        var r = t("./getName");
        var i = t("./getProperties");
        var s = t("./getEnumerableProperties");
        n.exports = o;
        var u = function (e) {
            if ("outerHTML"in e)return e.outerHTML;
            var t = "http://www.w3.org/1999/xhtml";
            var n = document.createElementNS(t, "_");
            var r = (window.HTMLElement || window.Element).prototype;
            var i = new XMLSerializer;
            var s;
            if (document.xmlVersion) {
                return i.serializeToString(e)
            } else {
                n.appendChild(e.cloneNode(false));
                s = n.innerHTML.replace("><", ">" + e.innerHTML + "<");
                n.innerHTML = "";
                return s
            }
        };
        var a = function (e) {
            if (typeof HTMLElement === "object") {
                return e instanceof HTMLElement
            } else {
                return e && typeof e === "object" && e.nodeType === 1 && typeof e.nodeName === "string"
            }
        }
    });
    require.register("chai/lib/chai/utils/objDisplay.js", function (e, t, n) {
        var r = t("./inspect");
        n.exports = function (e) {
            var t = r(e), n = Object.prototype.toString.call(e);
            if (t.length >= 40) {
                if (n === "[object Function]") {
                    return!e.name || e.name === "" ? "[Function]" : "[Function: " + e.name + "]"
                } else if (n === "[object Array]") {
                    return"[ Array(" + e.length + ") ]"
                } else if (n === "[object Object]") {
                    var i = Object.keys(e), s = i.length > 2 ? i.splice(0, 2).join(", ") + ", ..." : i.join(", ");
                    return"{ Object (" + s + ") }"
                } else {
                    return t
                }
            } else {
                return t
            }
        }
    });
    require.register("chai/lib/chai/utils/overwriteMethod.js", function (e, t, n) {
        n.exports = function (e, t, n) {
            var r = e[t], i = function () {
                return this
            };
            if (r && "function" === typeof r)i = r;
            e[t] = function () {
                var e = n(i).apply(this, arguments);
                return e === undefined ? this : e
            }
        }
    });
    require.register("chai/lib/chai/utils/overwriteProperty.js", function (e, t, n) {
        n.exports = function (e, t, n) {
            var r = Object.getOwnPropertyDescriptor(e, t), i = function () {
            };
            if (r && "function" === typeof r.get)i = r.get;
            Object.defineProperty(e, t, {get: function () {
                var e = n(i).call(this);
                return e === undefined ? this : e
            }, configurable: true})
        }
    });
    require.register("chai/lib/chai/utils/test.js", function (e, t, n) {
        var r = t("./flag");
        n.exports = function (e, t) {
            var n = r(e, "negate"), i = t[0];
            return n ? !i : i
        }
    });
    require.register("chai/lib/chai/utils/transferFlags.js", function (e, t, n) {
        n.exports = function (e, t, n) {
            var r = e.__flags || (e.__flags = Object.create(null));
            if (!t.__flags) {
                t.__flags = Object.create(null)
            }
            n = arguments.length === 3 ? n : true;
            for (var i in r) {
                if (n || i !== "object" && i !== "ssfi" && i != "message") {
                    t.__flags[i] = r[i]
                }
            }
        }
    });
    require.register("chai/lib/chai/utils/type.js", function (e, t, n) {
        var r = {"[object Arguments]": "arguments", "[object Array]": "array", "[object Date]": "date", "[object Function]": "function", "[object Number]": "number", "[object RegExp]": "regexp", "[object String]": "string"};
        n.exports = function (e) {
            var t = Object.prototype.toString.call(e);
            if (r[t])return r[t];
            if (e === null)return"null";
            if (e === undefined)return"undefined";
            if (e === Object(e))return"object";
            return typeof e
        }
    });
    require.alias("chai/index.js", "chai/index.js");
    if (typeof module != 'undefined' && typeof exports == "object") {
        module.exports = require("chai")
    } else if (typeof define == "function" && define.amd) {
        define(function () {
            return require("chai")
        })
    } else {
        this["chai"] = require("chai")
    }
})();
