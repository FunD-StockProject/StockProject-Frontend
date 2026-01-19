import { themeColor } from '@styles/themes';

export const deltaColor = (delta: number): themeColor => (!delta ? 'grayscale50' : delta > 0 ? 'red' : 'blue');
