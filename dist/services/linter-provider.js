"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.registerIndie = registerIndie;

var _omni = require("../server/omni");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _omnisharpClient = require("omnisharp-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Range = require("atom").Range;

function mapIndieValues(error) {
    var level = error.LogLevel.toLowerCase();
    return {
        type: level,
        text: error.Text + " [" + _omni.Omni.getFrameworks(error.Projects) + "] ",
        filePath: error.FileName,
        range: new Range([error.Line, error.Column], [error.EndLine, error.EndColumn])
    };
}
function showLinter() {
    _lodash2.default.each(document.querySelectorAll("linter-bottom-tab"), function (element) {
        element.style.display = "";
    });
    _lodash2.default.each(document.querySelectorAll("linter-bottom-status"), function (element) {
        element.style.display = "";
    });
    var panel = document.querySelector("linter-panel");
    if (panel) panel.style.display = "";
}
function hideLinter() {
    _lodash2.default.each(document.querySelectorAll("linter-bottom-tab"), function (element) {
        element.style.display = "none";
    });
    _lodash2.default.each(document.querySelectorAll("linter-bottom-status"), function (element) {
        element.style.display = "none";
    });
    var panel = document.querySelector("linter-panel");
    if (panel) panel.style.display = "none";
}
var showHiddenDiagnostics = true;
function init(linter) {
    var disposable = new _omnisharpClient.CompositeDisposable();
    var cd = void 0;
    disposable.add(atom.config.observe("omnisharp-atom.hideLinterInterface", function (hidden) {
        if (hidden) {
            cd = new _omnisharpClient.CompositeDisposable();
            disposable.add(cd);
            cd.add(_omni.Omni.activeEditor.filter(function (z) {
                return !z;
            }).subscribe(showLinter));
            cd.add(_omni.Omni.activeEditor.filter(function (z) {
                return !!z;
            }).subscribe(hideLinter));
        } else {
            if (cd) {
                disposable.remove(cd);
                cd.dispose();
            }
            showLinter();
        }
    }));
    disposable.add(atom.config.observe("omnisharp-atom.showHiddenDiagnostics", function (show) {
        showHiddenDiagnostics = show;
        atom.workspace.getTextEditors().forEach(function (editor) {
            var editorLinter = linter.getEditorLinter(editor);
            if (editorLinter) {
                editorLinter.lint(true);
            }
        });
    }));
    disposable.add(_omni.Omni.activeEditor.filter(function (z) {
        return !!z;
    }).take(1).delay(1000).subscribe(function (e) {
        _omni.Omni.whenEditorConnected(e).subscribe(function () {
            atom.workspace.getTextEditors().forEach(function (editor) {
                var editorLinter = linter.getEditorLinter(editor);
                if (editorLinter) {
                    editorLinter.lint(true);
                }
            });
        });
    }));
    return disposable;
}
function registerIndie(registry, disposable) {
    var linter = registry.register({ name: "c#" });
    disposable.add(linter, _omni.Omni.diagnostics.subscribe(function (diagnostics) {
        var messages = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = diagnostics[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (showHiddenDiagnostics || item.LogLevel !== "Hidden") {
                    messages.push(mapIndieValues(item));
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        linter.setMessages(messages);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9saW50ZXItcHJvdmlkZXIudHMiLCJsaWIvc2VydmljZXMvbGludGVyLXByb3ZpZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O1FBMERBLEksR0FBQSxJO1FBa0RBLGEsR0FBQSxhOztBQzVHQTs7QUFFQTs7OztBQUNBOzs7O0FEQUEsSUFBTSxRQUFRLFFBQVEsTUFBUixFQUFnQixLQUE5Qjs7QUEwQkEsU0FBQSxjQUFBLENBQXdCLEtBQXhCLEVBQXdEO0FBQ3BELFFBQU0sUUFBUSxNQUFNLFFBQU4sQ0FBZSxXQUFmLEVBQWQ7QUFFQSxXQUFPO0FBQ0gsY0FBTSxLQURIO0FBRUgsY0FBUyxNQUFNLElBQWYsVUFBd0IsV0FBSyxhQUFMLENBQW1CLE1BQU0sUUFBekIsQ0FBeEIsT0FGRztBQUdILGtCQUFVLE1BQU0sUUFIYjtBQUlILGVBQU8sSUFBSSxLQUFKLENBQVUsQ0FBQyxNQUFNLElBQVAsRUFBYSxNQUFNLE1BQW5CLENBQVYsRUFBc0MsQ0FBQyxNQUFNLE9BQVAsRUFBZ0IsTUFBTSxTQUF0QixDQUF0QztBQUpKLEtBQVA7QUFNSDtBQUVELFNBQUEsVUFBQSxHQUFBO0FBQ0kscUJBQUUsSUFBRixDQUFPLFNBQVMsZ0JBQVQsQ0FBMEIsbUJBQTFCLENBQVAsRUFBdUQsVUFBQyxPQUFELEVBQXFCO0FBQU8sZ0JBQVEsS0FBUixDQUFjLE9BQWQsR0FBd0IsRUFBeEI7QUFBNkIsS0FBaEg7QUFDQSxxQkFBRSxJQUFGLENBQU8sU0FBUyxnQkFBVCxDQUEwQixzQkFBMUIsQ0FBUCxFQUEwRCxVQUFDLE9BQUQsRUFBcUI7QUFBTyxnQkFBUSxLQUFSLENBQWMsT0FBZCxHQUF3QixFQUF4QjtBQUE2QixLQUFuSDtBQUNBLFFBQU0sUUFBcUIsU0FBUyxhQUFULENBQXVCLGNBQXZCLENBQTNCO0FBQ0EsUUFBSSxLQUFKLEVBQ0ksTUFBTSxLQUFOLENBQVksT0FBWixHQUFzQixFQUF0QjtBQUNQO0FBRUQsU0FBQSxVQUFBLEdB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QUVsQixpQ0FBaUIsV0FBakIsOEhBQThCO0FBQUEsb0JBQXJCLElBQXFCOztBQUMxQixvQkFBSSx5QkFBeUIsS0FBSyxRQUFMLEtBQWtCLFFBQS9DLEVBQXlEO0FBQ3JELDZCQUFTLElBQVQsQ0FBYyxlQUFlLElBQWYsQ0FBZDtBQUNIO0FBQ0o7QUFOaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFRbEIsZUFBTyxXQUFQLENBQW1CLFFBQW5CO0FBQ0gsS0FWTCxDQUZKO0FBY0giLCJmaWxlIjoibGliL3NlcnZpY2VzL2xpbnRlci1wcm92aWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kZWxzfSBmcm9tIFwib21uaXNoYXJwLWNsaWVudFwiO1xyXG5pbXBvcnQge09tbml9IGZyb20gXCIuLi9zZXJ2ZXIvb21uaVwiO1xyXG4vKiB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lICovXHJcbmNvbnN0IFJhbmdlID0gcmVxdWlyZShcImF0b21cIikuUmFuZ2U7XHJcbi8qIHRzbGludDplbmFibGU6dmFyaWFibGUtbmFtZSAqL1xyXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCB7Q29tcG9zaXRlRGlzcG9zYWJsZX0gZnJvbSBcIm9tbmlzaGFycC1jbGllbnRcIjtcclxuXHJcbmludGVyZmFjZSBMaW50ZXJNZXNzYWdlIHtcclxuICAgIHR5cGU6IHN0cmluZzsgLy8gXCJlcnJvclwiIHwgXCJ3YXJuaW5nXCJcclxuICAgIHRleHQ/OiBzdHJpbmc7XHJcbiAgICBodG1sPzogc3RyaW5nO1xyXG4gICAgZmlsZVBhdGg/OiBzdHJpbmc7XHJcbiAgICByYW5nZT86IFJhbmdlO1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgSW5kaWVSZWdpc3RyeSB7XHJcbiAgICByZWdpc3RlcihvcHRpb25zOiB7IG5hbWU6IHN0cmluZzsgfSk6IEluZGllO1xyXG4gICAgaGFzKGluZGllOiBhbnkpOiBCb29sZWFuO1xyXG4gICAgdW5yZWdpc3RlcihpbmRpZTogYW55KTogdm9pZDtcclxufVxyXG5cclxuaW50ZXJmYWNlIEluZGllIHtcclxuICAgIHNldE1lc3NhZ2VzKG1lc3NhZ2VzOiBMaW50ZXJNZXNzYWdlW10pOiB2b2lkO1xyXG4gICAgZGVsZXRlTWVzc2FnZXMoKTogdm9pZDtcclxuICAgIGRpc3Bvc2UoKTogdm9pZDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFwSW5kaWVWYWx1ZXMoZXJyb3I6IE1vZGVscy5EaWFnbm9zdGljTG9jYXRpb24pOiBMaW50ZXJNZXNzYWdlIHtcclxuICAgIGNvbnN0IGxldmVsID0gZXJyb3IuTG9nTGV2ZWwudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IGxldmVsLFxyXG4gICAgICAgIHRleHQ6IGAke2Vycm9yLlRleHR9IFske09tbmkuZ2V0RnJhbWV3b3JrcyhlcnJvci5Qcm9qZWN0cyl9XSBgLFxyXG4gICAgICAgIGZpbGVQYXRoOiBlcnJvci5GaWxlTmFtZSxcclxuICAgICAgICByYW5nZTogbmV3IFJhbmdlKFtlcnJvci5MaW5lLCBlcnJvci5Db2x1bW5dLCBbZXJyb3IuRW5kTGluZSwgZXJyb3IuRW5kQ29sdW1uXSlcclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dMaW50ZXIoKSB7XHJcbiAgICBfLmVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbnRlci1ib3R0b20tdGFiXCIpLCAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHsgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJcIjsgfSk7XHJcbiAgICBfLmVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbnRlci1ib3R0b20tc3RhdHVzXCIpLCAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHsgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJcIjsgfSk7XHJcbiAgICBjb25zdCBwYW5lbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGludGVyLXBhbmVsXCIpO1xyXG4gICAgaWYgKHBhbmVsKVxyXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlTGludGVyKCkge1xyXG4gICAgXy5lYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW50ZXItYm90dG9tLXRhYlwiKSwgKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7fSk7XHJcbiAgICBfLmVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbnRlci1ib3R0b20tc3RhdHVzXCIpLCAoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjt9KTtcclxuICAgIGNvbnN0IHBhbmVsID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaW50ZXItcGFuZWxcIik7XHJcbiAgICBpZiAocGFuZWwpXHJcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG59XHJcblxyXG5sZXQgc2hvd0hpZGRlbkRpYWdub3N0aWNzID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KGxpbnRlcjogeyBnZXRFZGl0b3JMaW50ZXI6IChlZGl0b3I6IEF0b20uVGV4dEVkaXRvcikgPT4geyBsaW50OiAoc2hvdWxkTGludDogYm9vbGVhbikgPT4gdm9pZCB9IH0pIHtcclxuICAgIGNvbnN0IGRpc3Bvc2FibGUgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xyXG4gICAgbGV0IGNkOiBDb21wb3NpdGVEaXNwb3NhYmxlO1xyXG4gICAgZGlzcG9zYWJsZS5hZGQoYXRvbS5jb25maWcub2JzZXJ2ZShcIm9tbmlzaGFycC1hdG9tLmhpZGVMaW50ZXJJbnRlcmZhY2VcIiwgaGlkZGVuID0+IHtcclxuICAgICAgICBpZiAoaGlkZGVuKSB7XHJcbiAgICAgICAgICAgIGNkID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcclxuICAgICAgICAgICAgZGlzcG9zYWJsZS5hZGQoY2QpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2hvdyBsaW50ZXIgYnV0dG9uc1xyXG4gICAgICAgICAgICBjZC5hZGQoT21uaS5hY3RpdmVFZGl0b3JcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoeiA9PiAheilcclxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoc2hvd0xpbnRlcikpO1xyXG5cclxuICAgICAgICAgICAgLy8gaGlkZSBsaW50ZXIgYnV0dG9uc1xyXG4gICAgICAgICAgICBjZC5hZGQoT21uaS5hY3RpdmVFZGl0b3JcclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoeiA9PiAhIXopXHJcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKGhpZGVMaW50ZXIpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2QpIHtcclxuICAgICAgICAgICAgICAgIGRpc3Bvc2FibGUucmVtb3ZlKGNkKTtcclxuICAgICAgICAgICAgICAgIGNkLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzaG93TGludGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG5cclxuICAgIGRpc3Bvc2FibGUuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoXCJvbW5pc2hhcnAtYXRvbS5zaG93SGlkZGVuRGlhZ25vc3RpY3NcIiwgc2hvdyA9PiB7XHJcbiAgICAgICAgc2hvd0hpZGRlbkRpYWdub3N0aWNzID0gc2hvdztcclxuICAgICAgICBhdG9tLndvcmtzcGFjZS5nZXRUZXh0RWRpdG9ycygpLmZvckVhY2goKGVkaXRvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0b3JMaW50ZXIgPSBsaW50ZXIuZ2V0RWRpdG9yTGludGVyKGVkaXRvcik7XHJcbiAgICAgICAgICAgIGlmIChlZGl0b3JMaW50ZXIpIHtcclxuICAgICAgICAgICAgICAgIGVkaXRvckxpbnRlci5saW50KHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgZGlzcG9zYWJsZS5hZGQoT21uaS5hY3RpdmVFZGl0b3IuZmlsdGVyKHogPT4gISF6KS50YWtlKDEpLmRlbGF5KDEwMDApLnN1YnNjcmliZSgoZSkgPT4ge1xyXG4gICAgICAgIE9tbmkud2hlbkVkaXRvckNvbm5lY3RlZChlKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgICAgICBhdG9tLndvcmtzcGFjZS5nZXRUZXh0RWRpdG9ycygpLmZvckVhY2goKGVkaXRvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdG9yTGludGVyID0gbGludGVyLmdldEVkaXRvckxpbnRlcihlZGl0b3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvckxpbnRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRvckxpbnRlci5saW50KHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pKTtcclxuXHJcbiAgICByZXR1cm4gZGlzcG9zYWJsZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySW5kaWUocmVnaXN0cnk6IEluZGllUmVnaXN0cnksIGRpc3Bvc2FibGU6IENvbXBvc2l0ZURpc3Bvc2FibGUpIHtcclxuICAgIGNvbnN0IGxpbnRlciA9IHJlZ2lzdHJ5LnJlZ2lzdGVyKHsgbmFtZTogXCJjI1wiIH0pO1xyXG4gICAgZGlzcG9zYWJsZS5hZGQoXHJcbiAgICAgICAgbGludGVyLFxyXG4gICAgICAgIE9tbmkuZGlhZ25vc3RpY3NcclxuICAgICAgICAgICAgLnN1YnNjcmliZShkaWFnbm9zdGljcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlczogTGludGVyTWVzc2FnZVtdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRpYWdub3N0aWNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNob3dIaWRkZW5EaWFnbm9zdGljcyB8fCBpdGVtLkxvZ0xldmVsICE9PSBcIkhpZGRlblwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2gobWFwSW5kaWVWYWx1ZXMoaXRlbSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaW50ZXIuc2V0TWVzc2FnZXMobWVzc2FnZXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgKTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgT21uaSB9IGZyb20gXCIuLi9zZXJ2ZXIvb21uaVwiO1xuY29uc3QgUmFuZ2UgPSByZXF1aXJlKFwiYXRvbVwiKS5SYW5nZTtcbmltcG9ydCBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB7IENvbXBvc2l0ZURpc3Bvc2FibGUgfSBmcm9tIFwib21uaXNoYXJwLWNsaWVudFwiO1xuZnVuY3Rpb24gbWFwSW5kaWVWYWx1ZXMoZXJyb3IpIHtcbiAgICBjb25zdCBsZXZlbCA9IGVycm9yLkxvZ0xldmVsLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogbGV2ZWwsXG4gICAgICAgIHRleHQ6IGAke2Vycm9yLlRleHR9IFske09tbmkuZ2V0RnJhbWV3b3JrcyhlcnJvci5Qcm9qZWN0cyl9XSBgLFxuICAgICAgICBmaWxlUGF0aDogZXJyb3IuRmlsZU5hbWUsXG4gICAgICAgIHJhbmdlOiBuZXcgUmFuZ2UoW2Vycm9yLkxpbmUsIGVycm9yLkNvbHVtbl0sIFtlcnJvci5FbmRMaW5lLCBlcnJvci5FbmRDb2x1bW5dKVxuICAgIH07XG59XG5mdW5jdGlvbiBzaG93TGludGVyKCkge1xuICAgIF8uZWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGludGVyLWJvdHRvbS10YWJcIiksIChlbGVtZW50KSA9PiB7IGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7IH0pO1xuICAgIF8uZWFjaChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGludGVyLWJvdHRvbS1zdGF0dXNcIiksIChlbGVtZW50KSA9PiB7IGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7IH0pO1xuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpbnRlci1wYW5lbFwiKTtcbiAgICBpZiAocGFuZWwpXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xufVxuZnVuY3Rpb24gaGlkZUxpbnRlcigpIHtcbiAgICBfLmVhY2goZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpbnRlci1ib3R0b20tdGFiXCIpLCAoZWxlbWVudCkgPT4geyBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgfSk7XG4gICAgXy5lYWNoKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW50ZXItYm90dG9tLXN0YXR1c1wiKSwgKGVsZW1lbnQpID0+IHsgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7IH0pO1xuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpbnRlci1wYW5lbFwiKTtcbiAgICBpZiAocGFuZWwpXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cbmxldCBzaG93SGlkZGVuRGlhZ25vc3RpY3MgPSB0cnVlO1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQobGludGVyKSB7XG4gICAgY29uc3QgZGlzcG9zYWJsZSA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKCk7XG4gICAgbGV0IGNkO1xuICAgIGRpc3Bvc2FibGUuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoXCJvbW5pc2hhcnAtYXRvbS5oaWRlTGludGVySW50ZXJmYWNlXCIsIGhpZGRlbiA9PiB7XG4gICAgICAgIGlmIChoaWRkZW4pIHtcbiAgICAgICAgICAgIGNkID0gbmV3IENvbXBvc2l0ZURpc3Bvc2FibGUoKTtcbiAgICAgICAgICAgIGRpc3Bvc2FibGUuYWRkKGNkKTtcbiAgICAgICAgICAgIGNkLmFkZChPbW5pLmFjdGl2ZUVkaXRvclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoeiA9PiAheilcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHNob3dMaW50ZXIpKTtcbiAgICAgICAgICAgIGNkLmFkZChPbW5pLmFjdGl2ZUVkaXRvclxuICAgICAgICAgICAgICAgIC5maWx0ZXIoeiA9PiAhIXopXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShoaWRlTGludGVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2QpIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NhYmxlLnJlbW92ZShjZCk7XG4gICAgICAgICAgICAgICAgY2QuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd0xpbnRlcigpO1xuICAgICAgICB9XG4gICAgfSkpO1xuICAgIGRpc3Bvc2FibGUuYWRkKGF0b20uY29uZmlnLm9ic2VydmUoXCJvbW5pc2hhcnAtYXRvbS5zaG93SGlkZGVuRGlhZ25vc3RpY3NcIiwgc2hvdyA9PiB7XG4gICAgICAgIHNob3dIaWRkZW5EaWFnbm9zdGljcyA9IHNob3c7XG4gICAgICAgIGF0b20ud29ya3NwYWNlLmdldFRleHRFZGl0b3JzKCkuZm9yRWFjaCgoZWRpdG9yKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3JMaW50ZXIgPSBsaW50ZXIuZ2V0RWRpdG9yTGludGVyKGVkaXRvcik7XG4gICAgICAgICAgICBpZiAoZWRpdG9yTGludGVyKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yTGludGVyLmxpbnQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pKTtcbiAgICBkaXNwb3NhYmxlLmFkZChPbW5pLmFjdGl2ZUVkaXRvci5maWx0ZXIoeiA9PiAhIXopLnRha2UoMSkuZGVsYXkoMTAwMCkuc3Vic2NyaWJlKChlKSA9PiB7XG4gICAgICAgIE9tbmkud2hlbkVkaXRvckNvbm5lY3RlZChlKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgYXRvbS53b3Jrc3BhY2UuZ2V0VGV4dEVkaXRvcnMoKS5mb3JFYWNoKChlZGl0b3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0b3JMaW50ZXIgPSBsaW50ZXIuZ2V0RWRpdG9yTGludGVyKGVkaXRvcik7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvckxpbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBlZGl0b3JMaW50ZXIubGludCh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSkpO1xuICAgIHJldHVybiBkaXNwb3NhYmxlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVySW5kaWUocmVnaXN0cnksIGRpc3Bvc2FibGUpIHtcbiAgICBjb25zdCBsaW50ZXIgPSByZWdpc3RyeS5yZWdpc3Rlcih7IG5hbWU6IFwiYyNcIiB9KTtcbiAgICBkaXNwb3NhYmxlLmFkZChsaW50ZXIsIE9tbmkuZGlhZ25vc3RpY3NcbiAgICAgICAgLnN1YnNjcmliZShkaWFnbm9zdGljcyA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGl0ZW0gb2YgZGlhZ25vc3RpY3MpIHtcbiAgICAgICAgICAgIGlmIChzaG93SGlkZGVuRGlhZ25vc3RpY3MgfHwgaXRlbS5Mb2dMZXZlbCAhPT0gXCJIaWRkZW5cIikge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2gobWFwSW5kaWVWYWx1ZXMoaXRlbSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxpbnRlci5zZXRNZXNzYWdlcyhtZXNzYWdlcyk7XG4gICAgfSkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
