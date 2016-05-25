import {Models} from "omnisharp-client";
import {Omni} from "../server/omni";
/* tslint:disable:variable-name */
const Range = require("atom").Range;
/* tslint:enable:variable-name */
import _ from "lodash";
import {Observable} from "rxjs";
import {CompositeDisposable} from "omnisharp-client";
import {codeCheck} from "../features/code-check";

interface LinterMessage {
    type: string; // "error" | "warning"
    text?: string;
    html?: string;
    filePath?: string;
    range?: Range;
    [key: string]: any;
}

interface IndieRegistry {
    register(options: { name: string; }): Indie;
    has(indie: any): Boolean;
    unregister(indie: any): void;
}

interface Indie {
    setMessages(messages: LinterMessage[]): void;
    deleteMessages(): void;
    dispose(): void;
}

function mapValues(editor: Atom.TextEditor, error: Models.DiagnosticLocation): LinterMessage {
    const level = error.LogLevel.toLowerCase();

    return {
        type: level,
        text: `${error.Text} [${Omni.getFrameworks(error.Projects)}] `,
        filePath: editor.getPath(),
        range: new Range([error.Line, error.Column], [error.EndLine, error.EndColumn])
    };
}

function mapIndieValues(error: Models.DiagnosticLocation): LinterMessage {
    const level = error.LogLevel.toLowerCase();

    return {
        type: level,
        text: `${error.Text} [${Omni.getFrameworks(error.Projects)}] `,
        filePath: error.FileName,
        range: new Range([error.Line, error.Column], [error.EndLine, error.EndColumn])
    };
}

function showLinter() {
    _.each(document.querySelectorAll("linter-bottom-tab"), (element: HTMLElement) => element.style.display = "");
    _.each(document.querySelectorAll("linter-bottom-status"), (element: HTMLElement) => element.style.display = "");
    const panel = <HTMLElement>document.querySelector("linter-panel");
    if (panel)
        panel.style.display = "";
}

function hideLinter() {
    _.each(document.querySelectorAll("linter-bottom-tab"), (element: HTMLElement) => element.style.display = "none");
    _.each(document.querySelectorAll("linter-bottom-status"), (element: HTMLElement) => element.style.display = "none");
    const panel = <HTMLElement>document.querySelector("linter-panel");
    if (panel)
        panel.style.display = "none";
}

let showHiddenDiagnostics = true;

export function init(linter: { getEditorLinter: (editor: Atom.TextEditor) => { lint: (shouldLint: boolean) => void } }) {
    const disposable = new CompositeDisposable();
    let cd: CompositeDisposable;
    disposable.add(atom.config.observe("omnisharp-atom.hideLinterInterface", hidden => {
        if (hidden) {
            cd = new CompositeDisposable();
            disposable.add(cd);

            // show linter buttons
            cd.add(Omni.activeEditor
                .filter(z => !z)
                .subscribe(showLinter));

            // hide linter buttons
            cd.add(Omni.activeEditor
                .filter(z => !!z)
                .subscribe(hideLinter));
        } else {
            if (cd) {
                disposable.remove(cd);
                cd.dispose();
            }
            showLinter();
        }
    }));

    disposable.add(atom.config.observe("omnisharp-atom.showHiddenDiagnostics", show => {
        showHiddenDiagnostics = show;
        atom.workspace.getTextEditors().forEach((editor) => {
            const editorLinter = linter.getEditorLinter(editor);
            if (editorLinter) {
                editorLinter.lint(true);
            }
        });
    }));

    disposable.add(Omni.activeEditor.filter(z => !!z).take(1).delay(1000).subscribe((e) => {
        Omni.whenEditorConnected(e).subscribe(() => {
            atom.workspace.getTextEditors().forEach((editor) => {
                const editorLinter = linter.getEditorLinter(editor);
                if (editorLinter) {
                    editorLinter.lint(true);
                }
            });
        });
    }));

    return disposable;
}

export const provider = [
    {
        name: "c#",
        get grammarScopes() { return Omni.grammars.map((x: any) => x.scopeName); },
        scope: "file",
        lintOnFly: true,
        lint: (editor: Atom.TextEditor) => {
            const path = editor.getPath();
            return codeCheck.doCodeCheck(editor)
                .map(x => _(x)
                    .filter(z => z.FileName === path)
                    .filter(z => showHiddenDiagnostics || z.LogLevel !== "Hidden")
                    .map(error => mapValues(editor, error))
                    .value()
                )
                .toPromise();
        }
    }, {
        name: "c#",
        get grammarScopes() { return Omni.grammars.map((x: any) => x.scopeName); },
        scope: "project",
        lintOnFly: false,
        lint: (editor: Atom.TextEditor) => {
            return Observable.race<Models.DiagnosticLocation[]>(
                Omni.diagnostics.skip(1).take(1),
                Omni.diagnostics.take(1).delay(3000)
            )
                .map(x => _(x)
                    .filter(z => showHiddenDiagnostics || z.LogLevel !== "Hidden")
                    .map(error => mapValues(editor, error))
                    .value()
                )
                .toPromise();
        }
    }
];

export function registerIndie(registry: IndieRegistry, disposable: CompositeDisposable) {
    const linter = registry.register({ name: "c#" });
    disposable.add(
        linter,
        Omni.diagnostics
            .map(x => _(x)
                .filter(z => showHiddenDiagnostics || z.LogLevel !== "Hidden")
                .map(error => mapIndieValues(error))
                .value())
            .subscribe(messages => {
                linter.setMessages(messages);
            })
    );
}

