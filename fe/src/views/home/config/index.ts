import { RefreshState, TypeMap } from '../constants'
export const REFRESH_STATE: RefreshState = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
};

export const LOAD_STATE: RefreshState = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
};

/** 类型枚举 */
export const typeMap: TypeMap = {
  1: 'icon-meishi',
  2: 'icon-xuexi',
  3: 'icon-jiaotong',
  4: 'icon-fushi',
  5: 'icon-zhuanzhang',
  6: 'icon-shouru',
  7: 'icon-jiudian',
  8: 'icon-weibiaoti2fuzhi03',
  9: 'icon-weibiaoti2fuzhi11',
  10: 'icon-chongwu',
  11: 'icon-gongyijuankuan',
  12: 'icon-lifajiandao',
  13: 'icon-yiliao'
}