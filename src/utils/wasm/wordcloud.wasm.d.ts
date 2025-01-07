declare module '@utils/wasm/wordcloud.wasm?init' {
  interface WasmExports {
    memory: WebAssembly.Memory;
    malloc(size: number): number;
    free(ptr: number): void;
    initSize(width: number, height: number): void;
    initClear(margin: number, randomState: number, minFontSize: number): void;
    getPosition(fontSize: number, textWidth: number): any;
    Update(ptr: number, x: number, y: number, w: number, h: number): void;
  }

  interface WasmInstance {
    exports: WasmExports;
  }

  type InitWasmModule = (imports?: Record<string, any>) => Promise<WasmInstance>;

  const initWasm: InitWasmModule;
  export default initWasm;
}
