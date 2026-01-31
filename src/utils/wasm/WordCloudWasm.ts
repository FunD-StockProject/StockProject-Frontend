import Module from '@utils/wasm/wordcloud.wasm?init';

export async function LoadWordCloudWASM(width: number, height: number): Promise<any> {
  // const response = await fetch('/wasm/wordcloud.wasm');
  // const buffer = await response.arrayBuffer();
  // const module = await WebAssembly.compile(buffer);

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
        // 타입 안전성을 위한 타입 단언
        const wasmExports = exports as any;

        wasmExports.initSize(width, height);
        const arrayPtr = wasmExports.malloc(width * height);

        resolve({
          ...wasmExports,
          initClear: (margin: number, randomState: number, minFontSize: number) =>
            wasmExports.initClear(margin, randomState, minFontSize),
          getPosition: (fontSize: number, textWidth: number, isFirst: boolean) => {
            const ptr = wasmExports.getPosition(fontSize, textWidth, isFirst ? 1 : 0);
            const memory = new Uint8Array(wasmExports.memory.buffer);

            return {
              fontSize: new DataView(memory.buffer).getInt32(ptr, true),
              orientation: new DataView(memory.buffer).getInt32(ptr + 4, true),
              posX: new DataView(memory.buffer).getInt32(ptr + 8, true),
              posY: new DataView(memory.buffer).getInt32(ptr + 12, true),
            };
          },
          Update: (data: Uint8Array, x: number, y: number, w: number, h: number) => {
            const memory = new Uint8Array(wasmExports.memory.buffer);
            memory.set(data, arrayPtr);
            wasmExports.Update(arrayPtr, x, y, w, h);
          },
        });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
