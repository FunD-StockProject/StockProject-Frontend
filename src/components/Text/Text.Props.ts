import { themeColor } from '../../styles/themes';

export interface TextDisplayProps {
  /**
   * @size Large : 66px / Medium : 50px / Small : 40px
   */
  size?: 'Large' | 'Medium' | 'Small';
  color?: themeColor;
}

export interface TextHeadingProps {
  /**
   * @size Large : 50px / Medium : 40px / Small : 32px
   */
  size?: 'Large' | 'Medium' | 'Small';
  color?: themeColor;
}

export interface TextTitleProps {
  /**
   * XXLarge : 32px / XLarge : 25px / Large : 21px / Medium : 19px / Small : 17px / XSmall : 15px
   */
  size?: 'XXLarge' | 'XLarge' | 'Large' | 'Medium' | 'Small' | 'XSmall';
  color?: themeColor;
}

export interface TextBodyProps {
  /**
   * Large : 19px / Medium : 17px / Small : 15px
   */
  size?: 'Large' | 'Medium' | 'Small';
  weight?: 'Normal' | 'Bold';
  color?: themeColor;
}

export interface TextDetailProps {
  /**
   * Large : 17px / Medium : 15px / Small : 13px
   */
  size?: 'Large' | 'Medium' | 'Small';
  weight?: 'Normal' | 'Bold';
  color?: themeColor;
}
