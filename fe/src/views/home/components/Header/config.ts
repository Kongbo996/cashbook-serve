
export declare type WheelValue = string | number ;

export interface WheelItem {
  [key: string]: WheelValue;
}

export declare type DataSource<T = {
  label: string;
  value: WheelValue;
}> = Array<T & {
  children?: DataSource<T>;
}>;

export interface TypeSelectProps {
  visible: boolean,
  value: WheelValue,
  label: string,
  dataSource: DataSource
}

export const SING_TYPE: DataSource = [
  { value: 'all', label: '全部类型' },
];