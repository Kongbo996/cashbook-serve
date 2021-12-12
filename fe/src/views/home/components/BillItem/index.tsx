import React from "react";
import MyIcon from '@/components/MyIcon'
import { typeMap } from '@/views/home/config'
import { BillItemProps } from '@/views/home/constants'
import moment from 'moment'
import './index.less'

interface Props {
  item: BillItemProps
}

const BillItem = (props: Props) => {
  const { item } = props
  console.log(item)
  return <div className="bill-item" >
    <div className="bill-item__icon">
      <MyIcon type={typeMap[item.type_id]} />
    </div>
    <div className="bill-item__content">
      <div className="f14 ellipsis">{item.type_name}</div>
      <div className="ellipsis">{moment(+item.date).format('MM-DD hh:mm:ss')}</div>
    </div>
    <div className="bill-item__cash f16">
      {item.amount}
    </div>
  </div>

}

export default BillItem