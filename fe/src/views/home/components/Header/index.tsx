import React, { useState, useEffect } from "react";
import { Picker, Toast } from 'zarm'
import { SING_TYPE, TypeSelectProps, WheelItem } from './config'
import MyIcon from "@/components/MyIcon";
import { get } from '@/service'
import { TagType } from '../../constants'

interface Props {
  total: {
    totalExpense: number;
    totalIncome: number;
  }
  onSelected: (type: number | string, date: string) => void
}

const Header = (props: Props) => {
  const { total, onSelected } = props 
  const [typeSelect, setTypeSelect] = useState<TypeSelectProps>({
    visible: false,
    value: 'all',
    label: '全部类型',
    dataSource: SING_TYPE,
  },)

  useEffect(() => {
    onSelected(typeSelect.value, '2021-11')
  }, [typeSelect.value])

  const getTypeList = async () => {
    const res = await get('/api/type/list')
    const { list = [] } = res.data
    const arr = list.map((i: TagType) => {
      return {
        label: i.name,
        value: i.id,
        type: i.type
      }
    })
    // set
    setTypeSelect({...typeSelect, dataSource: [...SING_TYPE, ...arr]})
  }

  useEffect( () => {
    getTypeList()
  }, [])



  return <div className="home-container__header w-100">
    <div className="header-top">
      总支出：<span>￥{total.totalExpense || 0.00}</span>
      总收入<span>￥{total.totalIncome || 0.00}</span>
    </div>
    <div className="header-bottom">
      <div onClick={() => setTypeSelect({...typeSelect, visible: true})}>
        {typeSelect.label}
        <MyIcon className={typeSelect.visible ? 'isReverse' : ''} type="icon-xiangxiajiantou" />
      </div>
      <div>
        2021-11
        <MyIcon  className={typeSelect.visible ? 'isReverse' : ''} type="icon-xiangxiajiantou" />
      </div>
    </div>

    <Picker
      visible={typeSelect.visible}
      value={typeSelect.value}
      dataSource={typeSelect.dataSource}
      itemRender={(data: any ) => data.label}
      onOk={(selected: any) => {
        setTypeSelect({...typeSelect, visible: false, label: selected[0].label as string, value: selected[0].value})
        Toast.show(JSON.stringify(selected));
      }}
      onCancel={()=>setTypeSelect({...typeSelect, visible: false})}
    />
  </div>
}

export default Header