export declare type WheelValue = string | number ;
export interface RefreshState {
  [key: string] : WheelValue
}

export interface TypeMap {
  [key: number] : string
}

export interface BillItemProps {
  amount: WheelValue,
  date: WheelValue,
  id: number,
  pay_type: number,
  remark: string,
  type_id: number,
  type_name: string
}

export type BillList = {
  list: {
    date: string,
    bills: any[]
  },
  total: number,
  totalExpense: number,
  totalIncome: number,
}

export type TagType = {
  id: number,
  name: string,
  type: number,
  user_id: number
}