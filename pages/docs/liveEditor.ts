// import esbuildwasm from 'https://deno.land/x/esbuild@v0.25.4/esbuild.wasm';
// import * as esbuild from 'https://deno.land/x/esbuild@v0.25.4/wasm.js';
// import { httpImports } from "https://deno.land/x/esbuild_serve@1.5.0/features/httpImports.ts";

// await esbuild.initialize({
//     wasmURL: esbuildwasm
// });

// async function compile(source: string) {
//     console.log(import.meta.resolve("webgen/mod.ts"));

//     const result = await esbuild.build({
//         entryPoints: [ 'index.ts' ],
//         bundle: true,
//         outdir: ".",
//         plugins: [
//             {
//                 name: 'loader',
//                 setup(build) {
//                     build.onResolve({ filter: /.*/, }, args => {
//                         if (args.kind === 'entry-point') {
//                             console.log(args);
//                             return { path: 'file://' + args.path, namespace: 'loader' };
//                         }
//                     });

//                     build.onLoad({ filter: /.*/, namespace: 'loader' }, () => {
//                         return { contents: source, loader: "ts" };
//                     });
//                 }
//             },
//             httpImports({
//                 sideEffects: true
//             }),
//         ]
//     });
//     console.log(result);
//     console.log(result.outputFiles);
//     const iframe = createElement("iframe");
//     iframe.src = 'about:blank';
//     const script = createElement("script");
//     script.type = "module";
//     script.innerHTML = result.outputFiles?.[ 0 ].text ?? "";
//     iframe.onload = () => {
//         const style = createElement("style");
//         style.innerHTML = result.outputFiles?.find(x => x.path.includes("index.css"))?.text ?? "";
//         iframe.contentDocument?.body?.append(script, style);
//         setTimeout(() => console.log(iframe.replaceWith(iframe.contentDocument?.querySelector("article")!)), 1000);
//     };
//     return Custom(iframe);
// }

// const vscode = (await loader.init()) as typeof monaco;
// vscode.editor.defineTheme("vs-dark-plus", {
//     base: 'vs-dark',
//     inherit: true,
//     rules: [
//         { token: 'variable', foreground: '74B0DF' },
//         { token: 'type', foreground: '4EC9B0' },
//         { token: 'identifier.ts', foreground: '9CDCFE' }
//     ],
//     colors: {}
// });
// validation settings
// monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
//     noSemanticValidation: true,
//     noSyntaxValidation: false
// });

// // compiler options
// // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
// //     target: monaco.languages.typescript.ScriptTarget.ESNext,
// //     allowNonTsExtensions: true
// // });

// const libSource = [
//     'declare class Facts {',
//     '    /**',
//     '     * Returns the next fact',
//     '     */',
//     '    static next():string',
//     '}'
// ].join('\n');
// const libUri = 'ts:filename/facts.d.ts';

// vscode.languages.typescript.typescriptDefaults.setExtraLibs(Object.entries(declaration).map(([ key, value ]) => ({ content: value, filePath: 'ts:filename/' + key })));
// console.log(vscode.editor.createModel(libSource, 'typescript', monaco.Uri.parse('ts:filename/mod.d.ts')));
// vscode.languages.typescript.typescriptDefaults.addExtraLib(libSource, libUri);
// console.log(vscode.languages.typescript.typescriptDefaults.getExtraLibs());
// vscode.editor.createModel();
// // When resolving definitions and references, the editor will try to use created models.
// // Creating a model for the library allows "peek definition/references" commands to work with the library.
// // vscode.editor.createModel(libSource, 'typescript', monaco.Uri.parse(lib2Uri));
// // vscode.editor.createModel(libSource, 'typescript', monaco.Uri.parse(libUri));
// vscode.editor.create(codeshell, {
//     value: [
//         "View(() => ",
//         '   Label("Hello World!")',
//         ").appendOn(document.body);"
//     ].join("\n"),
//     language: 'typescript',
//     theme: 'vs-dark-plus',
//     padding: {
//         top: 30
//     }
// });