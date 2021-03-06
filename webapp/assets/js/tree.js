/*! jsTree - v3.0.0-beta8 - 2014-02-20 - (MIT) */
/*http://www.jstree.com/ */
(function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
})(function (e, t) {
    "use strict";
    if (!e.jstree) {
        var r = 0, i = !1, n = !1, s = !1, a = [], o = e("script:last").attr("src"), d = document, l = d.createElement("LI"), c, h;
        l.setAttribute("role", "treeitem"), c = d.createElement("I"), c.className = "jstree-icon jstree-ocl", l.appendChild(c), c = d.createElement("A"), c.className = "jstree-anchor", c.setAttribute("href", "#"), h = d.createElement("I"), h.className = "jstree-icon jstree-themeicon", c.appendChild(h), l.appendChild(c), c = h = null, e.jstree = {
            version: "3.0.0-beta8",
            defaults: {plugins: []},
            plugins: {},
            path: o && -1 !== o.indexOf("/") ? o.replace(/\/[^\/]+$/, "") : ""
        }, e.jstree.create = function (t, i) {
            var n = new e.jstree.core(++r), s = i;
            return i = e.extend(!0, {}, e.jstree.defaults, i), s && s.plugins && (i.plugins = s.plugins), e.each(i.plugins, function (e, t) {
                "core" !== e && (n = n.plugin(t, i[t]))
            }), n.init(t, i), n
        }, e.jstree.core = function (e) {
            this._id = e, this._cnt = 0, this._data = {
                core: {
                    themes: {name: !1, dots: !1, icons: !1},
                    selected: [],
                    last_error: {}
                }
            }
        }, e.jstree.reference = function (r) {
            if (r && !e(r).length) {
                r.id && (r = r.id);
                var i = null;
                return e(".jstree").each(function () {
                    var n = e(this).data("jstree");
                    return n && n._model.data[r] ? (i = n, !1) : t
                }), i
            }
            return e(r).closest(".jstree").data("jstree")
        }, e.fn.jstree = function (r) {
            var i = "string" == typeof r, n = Array.prototype.slice.call(arguments, 1), s = null;
            return this.each(function () {
                var a = e.jstree.reference(this), o = i && a ? a[r] : null;
                return s = i && o ? o.apply(a, n) : null, a || i || r !== t && !e.isPlainObject(r) || e(this).data("jstree", new e.jstree.create(this, r)), a && !i && (s = a), null !== s && s !== t ? !1 : t
            }), null !== s && s !== t ? s : this
        }, e.expr[":"].jstree = e.expr.createPseudo(function (r) {
            return function (r) {
                return e(r).hasClass("jstree") && e(r).data("jstree") !== t
            }
        }), e.jstree.defaults.core = {
            data: !1,
            strings: !1,
            check_callback: !1,
            error: e.noop,
            animation: 200,
            multiple: !0,
            themes: {name: !1, url: !1, dir: !1, dots: !0, icons: !0, stripes: !1, variant: !1, responsive: !0},
            expand_selected_onload: !0
        }, e.jstree.core.prototype = {
            plugin: function (t, r) {
                var i = e.jstree.plugins[t];
                return i ? (this._data[t] = {}, i.prototype = this, new i(r, this)) : this
            }, init: function (t, r) {
                this._model = {
                    data: {
                        "#": {
                            id: "#",
                            parent: null,
                            parents: [],
                            children: [],
                            children_d: [],
                            state: {loaded: !1}
                        }
                    },
                    changed: [],
                    force_full_redraw: !1,
                    redraw_timeout: !1,
                    default_state: {loaded: !0, opened: !1, selected: !1, disabled: !1}
                }, this.element = e(t).addClass("jstree jstree-" + this._id), this.settings = r, this.element.bind("destroyed", e.proxy(this.teardown, this)), this._data.core.ready = !1, this._data.core.loaded = !1, this._data.core.rtl = "rtl" === this.element.css("direction"), this.element[this._data.core.rtl ? "addClass" : "removeClass"]("jstree-rtl"), this.element.attr("role", "tree"), this.bind(), this.trigger("init"), this._data.core.original_container_html = this.element.find(" > ul > li").clone(!0), this._data.core.original_container_html.find("li").addBack().contents().filter(function () {
                    return 3 === this.nodeType && (!this.nodeValue || /^\s+$/.test(this.nodeValue))
                }).remove(), this.element.html("<ul class='jstree-container-ul'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this._data.core.li_height = this.get_container_ul().children("li:eq(0)").height() || 18, this.trigger("loading"), this.load_node("#")
            }, destroy: function () {
                this.element.unbind("destroyed", this.teardown), this.teardown()
            }, teardown: function () {
                this.unbind(), this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class", function () {
                    return this.className.replace(/jstree[^ ]*|$/gi, "")
                }), this.element = null
            }, bind: function () {
                this.element.on("dblclick.jstree", function () {
                    if (document.selection && document.selection.empty)document.selection.empty(); else if (window.getSelection) {
                        var e = window.getSelection();
                        try {
                            e.removeAllRanges(), e.collapse()
                        } catch (t) {
                        }
                    }
                }).on("click.jstree", ".jstree-ocl", e.proxy(function (e) {
                    this.toggle_node(e.target)
                }, this)).on("click.jstree", ".jstree-anchor", e.proxy(function (t) {
                    t.preventDefault(), e(t.currentTarget).focus(), this.activate_node(t.currentTarget, t)
                }, this)).on("keydown.jstree", ".jstree-anchor", e.proxy(function (t) {
                    var r = null;
                    switch (t.which) {
                        case 13:
                        case 32:
                            t.type = "click", e(t.currentTarget).trigger(t);
                            break;
                        case 37:
                            t.preventDefault(), this.is_open(t.currentTarget) ? this.close_node(t.currentTarget) : (r = this.get_prev_dom(t.currentTarget), r && r.length && r.children(".jstree-anchor").focus());
                            break;
                        case 38:
                            t.preventDefault(), r = this.get_prev_dom(t.currentTarget), r && r.length && r.children(".jstree-anchor").focus();
                            break;
                        case 39:
                            t.preventDefault(), this.is_closed(t.currentTarget) ? this.open_node(t.currentTarget, function (e) {
                                this.get_node(e, !0).children(".jstree-anchor").focus()
                            }) : (r = this.get_next_dom(t.currentTarget), r && r.length && r.children(".jstree-anchor").focus());
                            break;
                        case 40:
                            t.preventDefault(), r = this.get_next_dom(t.currentTarget), r && r.length && r.children(".jstree-anchor").focus();
                            break;
                        case 46:
                            t.preventDefault(), r = this.get_node(t.currentTarget), r && r.id && "#" !== r.id && (r = this.is_selected(r) ? this.get_selected() : r);
                            break;
                        case 113:
                            t.preventDefault(), r = this.get_node(t.currentTarget);
                            break;
                        default:
                    }
                }, this)).on("load_node.jstree", e.proxy(function (t, r) {
                    if (r.status && ("#" !== r.node.id || this._data.core.loaded || (this._data.core.loaded = !0, this.trigger("loaded")), !this._data.core.ready && !this.get_container_ul().find(".jstree-loading:eq(0)").length)) {
                        if (this._data.core.ready = !0, this._data.core.selected.length) {
                            if (this.settings.core.expand_selected_onload) {
                                var i = [], n, s;
                                for (n = 0, s = this._data.core.selected.length; s > n; n++)i = i.concat(this._model.data[this._data.core.selected[n]].parents);
                                for (i = e.vakata.array_unique(i), n = 0, s = i.length; s > n; n++)this.open_node(i[n], !1, 0)
                            }
                            this.trigger("changed", {action: "ready", selected: this._data.core.selected})
                        }
                        setTimeout(e.proxy(function () {
                            this.trigger("ready")
                        }, this), 0)
                    }
                }, this)).on("init.jstree", e.proxy(function () {
                    var e = this.settings.core.themes;
                    this._data.core.themes.dots = e.dots, this._data.core.themes.stripes = e.stripes, this._data.core.themes.icons = e.icons, this.set_theme(e.name || "default", e.url), this.set_theme_variant(e.variant)
                }, this)).on("loading.jstree", e.proxy(function () {
                    this[this._data.core.themes.dots ? "show_dots" : "hide_dots"](), this[this._data.core.themes.icons ? "show_icons" : "hide_icons"](), this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"]()
                }, this)).on("focus.jstree", ".jstree-anchor", e.proxy(function (t) {
                    this.element.find(".jstree-hovered").not(t.currentTarget).mouseleave(), e(t.currentTarget).mouseenter()
                }, this)).on("mouseenter.jstree", ".jstree-anchor", e.proxy(function (e) {
                    this.hover_node(e.currentTarget)
                }, this)).on("mouseleave.jstree", ".jstree-anchor", e.proxy(function (e) {
                    this.dehover_node(e.currentTarget)
                }, this))
            }, unbind: function () {
                this.element.off(".jstree"), e(document).off(".jstree-" + this._id)
            }, trigger: function (e, t) {
                t || (t = {}), t.instance = this, this.element.triggerHandler(e.replace(".jstree", "") + ".jstree", t)
            }, get_container: function () {
                return this.element
            }, get_container_ul: function () {
                return this.element.children("ul:eq(0)")
            }, get_string: function (t) {
                var r = this.settings.core.strings;
                return e.isFunction(r) ? r.call(this, t) : r && r[t] ? r[t] : t
            }, _firstChild: function (e) {
                e = e ? e.firstChild : null;
                while (null !== e && 1 !== e.nodeType)e = e.nextSibling;
                return e
            }, _nextSibling: function (e) {
                e = e ? e.nextSibling : null;
                while (null !== e && 1 !== e.nodeType)e = e.nextSibling;
                return e
            }, _previousSibling: function (e) {
                e = e ? e.previousSibling : null;
                while (null !== e && 1 !== e.nodeType)e = e.previousSibling;
                return e
            }, get_node: function (t, r) {
                t && t.id && (t = t.id);
                var i;
                try {
                    if (this._model.data[t])t = this._model.data[t]; else if (((i = e(t, this.element)).length || (i = e("#" + t, this.element)).length) && this._model.data[i.closest("li").attr("id")])t = this._model.data[i.closest("li").attr("id")]; else {
                        if (!(i = e(t, this.element)).length || !i.hasClass("jstree"))return !1;
                        t = this._model.data["#"]
                    }
                    return r && (t = "#" === t.id ? this.element : e(document.getElementById(t.id))), t
                } catch (n) {
                    return !1
                }
            }, get_path: function (e, t, r) {
                if (e = e.parents ? e : this.get_node(e), !e || "#" === e.id || !e.parents)return !1;
                var i, n, s = [];
                for (s.push(r ? e.id : e.text), i = 0, n = e.parents.length; n > i; i++)s.push(r ? e.parents[i] : this.get_text(e.parents[i]));
                return s = s.reverse().slice(1), t ? s.join(t) : s
            }, get_next_dom: function (t, r) {
                var i;
                return t = this.get_node(t, !0), t[0] === this.element[0] ? (i = this._firstChild(this.get_container_ul()[0]), i ? e(i) : !1) : t && t.length ? r ? (i = this._nextSibling(t[0]), i ? e(i) : !1) : t.hasClass("jstree-open") ? (i = this._firstChild(t.children("ul")[0]), i ? e(i) : !1) : null !== (i = this._nextSibling(t[0])) ? e(i) : t.parentsUntil(".jstree", "li").next("li").eq(0) : !1
            }, get_prev_dom: function (t, r) {
                var i;
                if (t = this.get_node(t, !0), t[0] === this.element[0])return i = this.get_container_ul()[0].lastChild, i ? e(i) : !1;
                if (!t || !t.length)return !1;
                if (r)return i = this._previousSibling(t[0]), i ? e(i) : !1;
                if (null !== (i = this._previousSibling(t[0]))) {
                    t = e(i);
                    while (t.hasClass("jstree-open"))t = t.children("ul:eq(0)").children("li:last");
                    return t
                }
                return i = t[0].parentNode.parentNode, i && "LI" === i.tagName ? e(i) : !1
            }, get_parent: function (e) {
                return e = this.get_node(e), e && "#" !== e.id ? e.parent : !1
            }, get_children_dom: function (e) {
                return e = this.get_node(e, !0), e[0] === this.element[0] ? this.get_container_ul().children("li") : e && e.length ? e.children("ul").children("li") : !1
            }, is_parent: function (e) {
                return e = this.get_node(e), e && (e.state.loaded === !1 || e.children.length > 0)
            }, is_loaded: function (e) {
                return e = this.get_node(e), e && e.state.loaded
            }, is_loading: function (e) {
                return e = this.get_node(e, !0), e && e.hasClass("jstree-loading")
            }, is_open: function (e) {
                return e = this.get_node(e), e && e.state.opened
            }, is_closed: function (e) {
                return e = this.get_node(e), e && this.is_parent(e) && !e.state.opened
            }, is_leaf: function (e) {
                return !this.is_parent(e)
            }, load_node: function (t, r) {
                var i, n;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.load_node(t[i], r);
                    return !0
                }
                return (t = this.get_node(t)) ? (this.get_node(t, !0).addClass("jstree-loading"), this._load_node(t, e.proxy(function (e) {
                    t.state.loaded = e, this.get_node(t, !0).removeClass("jstree-loading"), this.trigger("load_node", {
                        node: t,
                        status: e
                    }), r && r.call(this, t, e)
                }, this)), !0) : (r.call(this, t, !1), !1)
            }, _load_node: function (r, i) {
                var n = this.settings.core.data, s;
                return n ? e.isFunction(n) ? n.call(this, r, e.proxy(function (t) {
                    return t === !1 ? i.call(this, !1) : i.call(this, this["string" == typeof t ? "_append_html_data" : "_append_json_data"](r, "string" == typeof t ? e(t) : t))
                }, this)) : "object" == typeof n ? n.url ? (n = e.extend(!0, {}, n), e.isFunction(n.url) && (n.url = n.url.call(this, r)), e.isFunction(n.data) && (n.data = n.data.call(this, r)), e.ajax(n).done(e.proxy(function (n, s, a) {
                    var o = a.getResponseHeader("Content-Type");
                    return -1 !== o.indexOf("json") ? i.call(this, this._append_json_data(r, n)) : -1 !== o.indexOf("html") ? i.call(this, this._append_html_data(r, e(n))) : t
                }, this)).fail(e.proxy(function () {
                    i.call(this, !1), this._data.core.last_error = {
                        error: "ajax",
                        plugin: "core",
                        id: "core_04",
                        reason: "Could not load node",
                        data: JSON.stringify(n)
                    }, this.settings.core.error.call(this, this._data.core.last_error)
                }, this))) : (s = e.isArray(n) || e.isPlainObject(n) ? JSON.parse(JSON.stringify(n)) : n, i.call(this, this._append_json_data(r, s))) : "string" == typeof n ? i.call(this, this._append_html_data(r, n)) : i.call(this, !1) : i.call(this, "#" === r.id ? this._append_html_data(r, this._data.core.original_container_html.clone(!0)) : !1)
            }, _node_changed: function (e) {
                e = this.get_node(e), e && this._model.changed.push(e.id)
            }, _append_html_data: function (t, r) {
                t = this.get_node(t), t.children = [], t.children_d = [];
                var i = r.is("ul") ? r.children() : r, n = t.id, s = [], a = [], o = this._model.data, d = o[n], l = this._data.core.selected.length, c, h, _;
                for (i.each(e.proxy(function (t, r) {
                    c = this._parse_model_from_html(e(r), n, d.parents.concat()), c && (s.push(c), a.push(c), o[c].children_d.length && (a = a.concat(o[c].children_d)))
                }, this)), d.children = s, d.children_d = a, h = 0, _ = d.parents.length; _ > h; h++)o[d.parents[h]].children_d = o[d.parents[h]].children_d.concat(a);
                return this.trigger("model", {
                    nodes: a,
                    parent: n
                }), "#" !== n ? (this._node_changed(n), this.redraw()) : (this.get_container_ul().children(".jstree-initial-node").remove(), this.redraw(!0)), this._data.core.selected.length !== l && this.trigger("changed", {
                    action: "model",
                    selected: this._data.core.selected
                }), !0
            }, _append_json_data: function (r, i) {
                r = this.get_node(r), r.children = [], r.children_d = [];
                var n = i, s = r.id, a = [], o = [], d = this._model.data, l = d[s], c = this._data.core.selected.length, h, _, u;
                if (n.d && (n = n.d, "string" == typeof n && (n = JSON.parse(n))), e.isArray(n) || (n = [n]), n.length && n[0].id !== t && n[0].parent !== t) {
                    for (_ = 0, u = n.length; u > _; _++)n[_].children || (n[_].children = []), d[n[_].id] = n[_];
                    for (_ = 0, u = n.length; u > _; _++)d[n[_].parent].children.push(n[_].id), l.children_d.push(n[_].id);
                    for (_ = 0, u = l.children.length; u > _; _++)h = this._parse_model_from_flat_json(d[l.children[_]], s, l.parents.concat()), o.push(h), d[h].children_d.length && (o = o.concat(d[h].children_d))
                } else {
                    for (_ = 0, u = n.length; u > _; _++)h = this._parse_model_from_json(n[_], s, l.parents.concat()), h && (a.push(h), o.push(h), d[h].children_d.length && (o = o.concat(d[h].children_d)));
                    for (l.children = a, l.children_d = o, _ = 0, u = l.parents.length; u > _; _++)d[l.parents[_]].children_d = d[l.parents[_]].children_d.concat(o)
                }
                return this.trigger("model", {
                    nodes: o,
                    parent: s
                }), "#" !== s ? (this._node_changed(s), this.redraw()) : this.redraw(!0), this._data.core.selected.length !== c && this.trigger("changed", {
                    action: "model",
                    selected: this._data.core.selected
                }), !0
            }, _parse_model_from_html: function (r, i, n) {
                n = n ? [].concat(n) : [], i && n.unshift(i);
                var s, a, o = this._model.data, d = {
                    id: !1,
                    text: !1,
                    icon: !0,
                    parent: i,
                    parents: n,
                    children: [],
                    children_d: [],
                    data: null,
                    state: {},
                    li_attr: {id: !1},
                    a_attr: {href: "#"},
                    original: !1
                }, l, c, h;
                for (l in this._model.default_state)this._model.default_state.hasOwnProperty(l) && (d.state[l] = this._model.default_state[l]);
                if (c = e.vakata.attributes(r, !0), e.each(c, function (r, i) {
                        return i = e.trim(i), i.length ? (d.li_attr[r] = i, "id" === r && (d.id = i), t) : !0
                    }), c = r.children("a").eq(0), c.length && (c = e.vakata.attributes(c, !0), e.each(c, function (t, r) {
                        r = e.trim(r), r.length && (d.a_attr[t] = r)
                    })), c = r.children("a:eq(0)").length ? r.children("a:eq(0)").clone() : r.clone(), c.children("ins, i, ul").remove(), c = c.html(), c = e("<div />").html(c), d.text = c.html(), c = r.data(), d.data = c ? e.extend(!0, {}, c) : null, d.state.opened = r.hasClass("jstree-open"), d.state.selected = r.children("a").hasClass("jstree-clicked"), d.state.disabled = r.children("a").hasClass("jstree-disabled"), d.data && d.data.jstree)for (l in d.data.jstree)d.data.jstree.hasOwnProperty(l) && (d.state[l] = d.data.jstree[l]);
                c = r.children("a").children(".jstree-themeicon"), c.length && (d.icon = c.hasClass("jstree-themeicon-hidden") ? !1 : c.attr("rel")), d.state.icon && (d.icon = d.state.icon), c = r.children("ul").children("li");
                do h = "j" + this._id + "_" + ++this._cnt; while (o[h]);
                return d.id = d.li_attr.id || h, c.length ? (c.each(e.proxy(function (t, r) {
                    s = this._parse_model_from_html(e(r), d.id, n), a = this._model.data[s], d.children.push(s), a.children_d.length && (d.children_d = d.children_d.concat(a.children_d))
                }, this)), d.children_d = d.children_d.concat(d.children)) : r.hasClass("jstree-closed") && (d.state.loaded = !1), d.li_attr["class"] && (d.li_attr["class"] = d.li_attr["class"].replace("jstree-closed", "").replace("jstree-open", "")), d.a_attr["class"] && (d.a_attr["class"] = d.a_attr["class"].replace("jstree-clicked", "").replace("jstree-disabled", "")), o[d.id] = d, d.state.selected && this._data.core.selected.push(d.id), d.id
            }, _parse_model_from_flat_json: function (e, r, i) {
                i = i ? i.concat() : [], r && i.unshift(r);
                var n = e.id, s = this._model.data, a = this._model.default_state, o, d, l, c, h = {
                    id: n,
                    text: e.text || "",
                    icon: e.icon !== t ? e.icon : !0,
                    parent: r,
                    parents: i,
                    children: e.children || [],
                    children_d: e.children_d || [],
                    data: e.data,
                    state: {},
                    li_attr: {id: !1},
                    a_attr: {href: "#"},
                    original: !1
                };
                for (o in a)a.hasOwnProperty(o) && (h.state[o] = a[o]);
                if (e && e.data && e.data.jstree && e.data.jstree.icon && (h.icon = e.data.jstree.icon), e && e.data && (h.data = e.data, e.data.jstree))for (o in e.data.jstree)e.data.jstree.hasOwnProperty(o) && (h.state[o] = e.data.jstree[o]);
                if (e && "object" == typeof e.state)for (o in e.state)e.state.hasOwnProperty(o) && (h.state[o] = e.state[o]);
                if (e && "object" == typeof e.li_attr)for (o in e.li_attr)e.li_attr.hasOwnProperty(o) && (h.li_attr[o] = e.li_attr[o]);
                if (h.li_attr.id || (h.li_attr.id = n), e && "object" == typeof e.a_attr)for (o in e.a_attr)e.a_attr.hasOwnProperty(o) && (h.a_attr[o] = e.a_attr[o]);
                for (e && e.children && e.children === !0 && (h.state.loaded = !1, h.children = [], h.children_d = []), s[h.id] = h, o = 0, d = h.children.length; d > o; o++)l = this._parse_model_from_flat_json(s[h.children[o]], h.id, i), c = s[l], h.children_d.push(l), c.children_d.length && (h.children_d = h.children_d.concat(c.children_d));
                return delete e.data, delete e.children, s[h.id].original = e, h.state.selected && this._data.core.selected.push(h.id), h.id
            }, _parse_model_from_json: function (e, r, i) {
                i = i ? i.concat() : [], r && i.unshift(r);
                var n = !1, s, a, o, d, l = this._model.data, c = this._model.default_state, h;
                do n = "j" + this._id + "_" + ++this._cnt; while (l[n]);
                h = {
                    id: !1,
                    text: "string" == typeof e ? e : "",
                    icon: "object" == typeof e && e.icon !== t ? e.icon : !0,
                    parent: r,
                    parents: i,
                    children: [],
                    children_d: [],
                    data: null,
                    state: {},
                    li_attr: {id: !1},
                    a_attr: {href: "#"},
                    original: !1
                };
                for (s in c)c.hasOwnProperty(s) && (h.state[s] = c[s]);
                if (e && e.id && (h.id = e.id), e && e.text && (h.text = e.text), e && e.data && e.data.jstree && e.data.jstree.icon && (h.icon = e.data.jstree.icon), e && e.data && (h.data = e.data, e.data.jstree))for (s in e.data.jstree)e.data.jstree.hasOwnProperty(s) && (h.state[s] = e.data.jstree[s]);
                if (e && "object" == typeof e.state)for (s in e.state)e.state.hasOwnProperty(s) && (h.state[s] = e.state[s]);
                if (e && "object" == typeof e.li_attr)for (s in e.li_attr)e.li_attr.hasOwnProperty(s) && (h.li_attr[s] = e.li_attr[s]);
                if (h.li_attr.id && !h.id && (h.id = h.li_attr.id), h.id || (h.id = n), h.li_attr.id || (h.li_attr.id = h.id), e && "object" == typeof e.a_attr)for (s in e.a_attr)e.a_attr.hasOwnProperty(s) && (h.a_attr[s] = e.a_attr[s]);
                if (e && e.children && e.children.length) {
                    for (s = 0, a = e.children.length; a > s; s++)o = this._parse_model_from_json(e.children[s], h.id, i), d = l[o], h.children.push(o), d.children_d.length && (h.children_d = h.children_d.concat(d.children_d));
                    h.children_d = h.children_d.concat(h.children)
                }
                return e && e.children && e.children === !0 && (h.state.loaded = !1, h.children = [], h.children_d = []), delete e.data, delete e.children, h.original = e, l[h.id] = h, h.state.selected && this._data.core.selected.push(h.id), h.id
            }, _redraw: function () {
                var e = this._model.force_full_redraw ? this._model.data["#"].children.concat([]) : this._model.changed.concat([]), t = document.createElement("UL"), r, i, n;
                for (i = 0, n = e.length; n > i; i++)r = this.redraw_node(e[i], !0, this._model.force_full_redraw), r && this._model.force_full_redraw && t.appendChild(r);
                this._model.force_full_redraw && (t.className = this.get_container_ul()[0].className, this.element.empty().append(t)), this._model.force_full_redraw = !1, this._model.changed = [], this.trigger("redraw", {nodes: e})
            }, redraw: function (e) {
                e && (this._model.force_full_redraw = !0), this._redraw()
            }, redraw_node: function (t, r, i) {
                var n = this.get_node(t), s = !1, a = !1, o = !1, d = !1, c = !1, h = !1, _ = "", u = document, g = this._model.data;
                if (!n)return !1;
                if ("#" === n.id)return this.redraw(!0);
                if (r = r || 0 === n.children.length, t = u.getElementById(n.id))t = e(t), i || (s = t.parent().parent()[0], s === this.element[0] && (s = null), a = t.index()), r || !n.children.length || t.children("ul").length || (r = !0), r || (o = t.children("UL")[0]), t.remove(); else if (r = !0, !i) {
                    if (s = "#" !== n.parent ? e("#" + n.parent, this.element)[0] : null, !(null === s || s && g[n.parent].state.opened))return !1;
                    a = e.inArray(n.id, null === s ? g["#"].children : g[n.parent].children)
                }
                t = l.cloneNode(!0), _ = "jstree-node ";
                for (d in n.li_attr)if (n.li_attr.hasOwnProperty(d)) {
                    if ("id" === d)continue;
                    "class" !== d ? t.setAttribute(d, n.li_attr[d]) : _ += n.li_attr[d]
                }
                !n.children.length && n.state.loaded ? _ += " jstree-leaf" : (_ += n.state.opened ? " jstree-open" : " jstree-closed", t.setAttribute("aria-expanded", n.state.opened)), null !== n.parent && g[n.parent].children[g[n.parent].children.length - 1] === n.id && (_ += " jstree-last"), t.id = n.id, t.className = _, _ = (n.state.selected ? " jstree-clicked" : "") + (n.state.disabled ? " jstree-disabled" : "");
                for (c in n.a_attr)if (n.a_attr.hasOwnProperty(c)) {
                    if ("href" === c && "#" === n.a_attr[c])continue;
                    "class" !== c ? t.childNodes[1].setAttribute(c, n.a_attr[c]) : _ += " " + n.a_attr[c]
                }
                if (_.length && (t.childNodes[1].className = "jstree-anchor " + _), (n.icon && n.icon !== !0 || n.icon === !1) && (n.icon === !1 ? t.childNodes[1].childNodes[0].className += " jstree-themeicon-hidden" : -1 === n.icon.indexOf("/") && -1 === n.icon.indexOf(".") ? t.childNodes[1].childNodes[0].className += " " + n.icon + " jstree-themeicon-custom" : (t.childNodes[1].childNodes[0].style.backgroundImage = "url(" + n.icon + ")", t.childNodes[1].childNodes[0].style.backgroundPosition = "center center", t.childNodes[1].childNodes[0].style.backgroundSize = "auto", t.childNodes[1].childNodes[0].className += " jstree-themeicon-custom")), t.childNodes[1].innerHTML += n.text, r && n.children.length && n.state.opened) {
                    for (h = u.createElement("UL"), h.setAttribute("role", "group"), h.className = "jstree-children", d = 0, c = n.children.length; c > d; d++)h.appendChild(this.redraw_node(n.children[d], r, !0));
                    t.appendChild(h)
                }
                return o && t.appendChild(o), i || (s || (s = this.element[0]), s.getElementsByTagName("UL").length ? s = s.getElementsByTagName("UL")[0] : (d = u.createElement("UL"), d.setAttribute("role", "group"), d.className = "jstree-children", s.appendChild(d), s = d), s.childNodes.length > a ? s.insertBefore(t, s.childNodes[a]) : s.appendChild(t)), t
            }, open_node: function (r, i, n) {
                var s, a, o, d;
                if (e.isArray(r)) {
                    for (r = r.slice(), s = 0, a = r.length; a > s; s++)this.open_node(r[s], i, n);
                    return !0
                }
                if (r = this.get_node(r), !r || "#" === r.id)return !1;
                if (n = n === t ? this.settings.core.animation : n, !this.is_closed(r))return i && i.call(this, r, !1), !1;
                if (this.is_loaded(r))o = this.get_node(r, !0), d = this, o.length && (r.children.length && !this._firstChild(o.children("ul")[0]) && (r.state.opened = !0, this.redraw_node(r, !0), o = this.get_node(r, !0)), n ? o.children("ul").css("display", "none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", !0).children("ul").stop(!0, !0).slideDown(n, function () {
                    this.style.display = "", d.trigger("after_open", {node: r})
                }) : (o[0].className = o[0].className.replace("jstree-closed", "jstree-open"), o[0].setAttribute("aria-expanded", !0))), r.state.opened = !0, i && i.call(this, r, !0), this.trigger("open_node", {node: r}), n && o.length || this.trigger("after_open", {node: r}); else {
                    if (this.is_loading(r))return setTimeout(e.proxy(function () {
                        this.open_node(r, i, n)
                    }, this), 500);
                    this.load_node(r, function (e, t) {
                        return t ? this.open_node(e, i, n) : i ? i.call(this, e, !1) : !1
                    })
                }
            }, _open_to: function (t) {
                if (t = this.get_node(t), !t || "#" === t.id)return !1;
                var r, i, n = t.parents;
                for (r = 0, i = n.length; i > r; r += 1)"#" !== r && this.open_node(n[r], !1, 0);
                return e(document.getElementById(t.id))
            }, close_node: function (r, i) {
                var n, s, a, o;
                if (e.isArray(r)) {
                    for (r = r.slice(), n = 0, s = r.length; s > n; n++)this.close_node(r[n], i);
                    return !0
                }
                return r = this.get_node(r), r && "#" !== r.id ? (i = i === t ? this.settings.core.animation : i, a = this, o = this.get_node(r, !0), o.length && (i ? o.children("ul").attr("style", "display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", !1).children("ul").stop(!0, !0).slideUp(i, function () {
                    this.style.display = "", o.children("ul").remove(), a.trigger("after_close", {node: r})
                }) : (o[0].className = o[0].className.replace("jstree-open", "jstree-closed"), o.attr("aria-expanded", !1).children("ul").remove())), r.state.opened = !1, this.trigger("close_node", {node: r}), i && o.length || this.trigger("after_close", {node: r}), t) : !1
            }, toggle_node: function (r) {
                var i, n;
                if (e.isArray(r)) {
                    for (r = r.slice(), i = 0, n = r.length; n > i; i++)this.toggle_node(r[i]);
                    return !0
                }
                return this.is_closed(r) ? this.open_node(r) : this.is_open(r) ? this.close_node(r) : t
            }, open_all: function (e, t, r) {
                if (e || (e = "#"), e = this.get_node(e), !e)return !1;
                var i = "#" === e.id ? this.get_container_ul() : this.get_node(e, !0), n, s, a;
                if (!i.length) {
                    for (n = 0, s = e.children_d.length; s > n; n++)this.is_closed(this._model.data[e.children_d[n]]) && (this._model.data[e.children_d[n]].state.opened = !0);
                    return this.trigger("open_all", {node: e})
                }
                r = r || i, a = this, i = this.is_closed(e) ? i.find("li.jstree-closed").addBack() : i.find("li.jstree-closed"), i.each(function () {
                    a.open_node(this, function (e, i) {
                        i && this.is_parent(e) && this.open_all(e, t, r)
                    }, t || 0)
                }), 0 === r.find("li.jstree-closed").length && this.trigger("open_all", {node: this.get_node(r)})
            }, close_all: function (e, t) {
                if (e || (e = "#"), e = this.get_node(e), !e)return !1;
                var r = "#" === e.id ? this.get_container_ul() : this.get_node(e, !0), i = this, n, s;
                if (!r.length) {
                    for (n = 0, s = e.children_d.length; s > n; n++)this._model.data[e.children_d[n]].state.opened = !1;
                    return this.trigger("close_all", {node: e})
                }
                r = this.is_open(e) ? r.find("li.jstree-open").addBack() : r.find("li.jstree-open"), r.vakata_reverse().each(function () {
                    i.close_node(this, t || 0)
                }), this.trigger("close_all", {node: e})
            }, is_disabled: function (e) {
                return e = this.get_node(e), e && e.state && e.state.disabled
            }, enable_node: function (r) {
                var i, n;
                if (e.isArray(r)) {
                    for (r = r.slice(), i = 0, n = r.length; n > i; i++)this.enable_node(r[i]);
                    return !0
                }
                return r = this.get_node(r), r && "#" !== r.id ? (r.state.disabled = !1, this.get_node(r, !0).children(".jstree-anchor").removeClass("jstree-disabled"), this.trigger("enable_node", {node: r}), t) : !1
            }, disable_node: function (r) {
                var i, n;
                if (e.isArray(r)) {
                    for (r = r.slice(), i = 0, n = r.length; n > i; i++)this.disable_node(r[i]);
                    return !0
                }
                return r = this.get_node(r), r && "#" !== r.id ? (r.state.disabled = !0, this.get_node(r, !0).children(".jstree-anchor").addClass("jstree-disabled"), this.trigger("disable_node", {node: r}), t) : !1
            }, activate_node: function (e, t) {
                if (this.is_disabled(e))return !1;
                if (this.settings.core.multiple && (t.metaKey || t.ctrlKey || t.shiftKey) && (!t.shiftKey || this._data.core.last_clicked && this.get_parent(e) && this.get_parent(e) === this._data.core.last_clicked.parent))if (t.shiftKey) {
                    var r = this.get_node(e).id, i = this._data.core.last_clicked.id, n = this.get_node(this._data.core.last_clicked.parent).children, s = !1, a, o;
                    for (a = 0, o = n.length; o > a; a += 1)n[a] === r && (s = !s), n[a] === i && (s = !s), s || n[a] === r || n[a] === i ? this.select_node(n[a], !1, !1, t) : this.deselect_node(n[a], !1, !1, t)
                } else this.is_selected(e) ? this.deselect_node(e, !1, !1, t) : this.select_node(e, !1, !1, t); else!this.settings.core.multiple && (t.metaKey || t.ctrlKey || t.shiftKey) && this.is_selected(e) ? this.deselect_node(e, !1, !1, t) : (this.deselect_all(!0), this.select_node(e, !1, !1, t), this._data.core.last_clicked = this.get_node(e));
                this.trigger("activate_node", {node: this.get_node(e)})
            }, hover_node: function (e) {
                if (e = this.get_node(e, !0), !e || !e.length || e.children(".jstree-hovered").length)return !1;
                var t = this.element.find(".jstree-hovered"), r = this.element;
                t && t.length && this.dehover_node(t), e.children(".jstree-anchor").addClass("jstree-hovered"), this.trigger("hover_node", {node: this.get_node(e)}), setTimeout(function () {
                    r.attr("aria-activedescendant", e[0].id), e.attr("aria-selected", !0)
                }, 0)
            }, dehover_node: function (e) {
                return e = this.get_node(e, !0), e && e.length && e.children(".jstree-hovered").length ? (e.attr("aria-selected", !1).children(".jstree-anchor").removeClass("jstree-hovered"), this.trigger("dehover_node", {node: this.get_node(e)}), t) : !1
            }, select_node: function (r, i, n, s) {
                var a, o, d, l;
                if (e.isArray(r)) {
                    for (r = r.slice(), o = 0, d = r.length; d > o; o++)this.select_node(r[o], i, n, s);
                    return !0
                }
                return r = this.get_node(r), r && "#" !== r.id ? (a = this.get_node(r, !0), r.state.selected || (r.state.selected = !0, this._data.core.selected.push(r.id), n || (a = this._open_to(r)), a && a.length && a.children(".jstree-anchor").addClass("jstree-clicked"), this.trigger("select_node", {
                    node: r,
                    selected: this._data.core.selected,
                    event: s
                }), i || this.trigger("changed", {
                    action: "select_node",
                    node: r,
                    selected: this._data.core.selected,
                    event: s
                })), t) : !1
            }, deselect_node: function (r, i, n) {
                var s, a, o;
                if (e.isArray(r)) {
                    for (r = r.slice(), s = 0, a = r.length; a > s; s++)this.deselect_node(r[s], i, n);
                    return !0
                }
                return r = this.get_node(r), r && "#" !== r.id ? (o = this.get_node(r, !0), r.state.selected && (r.state.selected = !1, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, r.id), o.length && o.children(".jstree-anchor").removeClass("jstree-clicked"), this.trigger("deselect_node", {
                    node: r,
                    selected: this._data.core.selected,
                    event: n
                }), i || this.trigger("changed", {
                    action: "deselect_node",
                    node: r,
                    selected: this._data.core.selected,
                    event: n
                })), t) : !1
            }, select_all: function (e) {
                var t = this._data.core.selected.concat([]), r, i;
                for (this._data.core.selected = this._model.data["#"].children_d.concat(), r = 0, i = this._data.core.selected.length; i > r; r++)this._model.data[this._data.core.selected[r]] && (this._model.data[this._data.core.selected[r]].state.selected = !0);
                this.redraw(!0), this.trigger("select_all", {selected: this._data.core.selected}), e || this.trigger("changed", {
                    action: "select_all",
                    selected: this._data.core.selected,
                    old_selection: t
                })
            }, deselect_all: function (e) {
                var t = this._data.core.selected.concat([]), r, i;
                for (r = 0, i = this._data.core.selected.length; i > r; r++)this._model.data[this._data.core.selected[r]] && (this._model.data[this._data.core.selected[r]].state.selected = !1);
                this._data.core.selected = [], this.element.find(".jstree-clicked").removeClass("jstree-clicked"), this.trigger("deselect_all", {
                    selected: this._data.core.selected,
                    node: t
                }), e || this.trigger("changed", {
                    action: "deselect_all",
                    selected: this._data.core.selected,
                    old_selection: t
                })
            }, is_selected: function (e) {
                return e = this.get_node(e), e && "#" !== e.id ? e.state.selected : !1
            }, get_selected: function (t) {
                return t ? e.map(this._data.core.selected, e.proxy(function (e) {
                    return this.get_node(e)
                }, this)) : this._data.core.selected
            }, get_state: function () {
                var e = {
                    core: {
                        open: [],
                        scroll: {left: this.element.scrollLeft(), top: this.element.scrollTop()},
                        selected: []
                    }
                }, t;
                for (t in this._model.data)this._model.data.hasOwnProperty(t) && "#" !== t && (this._model.data[t].state.opened && e.core.open.push(t), this._model.data[t].state.selected && e.core.selected.push(t));
                return e
            }, set_state: function (r, i) {
                if (r) {
                    if (r.core) {
                        var n, s, a, o;
                        if (r.core.open)return e.isArray(r.core.open) ? (n = !0, s = !1, a = this, e.each(r.core.open.concat([]), function (t, o) {
                            s = a.get_node(o), s && (a.is_loaded(o) ? (a.is_closed(o) && a.open_node(o, !1, 0), r && r.core && r.core.open && e.vakata.array_remove_item(r.core.open, o)) : (a.is_loading(o) || a.open_node(o, e.proxy(function () {
                                this.set_state(r, i)
                            }, a), 0), n = !1))
                        }), n && (delete r.core.open, this.set_state(r, i)), !1) : (delete r.core.open, this.set_state(r, i), !1);
                        if (r.core.scroll)return r.core.scroll && r.core.scroll.left !== t && this.element.scrollLeft(r.core.scroll.left), r.core.scroll && r.core.scroll.top !== t && this.element.scrollTop(r.core.scroll.top), delete r.core.scroll, this.set_state(r, i), !1;
                        if (r.core.selected)return o = this, this.deselect_all(), e.each(r.core.selected, function (e, t) {
                            o.select_node(t)
                        }), delete r.core.selected, this.set_state(r, i), !1;
                        if (e.isEmptyObject(r.core))return delete r.core, this.set_state(r, i), !1
                    }
                    return e.isEmptyObject(r) ? (r = null, i && i.call(this), this.trigger("set_state"), !1) : !0
                }
                return !1
            }, refresh: function (t) {
                this._data.core.state = this.get_state(), this._cnt = 0, this._model.data = {
                    "#": {
                        id: "#",
                        parent: null,
                        parents: [],
                        children: [],
                        children_d: [],
                        state: {loaded: !1}
                    }
                };
                var r = this.get_container_ul()[0].className;
                t || this.element.html("<ul class='jstree-container-ul'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this.load_node("#", function (t, i) {
                    i && (this.get_container_ul()[0].className = r, this.set_state(e.extend(!0, {}, this._data.core.state), function () {
                        this.trigger("refresh")
                    })), this._data.core.state = null
                })
            }, set_id: function (t, r) {
                if (t = this.get_node(t), !t || "#" === t.id)return !1;
                var i, n, s = this._model.data;
                for (s[t.parent].children[e.inArray(t.id, s[t.parent].children)] = r, i = 0, n = t.parents.length; n > i; i++)s[t.parents[i]].children_d[e.inArray(t.id, s[t.parents[i]].children_d)] = r;
                for (i = 0, n = t.children.length; n > i; i++)s[t.children[i]].parent = r;
                for (i = 0, n = t.children_d.length; n > i; i++)s[t.children_d[i]].parents[e.inArray(t.id, s[t.children_d[i]].parents)] = r;
                return i = e.inArray(t.id, this._data.core.selected), -1 !== i && (this._data.core.selected[i] = r), i = this.get_node(t.id, !0), i && i.attr("id", r), delete s[t.id], t.id = r, s[r] = t, !0
            }, get_text: function (e) {
                return e = this.get_node(e), e && "#" !== e.id ? e.text : !1
            }, set_text: function (t, r) {
                var i, n, s, a;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.set_text(t[i], r);
                    return !0
                }
                return t = this.get_node(t), t && "#" !== t.id ? (t.text = r, s = this.get_node(t, !0), s.length && (s = s.children(".jstree-anchor:eq(0)"), a = s.children("I").clone(), s.html(r).prepend(a), this.trigger("set_text", {
                    obj: t,
                    text: r
                })), !0) : !1
            }, get_json: function (e, t, r) {
                if (e = this.get_node(e || "#"), !e)return !1;
                t && t.flat && !r && (r = []);
                var i = {
                    id: e.id,
                    text: e.text,
                    icon: this.get_icon(e),
                    li_attr: e.li_attr,
                    a_attr: e.a_attr,
                    state: {},
                    data: t && t.no_data ? !1 : e.data
                }, n, s;
                if (t && t.flat ? i.parent = e.parent : i.children = [], !t || !t.no_state)for (n in e.state)e.state.hasOwnProperty(n) && (i.state[n] = e.state[n]);
                if (t && t.no_id && (delete i.id, i.li_attr && i.li_attr.id && delete i.li_attr.id), t && t.flat && "#" !== e.id && r.push(i), !t || !t.no_children)for (n = 0, s = e.children.length; s > n; n++)t && t.flat ? this.get_json(e.children[n], t, r) : i.children.push(this.get_json(e.children[n], t));
                return t && t.flat ? r : "#" === e.id ? i.children : i
            }, create_node: function (r, i, n, s, a) {
                if (r = this.get_node(r), !r)return !1;
                if (n = n === t ? "last" : n, !("" + n).match(/^(before|after)$/) && !a && !this.is_loaded(r))return this.load_node(r, function () {
                    this.create_node(r, i, n, s, !0)
                });
                i || (i = {text: this.get_string("New node")}), i.text === t && (i.text = this.get_string("New node"));
                var o, d, l, c;
                switch ("#" === r.id && ("before" === n && (n = "first"), "after" === n && (n = "last")), n) {
                    case"before":
                        o = this.get_node(r.parent), n = e.inArray(r.id, o.children), r = o;
                        break;
                    case"after":
                        o = this.get_node(r.parent), n = e.inArray(r.id, o.children) + 1, r = o;
                        break;
                    case"inside":
                    case"first":
                        n = 0;
                        break;
                    case"last":
                        n = r.children.length;
                        break;
                    default:
                        n || (n = 0)
                }
                if (n > r.children.length && (n = r.children.length), i.id || (i.id = !0), !this.check("create_node", i, r, n))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (i.id === !0 && delete i.id, i = this._parse_model_from_json(i, r.id, r.parents.concat()), !i)return !1;
                for (o = this.get_node(i), d = [], d.push(i), d = d.concat(o.children_d), this.trigger("model", {
                    nodes: d,
                    parent: r.id
                }), r.children_d = r.children_d.concat(d), l = 0, c = r.parents.length; c > l; l++)this._model.data[r.parents[l]].children_d = this._model.data[r.parents[l]].children_d.concat(d);
                for (i = o, o = [], l = 0, c = r.children.length; c > l; l++)o[l >= n ? l + 1 : l] = r.children[l];
                return o[n] = i.id, r.children = o, this.redraw_node(r, !0), s && s.call(this, this.get_node(i)), this.trigger("create_node", {
                    node: this.get_node(i),
                    parent: r.id,
                    position: n
                }), i.id
            }, rename_node: function (t, r) {
                var i, n, s;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.rename_node(t[i], r);
                    return !0
                }
                return t = this.get_node(t), t && "#" !== t.id ? (s = t.text, this.check("rename_node", t, this.get_parent(t), r) ? (this.set_text(t, r), this.trigger("rename_node", {
                    node: t,
                    text: r,
                    old: s
                }), !0) : (this.settings.core.error.call(this, this._data.core.last_error), !1)) : !1
            }, delete_node: function (t) {
                var r, i, n, s, a, o, d, l, c, h;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, i = t.length; i > r; r++)this.delete_node(t[r]);
                    return !0
                }
                if (t = this.get_node(t), !t || "#" === t.id)return !1;
                if (n = this.get_node(t.parent), s = e.inArray(t.id, n.children), h = !1, !this.check("delete_node", t, n, s))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                for (-1 !== s && (n.children = e.vakata.array_remove(n.children, s)), a = t.children_d.concat([]), a.push(t.id), l = 0, c = a.length; c > l; l++) {
                    for (o = 0, d = t.parents.length; d > o; o++)s = e.inArray(a[l], this._model.data[t.parents[o]].children_d), -1 !== s && (this._model.data[t.parents[o]].children_d = e.vakata.array_remove(this._model.data[t.parents[o]].children_d, s));
                    this._model.data[a[l]].state.selected && (h = !0, s = e.inArray(a[l], this._data.core.selected), -1 !== s && (this._data.core.selected = e.vakata.array_remove(this._data.core.selected, s)))
                }
                for (this.trigger("delete_node", {
                    node: t,
                    parent: n.id
                }), h && this.trigger("changed", {
                    action: "delete_node",
                    node: t,
                    selected: this._data.core.selected,
                    parent: n.id
                }), l = 0, c = a.length; c > l; l++)delete this._model.data[a[l]];
                return this.redraw_node(n, !0), !0
            }, check: function (t, r, i, n) {
                r = r && r.id ? r : this.get_node(r), i = i && i.id ? i : this.get_node(i);
                var s = t.match(/^move_node|copy_node|create_node$/i) ? i : r, a = this.settings.core.check_callback;
                return "move_node" !== t || r.id !== i.id && e.inArray(r.id, i.children) !== n && -1 === e.inArray(i.id, r.children_d) ? (s = this.get_node(s, !0), s.length && (s = s.data("jstree")), s && s.functions && (s.functions[t] === !1 || s.functions[t] === !0) ? (s.functions[t] === !1 && (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_02",
                    reason: "Node data prevents function: " + t,
                    data: JSON.stringify({chk: t, pos: n, obj: r && r.id ? r.id : !1, par: i && i.id ? i.id : !1})
                }), s.functions[t]) : a === !1 || e.isFunction(a) && a.call(this, t, r, i, n) === !1 || a && a[t] === !1 ? (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_03",
                    reason: "User config for core.check_callback prevents function: " + t,
                    data: JSON.stringify({chk: t, pos: n, obj: r && r.id ? r.id : !1, par: i && i.id ? i.id : !1})
                }, !1) : !0) : (this._data.core.last_error = {
                    error: "check",
                    plugin: "core",
                    id: "core_01",
                    reason: "Moving parent inside child",
                    data: JSON.stringify({chk: t, pos: n, obj: r && r.id ? r.id : !1, par: i && i.id ? i.id : !1})
                }, !1)
            }, last_error: function () {
                return this._data.core.last_error
            }, move_node: function (r, i, n, s, a) {
                var o, d, l, c, h, _, u, g, f, p, m, v, y;
                if (e.isArray(r)) {
                    for (r = r.reverse().slice(), o = 0, d = r.length; d > o; o++)this.move_node(r[o], i, n, s, a);
                    return !0
                }
                if (r = r && r.id ? r : this.get_node(r), i = this.get_node(i), n = n === t ? 0 : n, !i || !r || "#" === r.id)return !1;
                if (!("" + n).match(/^(before|after)$/) && !a && !this.is_loaded(i))return this.load_node(i, function () {
                    this.move_node(r, i, n, s, !0)
                });
                if (l = "" + (r.parent || "#"), c = ("" + n).match(/^(before|after)$/) && "#" !== i.id ? this.get_node(i.parent) : i, h = this._model.data[r.id] ? this : e.jstree.reference(r.id), _ = !h || !h._id || this._id !== h._id)return this.copy_node(r, i, n, s, a) ? (h && h.delete_node(r), !0) : !1;
                switch ("#" === c.id && ("before" === n && (n = "first"), "after" === n && (n = "last")), n) {
                    case"before":
                        n = e.inArray(i.id, c.children);
                        break;
                    case"after":
                        n = e.inArray(i.id, c.children) + 1;
                        break;
                    case"inside":
                    case"first":
                        n = 0;
                        break;
                    case"last":
                        n = c.children.length;
                        break;
                    default:
                        n || (n = 0)
                }
                if (n > c.children.length && (n = c.children.length), !this.check("move_node", r, c, n))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (r.parent === c.id) {
                    for (u = c.children.concat(), g = e.inArray(r.id, u), -1 !== g && (u = e.vakata.array_remove(u, g), n > g && n--), g = [], f = 0, p = u.length; p > f; f++)g[f >= n ? f + 1 : f] = u[f];
                    g[n] = r.id, c.children = g, this._node_changed(c.id), this.redraw("#" === c.id)
                } else {
                    for (g = r.children_d.concat(), g.push(r.id), f = 0, p = r.parents.length; p > f; f++) {
                        for (u = [], y = h._model.data[r.parents[f]].children_d, m = 0, v = y.length; v > m; m++)-1 === e.inArray(y[m], g) && u.push(y[m]);
                        h._model.data[r.parents[f]].children_d = u
                    }
                    for (h._model.data[l].children = e.vakata.array_remove_item(h._model.data[l].children, r.id), f = 0, p = c.parents.length; p > f; f++)this._model.data[c.parents[f]].children_d = this._model.data[c.parents[f]].children_d.concat(g);
                    for (u = [], f = 0, p = c.children.length; p > f; f++)u[f >= n ? f + 1 : f] = c.children[f];
                    for (u[n] = r.id, c.children = u, c.children_d.push(r.id), c.children_d = c.children_d.concat(r.children_d), r.parent = c.id, g = c.parents.concat(), g.unshift(c.id), y = r.parents.length, r.parents = g, g = g.concat(), f = 0, p = r.children_d.length; p > f; f++)this._model.data[r.children_d[f]].parents = this._model.data[r.children_d[f]].parents.slice(0, -1 * y), Array.prototype.push.apply(this._model.data[r.children_d[f]].parents, g);
                    this._node_changed(l), this._node_changed(c.id), this.redraw("#" === l || "#" === c.id)
                }
                return s && s.call(this, r, c, n), this.trigger("move_node", {
                    node: r,
                    parent: c.id,
                    position: n,
                    old_parent: l,
                    is_multi: _,
                    old_instance: h,
                    new_instance: this
                }), !0
            }, copy_node: function (r, i, n, s, a) {
                var o, d, l, c, h, _, u, g, f, p, m;
                if (e.isArray(r)) {
                    for (r = r.reverse().slice(), o = 0, d = r.length; d > o; o++)this.copy_node(r[o], i, n, s, a);
                    return !0
                }
                if (r = r && r.id ? r : this.get_node(r), i = this.get_node(i), n = n === t ? 0 : n, !i || !r || "#" === r.id)return !1;
                if (!("" + n).match(/^(before|after)$/) && !a && !this.is_loaded(i))return this.load_node(i, function () {
                    this.copy_node(r, i, n, s, !0)
                });
                switch (g = "" + (r.parent || "#"), f = ("" + n).match(/^(before|after)$/) && "#" !== i.id ? this.get_node(i.parent) : i, p = this._model.data[r.id] ? this : e.jstree.reference(r.id), m = !p || !p._id || this._id !== p._id, "#" === f.id && ("before" === n && (n = "first"), "after" === n && (n = "last")), n) {
                    case"before":
                        n = e.inArray(i.id, f.children);
                        break;
                    case"after":
                        n = e.inArray(i.id, f.children) + 1;
                        break;
                    case"inside":
                    case"first":
                        n = 0;
                        break;
                    case"last":
                        n = f.children.length;
                        break;
                    default:
                        n || (n = 0)
                }
                if (n > f.children.length && (n = f.children.length), !this.check("copy_node", r, f, n))return this.settings.core.error.call(this, this._data.core.last_error), !1;
                if (u = p ? p.get_json(r, {no_id: !0, no_data: !0, no_state: !0}) : r, !u)return !1;
                if (u.id === !0 && delete u.id, u = this._parse_model_from_json(u, f.id, f.parents.concat()), !u)return !1;
                for (c = this.get_node(u), l = [], l.push(u), l = l.concat(c.children_d), this.trigger("model", {
                    nodes: l,
                    parent: f.id
                }), h = 0, _ = f.parents.length; _ > h; h++)this._model.data[f.parents[h]].children_d = this._model.data[f.parents[h]].children_d.concat(l);
                for (l = [], h = 0, _ = f.children.length; _ > h; h++)l[h >= n ? h + 1 : h] = f.children[h];
                return l[n] = c.id, f.children = l, f.children_d.push(c.id), f.children_d = f.children_d.concat(c.children_d), this._node_changed(f.id), this.redraw("#" === f.id), s && s.call(this, c, f, n), this.trigger("copy_node", {
                    node: c,
                    original: r,
                    parent: f.id,
                    position: n,
                    old_parent: g,
                    is_multi: m,
                    old_instance: p,
                    new_instance: this
                }), c.id
            }, cut: function (r) {
                if (r || (r = this._data.core.selected.concat()), e.isArray(r) || (r = [r]), !r.length)return !1;
                var a = [], o, d, l;
                for (d = 0, l = r.length; l > d; d++)o = this.get_node(r[d]), o && o.id && "#" !== o.id && a.push(o);
                return a.length ? (i = a, s = this, n = "move_node", this.trigger("cut", {node: r}), t) : !1
            }, copy: function (r) {
                if (r || (r = this._data.core.selected.concat()), e.isArray(r) || (r = [r]), !r.length)return !1;
                var a = [], o, d, l;
                for (d = 0, l = r.length; l > d; d++)o = this.get_node(r[d]), o && o.id && "#" !== o.id && a.push(o);
                return a.length ? (i = a, s = this, n = "copy_node", this.trigger("copy", {node: r}), t) : !1
            }, get_buffer: function () {
                return {mode: n, node: i, inst: s}
            }, can_paste: function () {
                return n !== !1 && i !== !1
            }, paste: function (e) {
                return e = this.get_node(e), e && n && n.match(/^(copy_node|move_node)$/) && i ? (this[n](i, e) && this.trigger("paste", {
                    parent: e.id,
                    node: i,
                    mode: n
                }), i = !1, n = !1, s = !1, t) : !1
            }, edit: function (r, i) {
                if (r = this._open_to(r), !r || !r.length)return !1;
                var n = this._data.core.rtl, s = this.element.width(), a = r.children(".jstree-anchor"), o = e("<span>"), d = "string" == typeof i ? i : this.get_text(r), l = e("<div />", {
                    css: {
                        position: "absolute",
                        top: "-200px",
                        left: n ? "0px" : "-1000px",
                        visibility: "hidden"
                    }
                }).appendTo("body"), c = e("<input />", {
                    value: d,
                    "class": "jstree-rename-input",
                    css: {
                        padding: "0",
                        border: "1px solid silver",
                        "box-sizing": "border-box",
                        display: "inline-block",
                        height: this._data.core.li_height + "px",
                        lineHeight: this._data.core.li_height + "px",
                        width: "150px"
                    },
                    blur: e.proxy(function () {
                        var e = o.children(".jstree-rename-input"), t = e.val();
                        "" === t && (t = d), l.remove(), o.replaceWith(a), o.remove(), this.set_text(r, d), this.rename_node(r, t) === !1 && this.set_text(r, d)
                    }, this),
                    keydown: function (e) {
                        var t = e.which;
                        27 === t && (this.value = d), (27 === t || 13 === t || 37 === t || 38 === t || 39 === t || 40 === t || 32 === t) && e.stopImmediatePropagation(), (27 === t || 13 === t) && (e.preventDefault(), this.blur())
                    },
                    click: function (e) {
                        e.stopImmediatePropagation()
                    },
                    mousedown: function (e) {
                        e.stopImmediatePropagation()
                    },
                    keyup: function (e) {
                        c.width(Math.min(l.text("pW" + this.value).width(), s))
                    },
                    keypress: function (e) {
                        return 13 === e.which ? !1 : t
                    }
                }), h = {
                    fontFamily: a.css("fontFamily") || "",
                    fontSize: a.css("fontSize") || "",
                    fontWeight: a.css("fontWeight") || "",
                    fontStyle: a.css("fontStyle") || "",
                    fontStretch: a.css("fontStretch") || "",
                    fontVariant: a.css("fontVariant") || "",
                    letterSpacing: a.css("letterSpacing") || "",
                    wordSpacing: a.css("wordSpacing") || ""
                };
                this.set_text(r, ""), o.attr("class", a.attr("class")).append(a.contents().clone()).append(c), a.replaceWith(o), l.css(h), c.css(h).width(Math.min(l.text("pW" + c[0].value).width(), s))[0].select()
            }, set_theme: function (t, r) {
                if (!t)return !1;
                if (r === !0) {
                    var i = this.settings.core.themes.dir;
                    i || (i = e.jstree.path + "/themes"), r = i + "/" + t + "/style.css"
                }
                r && -1 === e.inArray(r, a) && (e("head").append('<link rel="stylesheet" href="' + r + '" type="text/css" />'), a.push(r)), this._data.core.themes.name && this.element.removeClass("jstree-" + this._data.core.themes.name), this._data.core.themes.name = t, this.element.addClass("jstree-" + t), this.element[this.settings.core.themes.responsive ? "addClass" : "removeClass"]("jstree-" + t + "-responsive"), this.trigger("set_theme", {theme: t})
            }, get_theme: function () {
                return this._data.core.themes.name
            }, set_theme_variant: function (e) {
                this._data.core.themes.variant && this.element.removeClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant), this._data.core.themes.variant = e, e && this.element.addClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant)
            }, get_theme_variant: function () {
                return this._data.core.themes.variant
            }, show_stripes: function () {
                this._data.core.themes.stripes = !0, this.get_container_ul().addClass("jstree-striped")
            }, hide_stripes: function () {
                this._data.core.themes.stripes = !1, this.get_container_ul().removeClass("jstree-striped")
            }, toggle_stripes: function () {
                this._data.core.themes.stripes ? this.hide_stripes() : this.show_stripes()
            }, show_dots: function () {
                this._data.core.themes.dots = !0, this.get_container_ul().removeClass("jstree-no-dots")
            }, hide_dots: function () {
                this._data.core.themes.dots = !1, this.get_container_ul().addClass("jstree-no-dots")
            }, toggle_dots: function () {
                this._data.core.themes.dots ? this.hide_dots() : this.show_dots()
            }, show_icons: function () {
                this._data.core.themes.icons = !0, this.get_container_ul().removeClass("jstree-no-icons")
            }, hide_icons: function () {
                this._data.core.themes.icons = !1, this.get_container_ul().addClass("jstree-no-icons")
            }, toggle_icons: function () {
                this._data.core.themes.icons ? this.hide_icons() : this.show_icons()
            }, set_icon: function (t, r) {
                var i, n, s, a;
                if (e.isArray(t)) {
                    for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.set_icon(t[i], r);
                    return !0
                }
                return t = this.get_node(t), t && "#" !== t.id ? (a = t.icon, t.icon = r, s = this.get_node(t, !0).children(".jstree-anchor").children(".jstree-themeicon"), r === !1 ? this.hide_icon(t) : r === !0 ? s.removeClass("jstree-themeicon-custom " + a).css("background", "").removeAttr("rel") : -1 === r.indexOf("/") && -1 === r.indexOf(".") ? (s.removeClass(a).css("background", ""), s.addClass(r + " jstree-themeicon-custom").attr("rel", r)) : (s.removeClass(a).css("background", ""), s.addClass("jstree-themeicon-custom").css("background", "url('" + r + "') center center no-repeat").attr("rel", r)), !0) : !1
            }, get_icon: function (e) {
                return e = this.get_node(e), e && "#" !== e.id ? e.icon : !1
            }, hide_icon: function (t) {
                var r, i;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, i = t.length; i > r; r++)this.hide_icon(t[r]);
                    return !0
                }
                return t = this.get_node(t), t && "#" !== t ? (t.icon = !1, this.get_node(t, !0).children("a").children(".jstree-themeicon").addClass("jstree-themeicon-hidden"), !0) : !1
            }, show_icon: function (t) {
                var r, i, n;
                if (e.isArray(t)) {
                    for (t = t.slice(), r = 0, i = t.length; i > r; r++)this.show_icon(t[r]);
                    return !0
                }
                return t = this.get_node(t), t && "#" !== t ? (n = this.get_node(t, !0), t.icon = n.length ? n.children("a").children(".jstree-themeicon").attr("rel") : !0, t.icon || (t.icon = !0), n.children("a").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden"), !0) : !1
            }
        }, e.vakata = {}, e.fn.vakata_reverse = [].reverse, e.vakata.attributes = function (t, r) {
            t = e(t)[0];
            var i = r ? {} : [];
            return t && t.attributes && e.each(t.attributes, function (t, n) {
                -1 === e.inArray(n.nodeName.toLowerCase(), ["style", "contenteditable", "hasfocus", "tabindex"]) && null !== n.nodeValue && "" !== e.trim(n.nodeValue) && (r ? i[n.nodeName] = n.nodeValue : i.push(n.nodeName))
            }), i
        }, e.vakata.array_unique = function (e) {
            var t = [], r, i, n;
            for (r = 0, n = e.length; n > r; r++) {
                for (i = 0; r >= i; i++)if (e[r] === e[i])break;
                i === r && t.push(e[r])
            }
            return t
        }, e.vakata.array_remove = function (e, t, r) {
            var i = e.slice((r || t) + 1 || e.length);
            return e.length = 0 > t ? e.length + t : t, e.push.apply(e, i), e
        }, e.vakata.array_remove_item = function (t, r) {
            var i = e.inArray(r, t);
            return -1 !== i ? e.vakata.array_remove(t, i) : t
        }, function () {
            var t = {}, r = function (e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {browser: t[1] || "", version: t[2] || "0"}
            }, i = r(window.navigator.userAgent);
            i.browser && (t[i.browser] = !0, t.version = i.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), e.vakata.browser = t
        }(), e.vakata.browser.msie && 8 > e.vakata.browser.version && (e.jstree.defaults.core.animation = 0);
        var _ = document.createElement("I");
        _.className = "jstree-icon jstree-checkbox", e.jstree.defaults.checkbox = {
            visible: !0,
            three_state: !0,
            whole_node: !0,
            keep_selected_style: !0
        }, e.jstree.plugins.checkbox = function (t, r) {
            this.bind = function () {
                r.bind.call(this), this._data.checkbox.uto = !1, this.element.on("init.jstree", e.proxy(function () {
                    this._data.checkbox.visible = this.settings.checkbox.visible, this.settings.checkbox.keep_selected_style || this.element.addClass("jstree-checkbox-no-clicked")
                }, this)).on("loading.jstree", e.proxy(function () {
                    this[this._data.checkbox.visible ? "show_checkboxes" : "hide_checkboxes"]()
                }, this)), this.settings.checkbox.three_state && this.element.on("changed.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree", e.proxy(function () {
                    this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)
                }, this)).on("model.jstree", e.proxy(function (t, r) {
                    var i = this._model.data, n = i[r.parent], s = r.nodes, a = [], o, d, l, c, h, _;
                    if (n.state.selected) {
                        for (d = 0, l = s.length; l > d; d++)i[s[d]].state.selected = !0;
                        this._data.core.selected = this._data.core.selected.concat(s)
                    } else for (d = 0, l = s.length; l > d; d++)if (i[s[d]].state.selected) {
                        for (c = 0, h = i[s[d]].children_d.length; h > c; c++)i[i[s[d]].children_d[c]].state.selected = !0;
                        this._data.core.selected = this._data.core.selected.concat(i[s[d]].children_d)
                    }
                    for (d = 0, l = n.children_d.length; l > d; d++)i[n.children_d[d]].children.length || a.push(i[n.children_d[d]].parent);
                    for (a = e.vakata.array_unique(a), c = 0, h = a.length; h > c; c++) {
                        n = i[a[c]];
                        while (n && "#" !== n.id) {
                            for (o = 0, d = 0, l = n.children.length; l > d; d++)o += i[n.children[d]].state.selected;
                            if (o !== l)break;
                            n.state.selected = !0, this._data.core.selected.push(n.id), _ = this.get_node(n, !0), _ && _.length && _.children(".jstree-anchor").addClass("jstree-clicked"), n = this.get_node(n.parent)
                        }
                    }
                    this._data.core.selected = e.vakata.array_unique(this._data.core.selected)
                }, this)).on("select_node.jstree", e.proxy(function (t, r) {
                    var i = r.node, n = this._model.data, s = this.get_node(i.parent), a = this.get_node(i, !0), o, d, l, c;
                    for (this._data.core.selected = e.vakata.array_unique(this._data.core.selected.concat(i.children_d)), o = 0, d = i.children_d.length; d > o; o++)n[i.children_d[o]].state.selected = !0;
                    while (s && "#" !== s.id) {
                        for (l = 0, o = 0, d = s.children.length; d > o; o++)l += n[s.children[o]].state.selected;
                        if (l !== d)break;
                        s.state.selected = !0, this._data.core.selected.push(s.id), c = this.get_node(s, !0), c && c.length && c.children(".jstree-anchor").addClass("jstree-clicked"), s = this.get_node(s.parent)
                    }
                    a.length && a.find(".jstree-anchor").addClass("jstree-clicked")
                }, this)).on("deselect_node.jstree", e.proxy(function (t, r) {
                    var i = r.node, n = this.get_node(i, !0), s, a, o;
                    for (s = 0, a = i.children_d.length; a > s; s++)this._model.data[i.children_d[s]].state.selected = !1;
                    for (s = 0, a = i.parents.length; a > s; s++)this._model.data[i.parents[s]].state.selected = !1, o = this.get_node(i.parents[s], !0), o && o.length && o.children(".jstree-anchor").removeClass("jstree-clicked");
                    for (o = [], s = 0, a = this._data.core.selected.length; a > s; s++)-1 === e.inArray(this._data.core.selected[s], i.children_d) && -1 === e.inArray(this._data.core.selected[s], i.parents) && o.push(this._data.core.selected[s]);
                    this._data.core.selected = e.vakata.array_unique(o), n.length && n.find(".jstree-anchor").removeClass("jstree-clicked")
                }, this)).on("delete_node.jstree", e.proxy(function (e, t) {
                    var r = this.get_node(t.parent), i = this._model.data, n, s, a, o;
                    while (r && "#" !== r.id) {
                        for (a = 0, n = 0, s = r.children.length; s > n; n++)a += i[r.children[n]].state.selected;
                        if (a !== s)break;
                        r.state.selected = !0, this._data.core.selected.push(r.id), o = this.get_node(r, !0), o && o.length && o.children(".jstree-anchor").addClass("jstree-clicked"), r = this.get_node(r.parent)
                    }
                }, this)).on("move_node.jstree", e.proxy(function (t, r) {
                    var i = r.is_multi, n = r.old_parent, s = this.get_node(r.parent), a = this._model.data, o, d, l, c, h;
                    if (!i) {
                        o = this.get_node(n);
                        while (o && "#" !== o.id) {
                            for (d = 0, l = 0, c = o.children.length; c > l; l++)d += a[o.children[l]].state.selected;
                            if (d !== c)break;
                            o.state.selected = !0, this._data.core.selected.push(o.id), h = this.get_node(o, !0), h && h.length && h.children(".jstree-anchor").addClass("jstree-clicked"), o = this.get_node(o.parent)
                        }
                    }
                    o = s;
                    while (o && "#" !== o.id) {
                        for (d = 0, l = 0, c = o.children.length; c > l; l++)d += a[o.children[l]].state.selected;
                        if (d === c)o.state.selected || (o.state.selected = !0, this._data.core.selected.push(o.id), h = this.get_node(o, !0), h && h.length && h.children(".jstree-anchor").addClass("jstree-clicked")); else {
                            if (!o.state.selected)break;
                            o.state.selected = !1, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, o.id), h = this.get_node(o, !0), h && h.length && h.children(".jstree-anchor").removeClass("jstree-clicked")
                        }
                        o = this.get_node(o.parent)
                    }
                }, this))
            }, this._undetermined = function () {
                var t, r, i = this._model.data, n = this._data.core.selected, s = [], a = this;
                for (t = 0, r = n.length; r > t; t++)i[n[t]] && i[n[t]].parents && (s = s.concat(i[n[t]].parents));
                for (this.element.find(".jstree-closed").not(":has(ul)").each(function () {
                    var e = a.get_node(this);
                    !e.state.loaded && e.original && e.original.state && e.original.state.undetermined && e.original.state.undetermined === !0 && (s.push(e.id), s = s.concat(e.parents))
                }), s = e.vakata.array_unique(s), t = e.inArray("#", s), -1 !== t && (s = e.vakata.array_remove(s, t)), this.element.find(".jstree-undetermined").removeClass("jstree-undetermined"), t = 0, r = s.length; r > t; t++)i[s[t]].state.selected || (n = this.get_node(s[t], !0), n && n.length && n.children("a").children(".jstree-checkbox").addClass("jstree-undetermined"))
            }, this.redraw_node = function (t, i, n) {
                if (t = r.redraw_node.call(this, t, i, n)) {
                    var s = t.getElementsByTagName("A")[0];
                    s.insertBefore(_.cloneNode(), s.childNodes[0])
                }
                return !n && this.settings.checkbox.three_state && (this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)), t
            }, this.activate_node = function (t, i) {
                return (this.settings.checkbox.whole_node || e(i.target).hasClass("jstree-checkbox")) && (i.ctrlKey = !0), r.activate_node.call(this, t, i)
            }, this.show_checkboxes = function () {
                this._data.core.themes.checkboxes = !0, this.element.children("ul").removeClass("jstree-no-checkboxes")
            }, this.hide_checkboxes = function () {
                this._data.core.themes.checkboxes = !1, this.element.children("ul").addClass("jstree-no-checkboxes")
            }, this.toggle_checkboxes = function () {
                this._data.core.themes.checkboxes ? this.hide_checkboxes() : this.show_checkboxes()
            }
        }, e.jstree.defaults.contextmenu = {
            select_node: !0, show_at_node: !0, items: function (t, r) {
                return {
                    create: {
                        separator_before: !1,
                        separator_after: !0,
                        _disabled: !1,
                        label: "Create",
                        action: function (t) {
                            var r = e.jstree.reference(t.reference), i = r.get_node(t.reference);
                            r.create_node(i, {}, "last", function (e) {
                                setTimeout(function () {
                                    r.edit(e)
                                }, 0)
                            })
                        }
                    },
                    rename: {
                        separator_before: !1,
                        separator_after: !1,
                        _disabled: !1,
                        label: "Rename",
                        action: function (t) {
                            var r = e.jstree.reference(t.reference), i = r.get_node(t.reference);
                            r.edit(i)
                        }
                    },
                    remove: {
                        separator_before: !1,
                        icon: !1,
                        separator_after: !1,
                        _disabled: !1,
                        label: "Delete",
                        action: function (t) {
                            var r = e.jstree.reference(t.reference), i = r.get_node(t.reference);
                            r.is_selected(i) ? r.delete_node(r.get_selected()) : r.delete_node(i)
                        }
                    },
                    ccp: {
                        separator_before: !0,
                        icon: !1,
                        separator_after: !1,
                        label: "Edit",
                        action: !1,
                        submenu: {
                            cut: {
                                separator_before: !1, separator_after: !1, label: "Cut", action: function (t) {
                                    var r = e.jstree.reference(t.reference), i = r.get_node(t.reference);
                                    r.is_selected(i) ? r.cut(r.get_selected()) : r.cut(i)
                                }
                            }, copy: {
                                separator_before: !1,
                                icon: !1,
                                separator_after: !1,
                                label: "Copy",
                                action: function (t) {
                                    var r = e.jstree.reference(t.reference), i = r.get_node(t.reference);
                                    r.is_selected(i) ? r.copy(r.get_selected()) : r.copy(i)
                                }
                            }, paste: {
                                separator_before: !1, icon: !1, _disabled: function (t) {
                                    return !e.jstree.reference(t.reference).can_paste()
                                }, separator_after: !1, label: "Paste", action: function (t) {
                                    var r = e.jstree.reference(t.reference), i = r.get_node(t.reference);
                                    r.paste(i)
                                }
                            }
                        }
                    }
                }
            }
        }, e.jstree.plugins.contextmenu = function (r, i) {
            this.bind = function () {
                i.bind.call(this), this.element.on("contextmenu.jstree", ".jstree-anchor", e.proxy(function (e) {
                    e.preventDefault(), this.is_loading(e.currentTarget) || this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e)
                }, this)).on("click.jstree", ".jstree-anchor", e.proxy(function (t) {
                    this._data.contextmenu.visible && e.vakata.context.hide()
                }, this)), e(document).on("context_hide.vakata", e.proxy(function () {
                    this._data.contextmenu.visible = !1
                }, this))
            }, this.teardown = function () {
                this._data.contextmenu.visible && e.vakata.context.hide(), i.teardown.call(this)
            }, this.show_contextmenu = function (r, i, n, s) {
                if (r = this.get_node(r), !r || "#" === r.id)return !1;
                var a = this.settings.contextmenu, o = this.get_node(r, !0), d = o.children(".jstree-anchor"), l = !1, c = !1;
                (a.show_at_node || i === t || n === t) && (l = d.offset(), i = l.left, n = l.top + this._data.core.li_height), this.settings.contextmenu.select_node && !this.is_selected(r) && (this.deselect_all(), this.select_node(r, !1, !1, s)), c = a.items, e.isFunction(c) && (c = c.call(this, r, e.proxy(function (e) {
                    this._show_contextmenu(r, i, n, e)
                }, this))), e.isPlainObject(c) && this._show_contextmenu(r, i, n, c)
            }, this._show_contextmenu = function (t, r, i, n) {
                var s = this.get_node(t, !0), a = s.children(".jstree-anchor");
                e(document).one("context_show.vakata", e.proxy(function (t, r) {
                    var i = "jstree-contextmenu jstree-" + this.get_theme() + "-contextmenu";
                    e(r.element).addClass(i)
                }, this)), this._data.contextmenu.visible = !0, e.vakata.context.show(a, {
                    x: r,
                    y: i
                }, n), this.trigger("show_contextmenu", {node: t, x: r, y: i})
            }
        }, function (e) {
            var r = !1, i = {
                element: !1,
                reference: !1,
                position_x: 0,
                position_y: 0,
                items: [],
                html: "",
                is_visible: !1
            };
            e.vakata.context = {
                settings: {hide_onmouseleave: 0, icons: !0}, _trigger: function (t) {
                    e(document).triggerHandler("context_" + t + ".vakata", {
                        reference: i.reference,
                        element: i.element,
                        position: {x: i.position_x, y: i.position_y}
                    })
                }, _execute: function (t) {
                    return t = i.items[t], t && (!t._disabled || e.isFunction(t._disabled) && !t._disabled({
                        item: t,
                        reference: i.reference,
                        element: i.element
                    })) && t.action ? t.action.call(null, {
                        item: t,
                        reference: i.reference,
                        element: i.element,
                        position: {x: i.position_x, y: i.position_y}
                    }) : !1
                }, _parse: function (r, n) {
                    if (!r)return !1;
                    n || (i.html = "", i.items = []);
                    var s = "", a = !1, o;
                    return n && (s += "<ul>"), e.each(r, function (r, n) {
                        return n ? (i.items.push(n), !a && n.separator_before && (s += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>"), a = !1, s += "<li class='" + (n._class || "") + (n._disabled === !0 || e.isFunction(n._disabled) && n._disabled({
                                item: n,
                                reference: i.reference,
                                element: i.element
                            }) ? " vakata-contextmenu-disabled " : "") + "' " + (n.shortcut ? " data-shortcut='" + n.shortcut + "' " : "") + ">", s += "<a href='#' rel='" + (i.items.length - 1) + "'>", e.vakata.context.settings.icons && (s += "<i ", n.icon && (s += -1 !== n.icon.indexOf("/") || -1 !== n.icon.indexOf(".") ? " style='background:url(\"" + n.icon + "\") center center no-repeat' " : " class='" + n.icon + "' "), s += "></i><span class='vakata-contextmenu-sep'>&#160;</span>"), s += n.label + (n.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + n.shortcut + '">' + (n.shortcut_label || "") + "</span>" : "") + "<" + "/a>", n.submenu && (o = e.vakata.context._parse(n.submenu, !0), o && (s += o)), s += "</li>", n.separator_after && (s += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>", a = !0), t) : !0
                    }), s = s.replace(/<li class\='vakata-context-separator'\><\/li\>$/, ""), n && (s += "</ul>"), n || (i.html = s, e.vakata.context._trigger("parse")), s.length > 10 ? s : !1
                }, _show_submenu: function (t) {
                    if (t = e(t), t.length && t.children("ul").length) {
                        var i = t.children("ul"), n = t.offset().left + t.outerWidth(), s = t.offset().top, a = i.width(), o = i.height(), d = e(window).width() + e(window).scrollLeft(), l = e(window).height() + e(window).scrollTop();
                        r ? t[0 > n - (a + 10 + t.outerWidth()) ? "addClass" : "removeClass"]("vakata-context-left") : t[n + a + 10 > d ? "addClass" : "removeClass"]("vakata-context-right"), s + o + 10 > l && i.css("bottom", "-1px"), i.show()
                    }
                }, show: function (t, n, s) {
                    var a, o, d, l, c, h, _, u, g = !0;
                    switch (i.element && i.element.length && i.element.width(""), g) {
                        case!n && !t:
                            return !1;
                        case!!n && !!t:
                            i.reference = t, i.position_x = n.x, i.position_y = n.y;
                            break;
                        case!n && !!t:
                            i.reference = t, a = t.offset(), i.position_x = a.left + t.outerHeight(), i.position_y = a.top;
                            break;
                        case!!n && !t:
                            i.position_x = n.x, i.position_y = n.y
                    }
                    t && !s && e(t).data("vakata_contextmenu") && (s = e(t).data("vakata_contextmenu")), e.vakata.context._parse(s) && i.element.html(i.html), i.items.length && (o = i.element, d = i.position_x, l = i.position_y, c = o.width(), h = o.height(), _ = e(window).width() + e(window).scrollLeft(), u = e(window).height() + e(window).scrollTop(), r && (d -= o.outerWidth(), e(window).scrollLeft() + 20 > d && (d = e(window).scrollLeft() + 20)), d + c + 20 > _ && (d = _ - (c + 20)), l + h + 20 > u && (l = u - (h + 20)), i.element.css({
                        left: d,
                        top: l
                    }).show().find("a:eq(0)").focus().parent().addClass("vakata-context-hover"), i.is_visible = !0, e.vakata.context._trigger("show"))
                }, hide: function () {
                    i.is_visible && (i.element.hide().find("ul").hide().end().find(":focus").blur(), i.is_visible = !1, e.vakata.context._trigger("hide"))
                }
            }, e(function () {
                r = "rtl" === e("body").css("direction");
                var t = !1;
                i.element = e("<ul class='vakata-context'></ul>"), i.element.on("mouseenter", "li", function (r) {
                    r.stopImmediatePropagation(), e.contains(this, r.relatedTarget) || (t && clearTimeout(t), i.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end(), e(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover"), e.vakata.context._show_submenu(this))
                }).on("mouseleave", "li", function (t) {
                    e.contains(this, t.relatedTarget) || e(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")
                }).on("mouseleave", function (r) {
                    e(this).find(".vakata-context-hover").removeClass("vakata-context-hover"), e.vakata.context.settings.hide_onmouseleave && (t = setTimeout(function (t) {
                        return function () {
                            e.vakata.context.hide()
                        }
                    }(this), e.vakata.context.settings.hide_onmouseleave))
                }).on("click", "a", function (e) {
                    e.preventDefault()
                }).on("mouseup", "a", function (t) {
                    e(this).blur().parent().hasClass("vakata-context-disabled") || e.vakata.context._execute(e(this).attr("rel")) === !1 || e.vakata.context.hide()
                }).on("keydown", "a", function (t) {
                    var r = null;
                    switch (t.which) {
                        case 13:
                        case 32:
                            t.type = "mouseup", t.preventDefault(), e(t.currentTarget).trigger(t);
                            break;
                        case 37:
                            i.is_visible && (i.element.find(".vakata-context-hover").last().parents("li:eq(0)").find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 38:
                            i.is_visible && (r = i.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first(), r.length || (r = i.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()), r.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 39:
                            i.is_visible && (i.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 40:
                            i.is_visible && (r = i.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first(), r.length || (r = i.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()), r.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 27:
                            e.vakata.context.hide(), t.preventDefault();
                            break;
                        default:
                    }
                }).on("keydown", function (e) {
                    e.preventDefault();
                    var t = i.element.find(".vakata-contextmenu-shortcut-" + e.which).parent();
                    t.parent().not(".vakata-context-disabled") && t.mouseup()
                }).appendTo("body"), e(document).on("mousedown", function (t) {
                    i.is_visible && !e.contains(i.element[0], t.target) && e.vakata.context.hide()
                }).on("context_show.vakata", function (e, t) {
                    i.element.find("li:has(ul)").children("a").addClass("vakata-context-parent"), r && i.element.addClass("vakata-context-rtl").css("direction", "rtl"), i.element.find("ul").hide().end()
                })
            })
        }(e), e.jstree.defaults.dnd = {
            copy: !0,
            open_timeout: 500,
            is_draggable: !0,
            check_while_dragging: !0
        }, e.jstree.plugins.dnd = function (r, i) {
            this.bind = function () {
                i.bind.call(this), this.element.on("mousedown touchstart", ".jstree-anchor", e.proxy(function (r) {
                    var i = this.get_node(r.target), n = this.is_selected(i) ? this.get_selected().length : 1;
                    return i && i.id && "#" !== i.id && (1 === r.which || "touchstart" === r.type) && (this.settings.dnd.is_draggable === !0 || e.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, i)) ? (this.element.trigger("mousedown.jstree"), e.vakata.dnd.start(r, {
                        jstree: !0,
                        origin: this,
                        obj: this.get_node(i, !0),
                        nodes: n > 1 ? this.get_selected() : [i.id]
                    }, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + '"><i class="jstree-icon jstree-er"></i>' + (n > 1 ? n + " " + this.get_string("nodes") : this.get_text(r.currentTarget, !0)) + '<ins class="jstree-copy" style="display:none;">+</ins></div>')) : t
                }, this))
            }
        }, e(function () {
            var r = !1, i = !1, n = !1, s = e('<div id="jstree-marker">&#160;</div>').hide().appendTo("body");
            e(document).bind("dnd_start.vakata", function (e, t) {
                r = !1
            }).bind("dnd_move.vakata", function (a, o) {
                if (n && clearTimeout(n), o.data.jstree && (!o.event.target.id || "jstree-marker" !== o.event.target.id)) {
                    var d = e.jstree.reference(o.event.target), l = !1, c = !1, h = !1, _, u, g, f, p, m, v, y, j, x, k, b;
                    if (d && d._data && d._data.dnd)if (s.attr("class", "jstree-" + d.get_theme()), o.helper.children().attr("class", "jstree-" + d.get_theme()).find(".jstree-copy:eq(0)")[o.data.origin && o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey) ? "show" : "hide"](), o.event.target !== d.element[0] && o.event.target !== d.get_container_ul()[0] || 0 !== d.get_container_ul().children().length) {
                        if (l = e(o.event.target).closest("a"), l && l.length && l.parent().is(".jstree-closed, .jstree-open, .jstree-leaf") && (c = l.offset(), h = o.event.pageY - c.top, g = l.height(), m = g / 3 > h ? ["b", "i", "a"] : h > g - g / 3 ? ["a", "i", "b"] : h > g / 2 ? ["i", "a", "b"] : ["i", "b", "a"], e.each(m, function (a, h) {
                                switch (h) {
                                    case"b":
                                        _ = c.left - 6, u = c.top - 5, f = d.get_parent(l), p = l.parent().index();
                                        break;
                                    case"i":
                                        _ = c.left - 2, u = c.top - 5 + g / 2 + 1, f = l.parent(), p = 0;
                                        break;
                                    case"a":
                                        _ = c.left - 6, u = c.top - 5 + g, f = d.get_parent(l), p = l.parent().index() + 1
                                }
                                for (v = !0, y = 0, j = o.data.nodes.length; j > y; y++)if (x = o.data.origin && o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey) ? "copy_node" : "move_node", k = p, "move_node" === x && "a" === h && o.data.origin && o.data.origin === d && f === d.get_parent(o.data.nodes[y]) && (b = d.get_node(f), k > e.inArray(o.data.nodes[y], b.children) && (k -= 1)), v = v && (d && d.settings && d.settings.dnd && d.settings.dnd.check_while_dragging === !1 || d.check(x, o.data.origin && o.data.origin !== d ? o.data.origin.get_node(o.data.nodes[y]) : o.data.nodes[y], f, k)), !v) {
                                    d && d.last_error && (i = d.last_error());
                                    break
                                }
                                return v ? ("i" === h && l.parent().is(".jstree-closed") && d.settings.dnd.open_timeout && (n = setTimeout(function (e, t) {
                                    return function () {
                                        e.open_node(t)
                                    }
                                }(d, l), d.settings.dnd.open_timeout)), r = {
                                    ins: d,
                                    par: f,
                                    pos: p
                                }, s.css({
                                    left: _ + "px",
                                    top: u + "px"
                                }).show(), o.helper.find(".jstree-icon:eq(0)").removeClass("jstree-er").addClass("jstree-ok"), i = {}, m = !0, !1) : t
                            }), m === !0))return
                    } else {
                        for (v = !0, y = 0, j = o.data.nodes.length; j > y; y++)if (v = v && d.check(o.data.origin && o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey) ? "copy_node" : "move_node", o.data.origin && o.data.origin !== d ? o.data.origin.get_node(o.data.nodes[y]) : o.data.nodes[y], "#", "last"), !v)break;
                        if (v)return r = {
                            ins: d,
                            par: "#",
                            pos: "last"
                        }, s.hide(), o.helper.find(".jstree-icon:eq(0)").removeClass("jstree-er").addClass("jstree-ok"), t
                    }
                    r = !1, o.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er"), s.hide()
                }
            }).bind("dnd_scroll.vakata", function (e, t) {
                t.data.jstree && (s.hide(), r = !1, t.helper.find(".jstree-icon:eq(0)").removeClass("jstree-ok").addClass("jstree-er"))
            }).bind("dnd_stop.vakata", function (t, a) {
                if (n && clearTimeout(n), a.data.jstree) {
                    s.hide();
                    var o, d, l = [];
                    if (r) {
                        for (o = 0, d = a.data.nodes.length; d > o; o++)l[o] = a.data.origin ? a.data.origin.get_node(a.data.nodes[o]) : a.data.nodes[o];
                        r.ins[a.data.origin && a.data.origin.settings.dnd.copy && (a.event.metaKey || a.event.ctrlKey) ? "copy_node" : "move_node"](l, r.par, r.pos)
                    } else o = e(a.event.target).closest(".jstree"), o.length && i && i.error && "check" === i.error && (o = o.jstree(!0), o && o.settings.core.error.call(this, i))
                }
            }).bind("keyup keydown", function (t, r) {
                r = e.vakata.dnd._get(), r.data && r.data.jstree && r.helper.find(".jstree-copy:eq(0)")[r.data.origin && r.data.origin.settings.dnd.copy && (t.metaKey || t.ctrlKey) ? "show" : "hide"]()
            })
        }), function (e) {
            e.fn.vakata_reverse = [].reverse;
            var r = {
                element: !1,
                is_down: !1,
                is_drag: !1,
                helper: !1,
                helper_w: 0,
                data: !1,
                init_x: 0,
                init_y: 0,
                scroll_l: 0,
                scroll_t: 0,
                scroll_e: !1,
                scroll_i: !1
            };
            e.vakata.dnd = {
                settings: {
                    scroll_speed: 10,
                    scroll_proximity: 20,
                    helper_left: 5,
                    helper_top: 10,
                    threshold: 5
                }, _trigger: function (t, r) {
                    var i = e.vakata.dnd._get();
                    i.event = r, e(document).triggerHandler("dnd_" + t + ".vakata", i)
                }, _get: function () {
                    return {data: r.data, element: r.element, helper: r.helper}
                }, _clean: function () {
                    r.helper && r.helper.remove(), r.scroll_i && (clearInterval(r.scroll_i), r.scroll_i = !1), r = {
                        element: !1,
                        is_down: !1,
                        is_drag: !1,
                        helper: !1,
                        helper_w: 0,
                        data: !1,
                        init_x: 0,
                        init_y: 0,
                        scroll_l: 0,
                        scroll_t: 0,
                        scroll_e: !1,
                        scroll_i: !1
                    }, e(document).off("mousemove touchmove", e.vakata.dnd.drag), e(document).off("mouseup touchend", e.vakata.dnd.stop)
                }, _scroll: function (t) {
                    if (!r.scroll_e || !r.scroll_l && !r.scroll_t)return r.scroll_i && (clearInterval(r.scroll_i), r.scroll_i = !1), !1;
                    if (!r.scroll_i)return r.scroll_i = setInterval(e.vakata.dnd._scroll, 100), !1;
                    if (t === !0)return !1;
                    var i = r.scroll_e.scrollTop(), n = r.scroll_e.scrollLeft();
                    r.scroll_e.scrollTop(i + r.scroll_t * e.vakata.dnd.settings.scroll_speed), r.scroll_e.scrollLeft(n + r.scroll_l * e.vakata.dnd.settings.scroll_speed), (i !== r.scroll_e.scrollTop() || n !== r.scroll_e.scrollLeft()) && e.vakata.dnd._trigger("scroll", r.scroll_e)
                }, start: function (t, i, n) {
                    "touchstart" === t.type && t.originalEvent && t.originalEvent.targetTouches && t.originalEvent.targetTouches[0] && (t.pageX = t.originalEvent.targetTouches[0].pageX, t.pageY = t.originalEvent.targetTouches[0].pageY, t.target = document.elementFromPoint(t.originalEvent.targetTouches[0].pageX - window.pageXOffset, t.originalEvent.targetTouches[0].pageY - window.pageYOffset)), r.is_drag && e.vakata.dnd.stop({});
                    try {
                        t.currentTarget.unselectable = "on", t.currentTarget.onselectstart = function () {
                            return !1
                        }, t.currentTarget.style && (t.currentTarget.style.MozUserSelect = "none")
                    } catch (s) {
                    }
                    return r.init_x = t.pageX, r.init_y = t.pageY, r.data = i, r.is_down = !0, r.element = t.currentTarget, n !== !1 && (r.helper = e("<div id='vakata-dnd'></div>").html(n).css({
                        display: "block",
                        margin: "0",
                        padding: "0",
                        position: "absolute",
                        top: "-2000px",
                        lineHeight: "16px",
                        zIndex: "10000"
                    })), e(document).bind("mousemove touchmove", e.vakata.dnd.drag), e(document).bind("mouseup touchend", e.vakata.dnd.stop), !1
                }, drag: function (i) {
                    if ("touchmove" === i.type && i.originalEvent && i.originalEvent.targetTouches && i.originalEvent.targetTouches[0] && (i.pageX = i.originalEvent.targetTouches[0].pageX, i.pageY = i.originalEvent.targetTouches[0].pageY, i.target = document.elementFromPoint(i.originalEvent.targetTouches[0].pageX - window.pageXOffset, i.originalEvent.targetTouches[0].pageY - window.pageYOffset)), r.is_down) {
                        if (!r.is_drag) {
                            if (!(Math.abs(i.pageX - r.init_x) > e.vakata.dnd.settings.threshold || Math.abs(i.pageY - r.init_y) > e.vakata.dnd.settings.threshold))return;
                            r.helper && (r.helper.appendTo("body"), r.helper_w = r.helper.outerWidth()), r.is_drag = !0, e.vakata.dnd._trigger("start", i)
                        }
                        var n = !1, s = !1, a = !1, o = !1, d = !1, l = !1, c = !1, h = !1, _ = !1, u = !1;
                        r.scroll_t = 0, r.scroll_l = 0, r.scroll_e = !1, e(i.target).parentsUntil("body").addBack().vakata_reverse().filter(function () {
                            return /^auto|scroll$/.test(e(this).css("overflow")) && (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth)
                        }).each(function () {
                            var n = e(this), s = n.offset();
                            return this.scrollHeight > this.offsetHeight && (s.top + n.height() - i.pageY < e.vakata.dnd.settings.scroll_proximity && (r.scroll_t = 1), i.pageY - s.top < e.vakata.dnd.settings.scroll_proximity && (r.scroll_t = -1)), this.scrollWidth > this.offsetWidth && (s.left + n.width() - i.pageX < e.vakata.dnd.settings.scroll_proximity && (r.scroll_l = 1), i.pageX - s.left < e.vakata.dnd.settings.scroll_proximity && (r.scroll_l = -1)), r.scroll_t || r.scroll_l ? (r.scroll_e = e(this), !1) : t
                        }), r.scroll_e || (n = e(document), s = e(window), a = n.height(), o = s.height(), d = n.width(), l = s.width(), c = n.scrollTop(), h = n.scrollLeft(), a > o && i.pageY - c < e.vakata.dnd.settings.scroll_proximity && (r.scroll_t = -1), a > o && o - (i.pageY - c) < e.vakata.dnd.settings.scroll_proximity && (r.scroll_t = 1), d > l && i.pageX - h < e.vakata.dnd.settings.scroll_proximity && (r.scroll_l = -1), d > l && l - (i.pageX - h) < e.vakata.dnd.settings.scroll_proximity && (r.scroll_l = 1), (r.scroll_t || r.scroll_l) && (r.scroll_e = n)), r.scroll_e && e.vakata.dnd._scroll(!0), r.helper && (_ = parseInt(i.pageY + e.vakata.dnd.settings.helper_top, 10), u = parseInt(i.pageX + e.vakata.dnd.settings.helper_left, 10), a && _ + 25 > a && (_ = a - 50), d && u + r.helper_w > d && (u = d - (r.helper_w + 2)), r.helper.css({
                            left: u + "px",
                            top: _ + "px"
                        })), e.vakata.dnd._trigger("move", i)
                    }
                }, stop: function (t) {
                    "touchend" === t.type && t.originalEvent && t.originalEvent.targetTouches && t.originalEvent.targetTouches[0] && (t.pageX = t.originalEvent.targetTouches[0].pageX, t.pageY = t.originalEvent.targetTouches[0].pageY, t.target = document.elementFromPoint(t.originalEvent.targetTouches[0].pageX - window.pageXOffset, t.originalEvent.targetTouches[0].pageY - window.pageYOffset)), r.is_drag && e.vakata.dnd._trigger("stop", t), e.vakata.dnd._clean()
                }
            }
        }(jQuery), e.jstree.defaults.search = {
            ajax: !1,
            fuzzy: !0,
            case_sensitive: !1,
            show_only_matches: !1,
            close_opened_onclear: !0
        }, e.jstree.plugins.search = function (t, r) {
            this.bind = function () {
                r.bind.call(this), this._data.search.str = "", this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], this._data.search.sln = null, this.settings.search.show_only_matches && this.element.on("search.jstree", function (t, r) {
                    r.nodes.length && (e(this).find("li").hide().filter(".jstree-last").filter(function () {
                        return this.nextSibling
                    }).removeClass("jstree-last"), r.nodes.parentsUntil(".jstree").addBack().show().filter("ul").each(function () {
                        e(this).children("li:visible").eq(-1).addClass("jstree-last")
                    }))
                }).on("clear_search.jstree", function (t, r) {
                    r.nodes.length && e(this).find("li").css("display", "").filter(".jstree-last").filter(function () {
                        return this.nextSibling
                    }).removeClass("jstree-last")
                })
            }, this.search = function (t, r) {
                if (t === !1 || "" === e.trim(t))return this.clear_search();
                var i = this.settings.search, n = i.ajax ? e.extend({}, i.ajax) : !1, s = null, a = [], o = [], d, l;
                if (this._data.search.res.length && this.clear_search(), !r && n !== !1)return n.data || (n.data = {}), n.data.str = t, e.ajax(n).fail(e.proxy(function () {
                    this._data.core.last_error = {
                        error: "ajax",
                        plugin: "search",
                        id: "search_01",
                        reason: "Could not load search parents",
                        data: JSON.stringify(n)
                    }, this.settings.core.error.call(this, this._data.core.last_error)
                }, this)).done(e.proxy(function (r) {
                    r && r.d && (r = r.d), this._data.search.sln = e.isArray(r) ? r : [], this._search_load(t)
                }, this));
                if (this._data.search.str = t, this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], s = new e.vakata.search(t, !0, {
                        caseSensitive: i.case_sensitive,
                        fuzzy: i.fuzzy
                    }), e.each(this._model.data, function (e, t) {
                        t.text && s.search(t.text).isMatch && (a.push(e), o = o.concat(t.parents))
                    }), a.length) {
                    for (o = e.vakata.array_unique(o), this._search_open(o), d = 0, l = a.length; l > d; d++)s = this.get_node(a[d], !0), s && (this._data.search.dom = this._data.search.dom.add(s));
                    this._data.search.res = a, this._data.search.dom.children(".jstree-anchor").addClass("jstree-search")
                }
                this.trigger("search", {nodes: this._data.search.dom, str: t, res: this._data.search.res})
            }, this.clear_search = function () {
                this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search"), this.settings.search.close_opened_onclear && this.close_node(this._data.search.opn, 0), this.trigger("clear_search", {
                    nodes: this._data.search.dom,
                    str: this._data.search.str,
                    res: this._data.search.res
                }), this._data.search.str = "", this._data.search.res = [], this._data.search.opn = [], this._data.search.dom = e()
            }, this._search_open = function (t) {
                var r = this;
                e.each(t.concat([]), function (e, i) {
                    i = document.getElementById(i), i && r.is_closed(i) && (r._data.search.opn.push(i.id), r.open_node(i, function () {
                        r._search_open(t)
                    }, 0))
                })
            }, this._search_load = function (t) {
                var r = !0, i = this, n = i._model.data;
                e.isArray(this._data.search.sln) && (this._data.search.sln.length ? (e.each(this._data.search.sln, function (s, a) {
                    n[a] && (e.vakata.array_remove_item(i._data.search.sln, a), n[a].state.loaded || (i.load_node(a, function (e, r) {
                        r && i._search_load(t)
                    }), r = !1))
                }), r && (this._data.search.sln = [], this._search_load(t))) : (this._data.search.sln = null, this.search(t, !0)))
            }
        }, function (e) {
            e.vakata.search = function (e, t, r) {
                r = r || {}, r.fuzzy !== !1 && (r.fuzzy = !0), e = r.caseSensitive ? e : e.toLowerCase();
                var i = r.location || 0, n = r.distance || 100, s = r.threshold || .6, a = e.length, o, d, l, c;
                return a > 32 && (r.fuzzy = !1), r.fuzzy && (o = 1 << a - 1, d = function () {
                    var t = {}, r = 0;
                    for (r = 0; a > r; r++)t[e.charAt(r)] = 0;
                    for (r = 0; a > r; r++)t[e.charAt(r)] |= 1 << a - r - 1;
                    return t
                }(), l = function (e, t) {
                    var r = e / a, s = Math.abs(i - t);
                    return n ? r + s / n : s ? 1 : r
                }), c = function (t) {
                    if (t = r.caseSensitive ? t : t.toLowerCase(), e === t || -1 !== t.indexOf(e))return {
                        isMatch: !0,
                        score: 0
                    };
                    if (!r.fuzzy)return {isMatch: !1, score: 1};
                    var n, c, h = t.length, _ = s, u = t.indexOf(e, i), g, f, p = a + h, m, v, y, j, x, k = 1, b = [];
                    for (-1 !== u && (_ = Math.min(l(0, u), _), u = t.lastIndexOf(e, i + a), -1 !== u && (_ = Math.min(l(0, u), _))), u = -1, n = 0; a > n; n++) {
                        g = 0, f = p;
                        while (f > g)_ >= l(n, i + f) ? g = f : p = f, f = Math.floor((p - g) / 2 + g);
                        for (p = f, v = Math.max(1, i - f + 1), y = Math.min(i + f, h) + a, j = Array(y + 2), j[y + 1] = (1 << n) - 1, c = y; c >= v; c--)if (x = d[t.charAt(c - 1)], j[c] = 0 === n ? (1 | j[c + 1] << 1) & x : (1 | j[c + 1] << 1) & x | (1 | (m[c + 1] | m[c]) << 1) | m[c + 1], j[c] & o && (k = l(n, c - 1), _ >= k)) {
                            if (_ = k, u = c - 1, b.push(u), !(u > i))break;
                            v = Math.max(1, 2 * i - u)
                        }
                        if (l(n + 1, i) > _)break;
                        m = j
                    }
                    return {isMatch: u >= 0, score: k}
                }, t === !0 ? {search: c} : c(t)
            }
        }(jQuery), e.jstree.defaults.sort = function (e, t) {
            return this.get_text(e) > this.get_text(t) ? 1 : -1
        }, e.jstree.plugins.sort = function (t, r) {
            this.bind = function () {
                r.bind.call(this), this.element.on("model.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent, !0)
                }, this)).on("rename_node.jstree create_node.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent || t.node.parent, !1), this.redraw_node(t.parent || t.node.parent, !0)
                }, this)).on("move_node.jstree copy_node.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent, !1), this.redraw_node(t.parent, !0)
                }, this))
            }, this.sort = function (t, r) {
                var i, n;
                if (t = this.get_node(t), t && t.children && t.children.length && (t.children.sort(e.proxy(this.settings.sort, this)), r))for (i = 0, n = t.children_d.length; n > i; i++)this.sort(t.children_d[i], !1)
            }
        };
        var u = !1;
        e.jstree.defaults.state = {
            key: "jstree",
            events: "changed.jstree open_node.jstree close_node.jstree",
            ttl: !1,
            filter: !1
        }, e.jstree.plugins.state = function (t, r) {
            this.bind = function () {
                r.bind.call(this);
                var t = e.proxy(function () {
                    this.element.on(this.settings.state.events, e.proxy(function () {
                        u && clearTimeout(u), u = setTimeout(e.proxy(function () {
                            this.save_state()
                        }, this), 100)
                    }, this))
                }, this);
                this.element.on("ready.jstree", e.proxy(function (e, r) {
                    this.element.one("restore_state.jstree", t), this.restore_state() || t()
                }, this))
            }, this.save_state = function () {
                var t = {state: this.get_state(), ttl: this.settings.state.ttl, sec: +new Date};
                e.vakata.storage.set(this.settings.state.key, JSON.stringify(t))
            }, this.restore_state = function () {
                var t = e.vakata.storage.get(this.settings.state.key);
                if (t)try {
                    t = JSON.parse(t)
                } catch (r) {
                    return !1
                }
                return t && t.ttl && t.sec && +new Date - t.sec > t.ttl ? !1 : (t && t.state && (t = t.state), t && e.isFunction(this.settings.state.filter) && (t = this.settings.state.filter.call(this, t)), t ? (this.element.one("set_state.jstree", function (r, i) {
                    i.instance.trigger("restore_state", {state: e.extend(!0, {}, t)})
                }), this.set_state(t), !0) : !1)
            }, this.clear_state = function () {
                return e.vakata.storage.del(this.settings.state.key)
            }
        }, function (e, t) {
            e.vakata.storage = {
                set: function (e, t) {
                    return window.localStorage.setItem(e, t)
                }, get: function (e) {
                    return window.localStorage.getItem(e)
                }, del: function (e) {
                    return window.localStorage.removeItem(e)
                }
            }
        }(jQuery), e.jstree.defaults.types = {"#": {}, "default": {}}, e.jstree.plugins.types = function (r, i) {
            this.init = function (e, r) {
                var n, s;
                if (r && r.types && r.types["default"])for (n in r.types)if ("default" !== n && "#" !== n && r.types.hasOwnProperty(n))for (s in r.types["default"])r.types["default"].hasOwnProperty(s) && r.types[n][s] === t && (r.types[n][s] = r.types["default"][s]);
                i.init.call(this, e, r), this._model.data["#"].type = "#"
            }, this.bind = function () {
                i.bind.call(this), this.element.on("model.jstree", e.proxy(function (e, r) {
                    var i = this._model.data, n = r.nodes, s = this.settings.types, a, o, d = "default";
                    for (a = 0, o = n.length; o > a; a++)d = "default", i[n[a]].original && i[n[a]].original.type && s[i[n[a]].original.type] && (d = i[n[a]].original.type), i[n[a]].data && i[n[a]].data.jstree && i[n[a]].data.jstree.type && s[i[n[a]].data.jstree.type] && (d = i[n[a]].data.jstree.type), i[n[a]].type = d, i[n[a]].icon === !0 && s[d].icon !== t && (i[n[a]].icon = s[d].icon)
                }, this))
            }, this.get_json = function (t, r, n) {
                var s, a, o = this._model.data, d = r ? e.extend(!0, {}, r, {no_id: !1}) : {}, l = i.get_json.call(this, t, d, n);
                if (l === !1)return !1;
                if (e.isArray(l))for (s = 0, a = l.length; a > s; s++)l[s].type = l[s].id && o[l[s].id] && o[l[s].id].type ? o[l[s].id].type : "default", r && r.no_id && (delete l[s].id, l[s].li_attr && l[s].li_attr.id && delete l[s].li_attr.id); else l.type = l.id && o[l.id] && o[l.id].type ? o[l.id].type : "default", r && r.no_id && (l = this._delete_ids(l));
                return l
            }, this._delete_ids = function (t) {
                if (e.isArray(t)) {
                    for (var r = 0, i = t.length; i > r; r++)t[r] = this._delete_ids(t[r]);
                    return t
                }
                return delete t.id, t.li_attr && t.li_attr.id && delete t.li_attr.id, t.children && e.isArray(t.children) && (t.children = this._delete_ids(t.children)), t
            }, this.check = function (r, n, s, a) {
                if (i.check.call(this, r, n, s, a) === !1)return !1;
                n = n && n.id ? n : this.get_node(n), s = s && s.id ? s : this.get_node(s);
                var o = n && n.id ? e.jstree.reference(n.id) : null, d, l, c, h;
                switch (o = o && o._model && o._model.data ? o._model.data : null, r) {
                    case"create_node":
                    case"move_node":
                    case"copy_node":
                        if ("move_node" !== r || -1 === e.inArray(n.id, s.children)) {
                            if (d = this.get_rules(s), d.max_children !== t && -1 !== d.max_children && d.max_children === s.children.length)return this._data.core.last_error = {
                                error: "check",
                                plugin: "types",
                                id: "types_01",
                                reason: "max_children prevents function: " + r,
                                data: JSON.stringify({
                                    chk: r,
                                    pos: a,
                                    obj: n && n.id ? n.id : !1,
                                    par: s && s.id ? s.id : !1
                                })
                            }, !1;
                            if (d.valid_children !== t && -1 !== d.valid_children && -1 === e.inArray(n.type, d.valid_children))return this._data.core.last_error = {
                                error: "check",
                                plugin: "types",
                                id: "types_02",
                                reason: "valid_children prevents function: " + r,
                                data: JSON.stringify({
                                    chk: r,
                                    pos: a,
                                    obj: n && n.id ? n.id : !1,
                                    par: s && s.id ? s.id : !1
                                })
                            }, !1;
                            if (o && n.children_d && n.parents) {
                                for (l = 0, c = 0, h = n.children_d.length; h > c; c++)l = Math.max(l, o[n.children_d[c]].parents.length);
                                l = l - n.parents.length + 1
                            }
                            (0 >= l || l === t) && (l = 1);
                            do {
                                if (d.max_depth !== t && -1 !== d.max_depth && l > d.max_depth)return this._data.core.last_error = {
                                    error: "check",
                                    plugin: "types",
                                    id: "types_03",
                                    reason: "max_depth prevents function: " + r,
                                    data: JSON.stringify({
                                        chk: r,
                                        pos: a,
                                        obj: n && n.id ? n.id : !1,
                                        par: s && s.id ? s.id : !1
                                    })
                                }, !1;
                                s = this.get_node(s.parent), d = this.get_rules(s), l++
                            } while (s)
                        }
                }
                return !0
            }, this.get_rules = function (e) {
                if (e = this.get_node(e), !e)return !1;
                var r = this.get_type(e, !0);
                return r.max_depth === t && (r.max_depth = -1), r.max_children === t && (r.max_children = -1), r.valid_children === t && (r.valid_children = -1), r
            }, this.get_type = function (t, r) {
                return t = this.get_node(t), t ? r ? e.extend({type: t.type}, this.settings.types[t.type]) : t.type : !1
            }, this.set_type = function (r, i) {
                var n, s, a, o, d;
                if (e.isArray(r)) {
                    for (r = r.slice(), s = 0, a = r.length; a > s; s++)this.set_type(r[s], i);
                    return !0
                }
                return n = this.settings.types, r = this.get_node(r), n[i] && r ? (o = r.type, d = this.get_icon(r), r.type = i, (d === !0 || n[o] && n[o].icon && d === n[o].icon) && this.set_icon(r, n[i].icon !== t ? n[i].icon : !0), !0) : !1
            }
        }, e.jstree.plugins.unique = function (t, r) {
            this.check = function (t, i, n, s) {
                if (r.check.call(this, t, i, n, s) === !1)return !1;
                if (i = i && i.id ? i : this.get_node(i), n = n && n.id ? n : this.get_node(n), !n || !n.children)return !0;
                var a = "rename_node" === t ? s : i.text, o = [], d = this._model.data, l, c;
                for (l = 0, c = n.children.length; c > l; l++)o.push(d[n.children[l]].text);
                switch (t) {
                    case"delete_node":
                        return !0;
                    case"rename_node":
                    case"copy_node":
                        return l = -1 === e.inArray(a, o), l || (this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_01",
                            reason: "Child with name " + a + " already exists. Preventing: " + t,
                            data: JSON.stringify({
                                chk: t,
                                pos: s,
                                obj: i && i.id ? i.id : !1,
                                par: n && n.id ? n.id : !1
                            })
                        }), l;
                    case"move_node":
                        return l = i.parent === n.id || -1 === e.inArray(a, o), l || (this._data.core.last_error = {
                            error: "check",
                            plugin: "unique",
                            id: "unique_01",
                            reason: "Child with name " + a + " already exists. Preventing: " + t,
                            data: JSON.stringify({
                                chk: t,
                                pos: s,
                                obj: i && i.id ? i.id : !1,
                                par: n && n.id ? n.id : !1
                            })
                        }), l
                }
                return !0
            }
        };
        var g = document.createElement("DIV");
        g.setAttribute("unselectable", "on"), g.className = "jstree-wholerow", g.innerHTML = "&#160;", e.jstree.plugins.wholerow = function (t, r) {
            this.bind = function () {
                r.bind.call(this), this.element.on("loading", e.proxy(function () {
                    g.style.height = this._data.core.li_height + "px"
                }, this)).on("ready.jstree set_state.jstree", e.proxy(function () {
                    this.hide_dots()
                }, this)).on("ready.jstree", e.proxy(function () {
                    this.get_container_ul().addClass("jstree-wholerow-ul")
                }, this)).on("deselect_all.jstree", e.proxy(function (e, t) {
                    this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked")
                }, this)).on("changed.jstree", e.proxy(function (e, t) {
                    this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
                    var r = !1, i, n;
                    for (i = 0, n = t.selected.length; n > i; i++)r = this.get_node(t.selected[i], !0), r && r.length && r.children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                }, this)).on("open_node.jstree", e.proxy(function (e, t) {
                    this.get_node(t.node, !0).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                }, this)).on("hover_node.jstree dehover_node.jstree", e.proxy(function (e, t) {
                    this.get_node(t.node, !0).children(".jstree-wholerow")["hover_node" === e.type ? "addClass" : "removeClass"]("jstree-wholerow-hovered")
                }, this)).on("contextmenu.jstree", ".jstree-wholerow", e.proxy(function (t) {
                    t.preventDefault(), e(t.currentTarget).closest("li").children("a:eq(0)").trigger("contextmenu", t)
                }, this)).on("click.jstree", ".jstree-wholerow", function (t) {
                    t.stopImmediatePropagation();
                    var r = e.Event("click", {
                        metaKey: t.metaKey,
                        ctrlKey: t.ctrlKey,
                        altKey: t.altKey,
                        shiftKey: t.shiftKey
                    });
                    e(t.currentTarget).closest("li").children("a:eq(0)").trigger(r).focus()
                }).on("click.jstree", ".jstree-leaf > .jstree-ocl", e.proxy(function (t) {
                    t.stopImmediatePropagation();
                    var r = e.Event("click", {
                        metaKey: t.metaKey,
                        ctrlKey: t.ctrlKey,
                        altKey: t.altKey,
                        shiftKey: t.shiftKey
                    });
                    e(t.currentTarget).closest("li").children("a:eq(0)").trigger(r).focus()
                }, this)).on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", e.proxy(function (e) {
                    return e.stopImmediatePropagation(), this.hover_node(e.currentTarget), !1
                }, this)).on("mouseleave.jstree", ".jstree-node", e.proxy(function (e) {
                    this.dehover_node(e.currentTarget)
                }, this))
            }, this.teardown = function () {
                this.settings.wholerow && this.element.find(".jstree-wholerow").remove(), r.teardown.call(this)
            }, this.redraw_node = function (t, i, n) {
                if (t = r.redraw_node.call(this, t, i, n)) {
                    var s = g.cloneNode(!0);
                    -1 !== e.inArray(t.id, this._data.core.selected) && (s.className += " jstree-wholerow-clicked"), t.insertBefore(s, t.childNodes[0])
                }
                return t
            }
        }
    }
});