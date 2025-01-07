@emcc wasm/wordcloud.c -o src/utils/wasm/wordcloud.wasm -O3^
 -s STANDALONE_WASM^
 -s ENVIRONMENT=web^
 -s EXPORTED_FUNCTIONS=['_malloc','_free','_initSize','_initClear','_getPosition','_Update'] -g1^
 -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap','getValue','UTF8ToString']^
 --no-entry^
&& wasm2wat src/utils/wasm/wordcloud.wasm -o src/utils/wasm/wordcloud.wat

@REM @emcc --no-entry wasm/wordcloud.c -o src/utils/wasm/wordcloud.js -O3^
@REM  -s EXPORT_ES6=1^
@REM  -s ENVIRONMENT=web^
@REM  -s EXPORTED_FUNCTIONS=['_malloc','_free','_initSize','_initClear','_getPosition','_Update'] -g^
@REM  -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap','getValue','UTF8ToString']

 
@REM  -s WASM=1^