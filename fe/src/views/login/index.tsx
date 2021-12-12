import React, { useState } from 'react'
import { Cell, Input, Icon, Checkbox, Button, Toast } from 'zarm'
import Captcha from 'react-captcha-code'
import { useHistory } from 'react-router'
import { iconUrl, ResultProps } from '@/constants'
import { post } from '@/service'
import './index.less'


const Login:React.FC = () => {
  const MyIcon = Icon.createFromIconfont(iconUrl);
  const history = useHistory()
  const [username , setUsername] = useState<string | undefined>('') // 用户名
  const [password , setPassword] = useState<string | undefined>('') // 密码
  const [verify , setVerify] = useState<string | undefined>('') // 验证码
  const [captcha, setCaptcha] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const handleSubmit = async () => {
    if (!isChecked) {
      Toast.show('请确认并同意条款')
      return
    };
    if (!username) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    if (!verify) {
      Toast.show('请输入验证码')
      return
    };
    if (verify != captcha) {
      Toast.show('验证码错误')
      return
    };

    try {
      const params = {
        username,
        password,
      }
      if(isLogin) {
        const result: ResultProps = await post('api/user/login', params)
        console.log(result  )
        if(result.code === 200) {
          Toast.show('登陆成功')
          history.push('/')
        }
      } else {
        const { code = 0 }: ResultProps = await post('api/user/register', params)
        if(code === 200)
        Toast.show('注册成功')
      }
    } catch(err: any) {
      Toast.show(err.msg || '系统错误，请稍后再试')
    }
  }
  
  const handleCaptchaChange = (val: string) => {
    console.log(val)
    setCaptcha(val)
  }
  return <div className="layout-login">
    <div className="layout-login__title">
      <span onClick={()=>setIsLogin(true)} className={isLogin ? "active" : ''}  >登录</span> /  <span  onClick={()=>setIsLogin(false)} className={isLogin ? "" : 'active'}>注册</span>
    </div>
    <Cell icon={<MyIcon type="icon-zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入"
          onChange={(value: string | undefined) => {
            console.log(`onChange: ${value}`);
            setUsername(value)
          }}
          onBlur={(value: string | undefined) => console.log(`onBlur: ${value}`)}
        />
    </Cell>
    <Cell icon={<MyIcon type="icon-mima" />}>
      <Input
        clearable
        type="text"
        placeholder="请输入"
        onChange={(value: string | undefined) => {
          console.log(`onChange: ${value}`);
          setPassword(value)
        }}
        onBlur={(value: string | undefined) => console.log(`onBlur: ${value}`)}
      />
    </Cell>
    <Cell icon={<MyIcon type="icon-mima" />}>
      <Input
        clearable
        type="text"
        placeholder="请输入验证码"
        onChange={(value: string | undefined) => setVerify(value)}
      />
      <Captcha charNum={4} onChange={handleCaptchaChange} />
    </Cell>
    <Cell>
      <label className="text-light"> <Checkbox onChange={(e: any) => setIsChecked(e.target.checked)} />阅读并同意<a>《掘掘手札条款》</a></label>
    </Cell>
    <Button onClick={handleSubmit} block theme="primary">注册</Button>
  </div>
}

export default Login