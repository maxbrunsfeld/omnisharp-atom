"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenericSelectListView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _atomSpacePenViews = require("atom-space-pen-views");

var spacePen = _interopRequireWildcard(_atomSpacePenViews);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _rxjs = require("rxjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericSelectListView = exports.GenericSelectListView = function (_spacePen$SelectListV) {
    _inherits(GenericSelectListView, _spacePen$SelectListV);

    function GenericSelectListView(messageText, _items, onConfirm, onCancel) {
        _classCallCheck(this, GenericSelectListView);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GenericSelectListView).call(this));

        _this.messageText = messageText;
        _this._items = _items;
        _this.onConfirm = onConfirm;
        _this.onCancel = onCancel;
        _this._onClosed = new _rxjs.AsyncSubject();
        _this.keyBindings = null;
        return _this;
    }

    _createClass(GenericSelectListView, [{
        key: "initialize",
        value: function initialize() {
            spacePen.SelectListView.prototype.initialize.call(this);
            this.addClass("generic-list");
            this.message.text(this.messageText);
            return false;
        }
    }, {
        key: "getFilterKey",
        value: function getFilterKey() {
            return "displayName";
        }
    }, {
        key: "cancelled",
        value: function cancelled() {
            this.onCancel();
            return this.hide();
        }
    }, {
        key: "toggle",
        value: function toggle() {
            if (this.panel && this.panel.isVisible()) {
                this.cancel();
            } else {
                this.show();
            }
        }
    }, {
        key: "show",
        value: function show() {
            if (this.panel == null) {
                this.panel = atom.workspace.addModalPanel({ item: this });
            }
            this.panel.show();
            this.storeFocusedElement();
            if (this.previouslyFocusedElement[0] && this.previouslyFocusedElement[0] !== document.body) {
                this.eventElement = this.previouslyFocusedElement[0];
            } else {
                this.eventElement = atom.views.getView(atom.workspace);
            }
            this.keyBindings = atom.keymaps.findKeyBindings({
                target: this.eventElement
            });
            var commands = _lodash2.default.sortBy(this._items, function (x) {
                return x.displayName;
            });
            this.setItems(commands);
            this.focusFilterEditor();
        }
    }, {
        key: "hide",
        value: function hide() {
            this._onClosed.next(true);
            this._onClosed.complete();
            if (this.panel) {
                this.panel.hide();
            }
            this.panel.destroy();
            this.panel = null;
        }
    }, {
        key: "viewForItem",
        value: function viewForItem(item) {
            return spacePen.$$(function () {
                var _this2 = this;

                return this.li({
                    "class": "event",
                    "data-event-name": item.name
                }, function () {
                    return _this2.span(item.displayName, {
                        title: item.name
                    });
                });
            });
        }
    }, {
        key: "confirmed",
        value: function confirmed(item) {
            this.onConfirm(item.name);
            this.cancel();
            return null;
        }
    }, {
        key: "onClosed",
        get: function get() {
            return this._onClosed;
        }
    }], [{
        key: "content",
        value: function content() {
            var _this3 = this;

            return this.div({}, function () {
                _this3.p({
                    outlet: "message"
                }, "");
                spacePen.SelectListView.content.call(_this3);
            });
        }
    }]);

    return GenericSelectListView;
}(spacePen.SelectListView);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi92aWV3cy9nZW5lcmljLWxpc3Qtdmlldy5qcyIsImxpYi92aWV3cy9nZW5lcmljLWxpc3Qtdmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7SUNBWSxROztBRENaOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQ0VBLHFCLFdBQUEscUI7OztBQW1CSSxtQ0FBb0IsV0FBcEIsRUFBZ0QsTUFBaEQsRUFBeUcsU0FBekcsRUFBa0osUUFBbEosRUFBc0s7QUFBQTs7QUFBQTs7QUFBbEosY0FBQSxXQUFBLEdBQUEsV0FBQTtBQUE0QixjQUFBLE1BQUEsR0FBQSxNQUFBO0FBQXlELGNBQUEsU0FBQSxHQUFBLFNBQUE7QUFBeUMsY0FBQSxRQUFBLEdBQUEsUUFBQTtBQUwxSSxjQUFBLFNBQUEsR0FBWSx3QkFBWjtBQVNELGNBQUEsV0FBQSxHQUFtQixJQUFuQjtBQUorSjtBQUVySzs7OztxQ0FJZ0I7QUFDUCxxQkFBUyxjQUFULENBQXlCLFNBQXpCLENBQW1DLFVBQW5DLENBQThDLElBQTlDLENBQW1ELElBQW5EO0FBQ04saUJBQUssUUFBTCxDQUFjLGNBQWQ7QUFDQSxpQkFBSyxPQUFMLENBQWEsSUFBYixDQUFrQixLQUFLLFdBQXZCO0FBRUEsbUJBQU8sS0FBUDtBQUNIOzs7dUNBRWtCO0FBQ2YsbUJBQU8sYUFBUDtBQUNIOzs7b0NBRWU7QUFDWixpQkFBSyxRQUFMO0FBQ0EsbUJBQU8sS0FBSyxJQUFMLEVBQVA7QUFDSDs7O2lDQUVZO0FBQ1QsZ0JBQUksS0FBSyxLQUFMLElBQWMsS0FBSyxLQUFMLENBQVcsU0FBWCxFQUFsQixFQUEwQztBQUN0QyxxQkFBSyxNQUFMO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssSUFBTDtBQUNIO0FBQ0o7OzsrQkFFVTtBQUNQLGdCQUFJLEtBQUssS0FBTCxJQUFjLElBQWxCLEVBQXdCO0FBQ3BCLHFCQUFLLEtBQUwsR0FBYSxLQUFLLFNBQUwsQ0FBZSxhQUFmLENBQTZCLEVBQUUsTUFBTSxJQUFSLEVBQTdCLENBQWI7QUFDSDtBQUNELGlCQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ0EsaUJBQUssbUJBQUw7QUFFQSxnQkFBSSxLQUFLLHdCQUFMLENBQThCLENBQTlCLEtBQW9DLEtBQUssd0JBQUwsQ0FBOEIsQ0FBOUIsTUFBcUMsU0FBUyxJQUF0RixFQUE0RjtBQUN4RixxQkFBSyxZQUFMLEdBQW9CLEtBQUssd0JBQUwsQ0FBOEIsQ0FBOUIsQ0FBcEI7QUFDSCxhQUZELE1BRU87QUFDSCxxQkFBSyxZQUFMLEdBQW9CLEtBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsS0FBSyxTQUF4QixDQUFwQjtBQUNIO0FBRUQsaUJBQUssV0FBTCxHQUFtQixLQUFLLE9BQUwsQ0FBYSxlQUFiLENBQTZCO0FBQzVDLHdCQUFRLEtBQUs7QUFEK0IsYUFBN0IsQ0FBbkI7QUFLQSxnQkFBTSxXQUFXLGlCQUFFLE1BQUYsQ0FBUyxLQUFLLE1BQWQsRUFBc0I7QUFBQSx1QkFBSyxFQUFFLFdBQVA7QUFBQSxhQUF0QixDQUFqQjtBQUNBLGlCQUFLLFFBQUwsQ0FBYyxRQUFkO0FBQ0EsaUJBQUssaUJBQUw7QUFDSDs7OytCQUVVO0FBQ1AsaUJBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEI7QUFDQSxpQkFBSyxTQUFMLENBQWUsUUFBZjtBQUVBLGdCQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNaLHFCQUFLLEtBQUwsQ0FBVyxJQUFYO0FBQ0g7QUFDRCxpQkFBSyxLQUFMLENBQVcsT0FBWDtBQUNBLGlCQUFLLEtBQUwsR0FBYSxJQUFiO0FBQ0g7OztvQ0FFa0IsSSxFQUE0QztBQUMzRCxtQkFBTyxTQUFTLEVBQVQsQ0FBWSxZQUFBO0FBQUE7O0FBQ2YsdUJBQU8sS0FBSyxFQUFMLENBQVE7QUFDWCw2QkFBUyxPQURFO0FBRVgsdUNBQW1CLEtBQUs7QUFGYixpQkFBUixFQUdKLFlBQUE7QUFDQywyQkFBTyxPQUFLLElBQUwsQ0FBVSxLQUFLLFdBQWYsRUFBNEI7QUFDL0IsK0JBQU8sS0FBSztBQURtQixxQkFBNUIsQ0FBUDtBQUdILGlCQVBNLENBQVA7QUFRSCxhQVRNLENBQVA7QUFVSDs7O2tDQUVnQixJLEVBQVU7QUFDdkIsaUJBQUssU0FBTCxDQUFlLEtBQUssSUFBcEI7QUFDQSxpQkFBSyxNQUFMO0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7NEJBdkZrQjtBQUFLLG1CQUFPLEtBQUssU0FBWjtBQUF3Qjs7O2tDQWQzQjtBQUFBOztBQUNqQixtQkFBTyxLQUFLLEdBQUwsQ0FBUyxFQUFULEVBQWEsWUFBQTtBQUNoQix1QkFBSyxDQUFMLENBQU87QUFDSCw0QkFBUTtBQURMLGlCQUFQLEVBRUcsRUFGSDtBQUlNLHlCQUFTLGNBQVQsQ0FBeUIsT0FBekIsQ0FBaUMsSUFBakM7QUFDVCxhQU5NLENBQVA7QUFPSDs7OztFQVRzQyxTQUFTLGMiLCJmaWxlIjoibGliL3ZpZXdzL2dlbmVyaWMtbGlzdC12aWV3LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc3BhY2VQZW4gZnJvbSBcImF0b20tc3BhY2UtcGVuLXZpZXdzXCI7XG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyBBc3luY1N1YmplY3QgfSBmcm9tIFwicnhqc1wiO1xuZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWxlY3RMaXN0VmlldyBleHRlbmRzIHNwYWNlUGVuLlNlbGVjdExpc3RWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlVGV4dCwgX2l0ZW1zLCBvbkNvbmZpcm0sIG9uQ2FuY2VsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZVRleHQgPSBtZXNzYWdlVGV4dDtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBfaXRlbXM7XG4gICAgICAgIHRoaXMub25Db25maXJtID0gb25Db25maXJtO1xuICAgICAgICB0aGlzLm9uQ2FuY2VsID0gb25DYW5jZWw7XG4gICAgICAgIHRoaXMuX29uQ2xvc2VkID0gbmV3IEFzeW5jU3ViamVjdCgpO1xuICAgICAgICB0aGlzLmtleUJpbmRpbmdzID0gbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIGNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpdih7fSwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wKHtcbiAgICAgICAgICAgICAgICBvdXRsZXQ6IFwibWVzc2FnZVwiXG4gICAgICAgICAgICB9LCBcIlwiKTtcbiAgICAgICAgICAgIHNwYWNlUGVuLlNlbGVjdExpc3RWaWV3LmNvbnRlbnQuY2FsbCh0aGlzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldCBvbkNsb3NlZCgpIHsgcmV0dXJuIHRoaXMuX29uQ2xvc2VkOyB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgc3BhY2VQZW4uU2VsZWN0TGlzdFZpZXcucHJvdG90eXBlLmluaXRpYWxpemUuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRDbGFzcyhcImdlbmVyaWMtbGlzdFwiKTtcbiAgICAgICAgdGhpcy5tZXNzYWdlLnRleHQodGhpcy5tZXNzYWdlVGV4dCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0RmlsdGVyS2V5KCkge1xuICAgICAgICByZXR1cm4gXCJkaXNwbGF5TmFtZVwiO1xuICAgIH1cbiAgICBjYW5jZWxsZWQoKSB7XG4gICAgICAgIHRoaXMub25DYW5jZWwoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsICYmIHRoaXMucGFuZWwuaXNWaXNpYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaG93KCkge1xuICAgICAgICBpZiAodGhpcy5wYW5lbCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsID0gYXRvbS53b3Jrc3BhY2UuYWRkTW9kYWxQYW5lbCh7IGl0ZW06IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYW5lbC5zaG93KCk7XG4gICAgICAgIHRoaXMuc3RvcmVGb2N1c2VkRWxlbWVudCgpO1xuICAgICAgICBpZiAodGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnRbMF0gJiYgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnRbMF0gIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbGVtZW50ID0gdGhpcy5wcmV2aW91c2x5Rm9jdXNlZEVsZW1lbnRbMF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50RWxlbWVudCA9IGF0b20udmlld3MuZ2V0VmlldyhhdG9tLndvcmtzcGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXlCaW5kaW5ncyA9IGF0b20ua2V5bWFwcy5maW5kS2V5QmluZGluZ3Moe1xuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmV2ZW50RWxlbWVudFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY29tbWFuZHMgPSBfLnNvcnRCeSh0aGlzLl9pdGVtcywgeCA9PiB4LmRpc3BsYXlOYW1lKTtcbiAgICAgICAgdGhpcy5zZXRJdGVtcyhjb21tYW5kcyk7XG4gICAgICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKTtcbiAgICB9XG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5fb25DbG9zZWQubmV4dCh0cnVlKTtcbiAgICAgICAgdGhpcy5fb25DbG9zZWQuY29tcGxldGUoKTtcbiAgICAgICAgaWYgKHRoaXMucGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFuZWwuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLnBhbmVsID0gbnVsbDtcbiAgICB9XG4gICAgdmlld0Zvckl0ZW0oaXRlbSkge1xuICAgICAgICByZXR1cm4gc3BhY2VQZW4uJCQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGkoe1xuICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJldmVudFwiLFxuICAgICAgICAgICAgICAgIFwiZGF0YS1ldmVudC1uYW1lXCI6IGl0ZW0ubmFtZVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYW4oaXRlbS5kaXNwbGF5TmFtZSwge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS5uYW1lXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbmZpcm1lZChpdGVtKSB7XG4gICAgICAgIHRoaXMub25Db25maXJtKGl0ZW0ubmFtZSk7XG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIHNwYWNlUGVuIGZyb20gXCJhdG9tLXNwYWNlLXBlbi12aWV3c1wiO1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7QXN5bmNTdWJqZWN0fSBmcm9tIFwicnhqc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdlbmVyaWNTZWxlY3RMaXN0VmlldyBleHRlbmRzIHNwYWNlUGVuLlNlbGVjdExpc3RWaWV3IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29udGVudCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXYoe30sICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wKHtcclxuICAgICAgICAgICAgICAgIG91dGxldDogXCJtZXNzYWdlXCJcclxuICAgICAgICAgICAgfSwgXCJcIik7XHJcblxyXG4gICAgICAgICAgICAoPGFueT5zcGFjZVBlbi5TZWxlY3RMaXN0VmlldykuY29udGVudC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGFuZWw6IEF0b20uUGFuZWw7XHJcbiAgICBwcml2YXRlIHByZXZpb3VzbHlGb2N1c2VkRWxlbWVudDogTm9kZTtcclxuICAgIHByaXZhdGUgZXZlbnRFbGVtZW50OiBhbnk7XHJcbiAgICBwcml2YXRlIF9vbkNsb3NlZCA9IG5ldyBBc3luY1N1YmplY3Q8Ym9vbGVhbj4oKTtcclxuICAgIHB1YmxpYyBnZXQgb25DbG9zZWQoKSB7IHJldHVybiB0aGlzLl9vbkNsb3NlZDsgfVxyXG5cclxuICAgIHB1YmxpYyBtZXNzYWdlOiBKUXVlcnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBtZXNzYWdlVGV4dDogc3RyaW5nLCBwdWJsaWMgX2l0ZW1zOiB7IGRpc3BsYXlOYW1lOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgfVtdLCBwdWJsaWMgb25Db25maXJtOiAocmVzdWx0OiBhbnkpID0+IHZvaWQsIHB1YmxpYyBvbkNhbmNlbDogKCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtleUJpbmRpbmdzOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBpbml0aWFsaXplKCkge1xyXG4gICAgICAgICg8YW55PnNwYWNlUGVuLlNlbGVjdExpc3RWaWV3KS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoXCJnZW5lcmljLWxpc3RcIik7XHJcbiAgICAgICAgdGhpcy5tZXNzYWdlLnRleHQodGhpcy5tZXNzYWdlVGV4dCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RmlsdGVyS2V5KCkge1xyXG4gICAgICAgIHJldHVybiBcImRpc3BsYXlOYW1lXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhbmNlbGxlZCgpIHtcclxuICAgICAgICB0aGlzLm9uQ2FuY2VsKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b2dnbGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFuZWwgJiYgdGhpcy5wYW5lbC5pc1Zpc2libGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbmNlbCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpIHtcclxuICAgICAgICBpZiAodGhpcy5wYW5lbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwgPSBhdG9tLndvcmtzcGFjZS5hZGRNb2RhbFBhbmVsKHsgaXRlbTogdGhpcyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYW5lbC5zaG93KCk7XHJcbiAgICAgICAgdGhpcy5zdG9yZUZvY3VzZWRFbGVtZW50KCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudFswXSAmJiB0aGlzLnByZXZpb3VzbHlGb2N1c2VkRWxlbWVudFswXSAhPT0gZG9jdW1lbnQuYm9keSkge1xyXG4gICAgICAgICAgICB0aGlzLmV2ZW50RWxlbWVudCA9IHRoaXMucHJldmlvdXNseUZvY3VzZWRFbGVtZW50WzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRFbGVtZW50ID0gYXRvbS52aWV3cy5nZXRWaWV3KGF0b20ud29ya3NwYWNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMua2V5QmluZGluZ3MgPSBhdG9tLmtleW1hcHMuZmluZEtleUJpbmRpbmdzKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLmV2ZW50RWxlbWVudFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBpbmZlciB0aGUgZ2VuZXJhdG9yIHNvbWVob3c/IGJhc2VkIG9uIHRoZSBwcm9qZWN0IGluZm9ybWF0aW9uPyAgc3RvcmUgaW4gdGhlIHByb2plY3Qgc3lzdGVtPz9cclxuICAgICAgICBjb25zdCBjb21tYW5kcyA9IF8uc29ydEJ5KHRoaXMuX2l0ZW1zLCB4ID0+IHguZGlzcGxheU5hbWUpO1xyXG4gICAgICAgIHRoaXMuc2V0SXRlbXMoY29tbWFuZHMpO1xyXG4gICAgICAgIHRoaXMuZm9jdXNGaWx0ZXJFZGl0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZSgpIHtcclxuICAgICAgICB0aGlzLl9vbkNsb3NlZC5uZXh0KHRydWUpO1xyXG4gICAgICAgIHRoaXMuX29uQ2xvc2VkLmNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhbmVsKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZWwuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhbmVsLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLnBhbmVsID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld0Zvckl0ZW0oaXRlbTogeyBkaXNwbGF5TmFtZTogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IH0pIHtcclxuICAgICAgICByZXR1cm4gc3BhY2VQZW4uJCQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpKHtcclxuICAgICAgICAgICAgICAgIFwiY2xhc3NcIjogXCJldmVudFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRhLWV2ZW50LW5hbWVcIjogaXRlbS5uYW1lXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNwYW4oaXRlbS5kaXNwbGF5TmFtZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLm5hbWVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlybWVkKGl0ZW0/OiBhbnkpOiBzcGFjZVBlbi5WaWV3IHtcclxuICAgICAgICB0aGlzLm9uQ29uZmlybShpdGVtLm5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2FuY2VsKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
