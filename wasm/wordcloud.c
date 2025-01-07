#include <emscripten/emscripten.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#define TRUE 1
#define FALSE 0
#define MIN(a,b) ((a) < (b) ? (a) : (b))

typedef struct _TextPosition {
  int font_size;
  int orientation;
  int pos_x;
  int pos_y;
} TextPosition;

int width, height;
int margin, random_state, min_font_size;
int *prefix_sum, *hits;
char *grid;

int sum_width, sum_height;

// EMSCRIPTEN_KEEPALIVE
void initSize(int w, int h) {
  width = w;
  height = h;

  sum_width = width + 1;
  sum_height = height + 1;

  prefix_sum = (int*)malloc(sizeof(int)*sum_width*sum_height);
  grid = (char*)malloc(sizeof(char)*width*height);
  hits = (int*)malloc(sizeof(int)*width*height);

  return;
}

// EMSCRIPTEN_KEEPALIVE
void initClear(int _margin, int _random_state, int _min_font_size) {
  margin = _margin;
  random_state = _random_state;
  min_font_size = _min_font_size;

  memset(prefix_sum, 0, sizeof(int) * sum_width * sum_height);
  memset(grid, 0, sizeof(char) * width * height);

  return;
}

int isEmptyArea(int x, int y, int w, int h) {
  return (
      prefix_sum[(y + h) * sum_width + (x + w)] -
        (prefix_sum[y * sum_width + (x + w)] + prefix_sum[(y + h) * sum_width + x]) +
        prefix_sum[y * sum_width + x] == 0
    );
}

int hits_idx = 0;

void DC(int x1, int y1, int w, int h, int size_x, int size_y) {
  if(x1 + size_x >= width || y1 + size_y >= height) return;
  if(isEmptyArea(x1, y1, w, h) == w*h) return;

  if(w < size_x && h < size_y) {
    int i = 0, j = x1+w-1;
    for(i = y1+h-1; i >= y1 && !grid[i*width+j]; i--) {
      for(j = x1+w-1; j >= x1 && !grid[i*width+j]; j--) {
        if(j+size_x <= width && i+size_y <= height && isEmptyArea(j, i, size_x, size_y)) {
          hits[hits_idx++] = (i * width + j);
        }
      }
    }
    return;
  }

  if(w == 1 && h == 1) {
    if (x1 < width - size_x && y1 < height - size_y && isEmptyArea(x1, y1, size_x, size_y)) {
      hits[hits_idx++] = (y1 * width + x1);
      return;
    }
  }

  int mw = w>>1, mh = h>>1;
  if(w == 1 && h > 1) {
    DC(x1, y1, w, mh, size_x, size_y);
    DC(x1, y1+mh, w, h-mh, size_x, size_y);
  } else if(h == 1 && w > 1) {  
    DC(x1, y1, mw, h, size_x, size_y);
    DC(x1+mw, y1, w-mw, h, size_x, size_y);
  } else if(h > 1 && w > 1) {
    DC(x1, y1, mw, mh, size_x, size_y);
    DC(x1+mw, y1, w-mw, mh, size_x, size_y);
    DC(x1, y1+mh, mw, h-mh, size_x, size_y);
    DC(x1+mw, y1+mh, w-mw, h-mh, size_x, size_y);
  }
  return;
}

int checkPosition(int font_size, double text_width, int orientation) {
  int w = margin + font_size * (!orientation ? text_width : 1);
  int h = margin + font_size * (!orientation ? 1 : text_width);
  int l, m, r;

  hits_idx = 0;
  DC(0, 0, width, height, w, h);

  if (!hits_idx) return -1;

  return hits[random_state % hits_idx];
}

// EMSCRIPTEN_KEEPALIVE
TextPosition* getPosition(int font_size, double text_width) {
  TextPosition *res = (TextPosition*)malloc(sizeof(TextPosition));
  srand(time(NULL));
  int orientation = ((rand() % 100) >= (0.9 * 100)) ? TRUE : FALSE;
  int tried_other_orientation = FALSE;

  while (font_size >= min_font_size) {
    int pos = checkPosition(font_size, text_width, orientation);

    if (pos >= 0) {
      res->font_size = font_size;
      res->orientation = orientation;
      res->pos_x = pos % width;
      res->pos_y = pos / width;
      break;
    }

    if (!tried_other_orientation) {
      orientation = !orientation;
      tried_other_orientation = TRUE;
    } else {
      font_size -= 1;
      orientation = ((rand() % 100) >= (0.9 * 100)) ? TRUE : FALSE;
      tried_other_orientation = FALSE;
    }
  }

  return res; 
}

// EMSCRIPTEN_KEEPALIVE
void Update(char* data, int x, int y, int w, int h) {
  for(int i = y; i < height; i++) {
    int gridY = i * width;
    int dataY = (i - y) * w;

    for(int j = x; j < width; j++) {
      if(j < x + w && i < y + h) {
        grid[gridY + j] = data[dataY + (j - x)] ? 1 : 0;
      }
      prefix_sum[(i + 1) * sum_width + (j + 1)] =
        prefix_sum[i * sum_width + (j + 1)] +
        prefix_sum[(i + 1) * sum_width + j] -
        prefix_sum[i * sum_width + j] +
        grid[gridY + j];
    }
  }

  return;
}

int main() {
    return 0;
}