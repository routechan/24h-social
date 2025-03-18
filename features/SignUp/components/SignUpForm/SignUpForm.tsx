import { Input } from '@/components/ui/input'
import { registerUser } from '@/lib/auth'
import React from 'react'

const SignUpForm = () => {
const handleSubmit = ()=>{
    try{
    registerUser(name,email,password)
    }catch(err){
console.log(err)
    }
}
  return (
    <form>
        <label id="name">名前</label>
<Input type='text'/>
<label id="email">メールアドレス</label>
<Input type='text'/>
<label id="password">パスワード</label>
<Input type='text'/>
    </form>
   
  )
}

export default SignUpForm