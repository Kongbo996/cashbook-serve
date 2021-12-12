export const iconUrl = '//at.alicdn.com/t/font_2951319_1ukxmt7gxfn.js'
export declare type WheelValue = string | number ;

interface BillItemProps {
  amount: WheelValue,
  date: WheelValue,
  id: number,
  pay_type: number,
  remark: string,
  type_id: number,
  type_name: string
}


export interface ResultProps {
  code: number,
  msg: string,
  data: Object | string | null | any
  list?: BillItemProps[]
}