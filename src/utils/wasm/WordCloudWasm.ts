import Module from '@utils/wasm/wordcloud.wasm?init';

export async function LoadWordCloudWASM(width: number, height: number): Promise<any> {
  // const response = await fetch('/wasm/wordcloud.wasm');
  // const buffer = await response.arrayBuffer();
  // const module = await WebAssembly.compile(buffer);
  // console.log(WebAssembly.Module.imports(module));

  return new Promise((resolve, reject) => {
    Module({
      wasi_snapshot_preview1: {
        memory: new WebAssembly.Memory({ initial: 256 }),
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
        clock_time_get: () => {
          return 0; // __WASI_ESUCCESS
        },
      },
    })
      .then(({ exports }) => {
        exports.initSize(width, height);
        const arrayPtr = exports.malloc(width * height);

        resolve({
          ...exports,
          initClear: (margin: number, randomState: number, minFontSize: number) =>
            exports.initClear(margin, randomState, minFontSize),
          getPosition: (fontSize: number, textWidth: number) => {
            const ptr = exports.getPosition(fontSize, textWidth);
            const memory = new Uint8Array(exports.memory.buffer);

            return {
              fontSize: new DataView(memory.buffer).getInt32(ptr, true),
              orientation: new DataView(memory.buffer).getInt32(ptr + 4, true),
              posX: new DataView(memory.buffer).getInt32(ptr + 8, true),
              posY: new DataView(memory.buffer).getInt32(ptr + 12, true),
            };
          },
          Update: (data: Uint8Array, x: number, y: number, w: number, h: number) => {
            const memory = new Uint8Array(exports.memory.buffer);
            memory.set(data, arrayPtr);
            exports.Update(arrayPtr, x, y, w, h);
          },
        });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
