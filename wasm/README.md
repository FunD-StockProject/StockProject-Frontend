emcc ./wasm/wordcloud.c -o ./src/utils/wasm/wordcloud.wasm -s STANDALONE_WASM -s EXPORTED_FUNCTIONS="['_initSize', '_malloc', '_free']" -s EXPORTED_RUNTIME_METHODS="['cwrap', 'ccall']" --no-entry
