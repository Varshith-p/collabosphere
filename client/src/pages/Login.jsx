import {useState} from 'react'

const Login = () => {
  const [selected, setSelected] = useState('login')

  return (
    // <div>
    //     <div id="card" className={"rounded-xl border bg-card text-card-foreground shadow"}></div>
    //       <div id="cardHeader" className={"flex flex-col space-y-1.5 p-6"}></div>
    //       <h3 id="CardTitle" className={"font-semibold leading-none tracking-tight"}></h3>
    //       <p id="cardDesc" className={"text-sm text-muted-foreground"}></p>
    //       <div id="cardContent" className={"p-6 pt-0"}></div>
    //       <div id="cardFooter" className={" flex items-center p-6 pt-0"}></div>
    //       <div id="tabsContent" className={"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"} ></div>
    //       <div id="tabs" className="bg-gray-100 border border-gray-200 rounded-lg p-4"></div>
    //       <ul className={"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"}>

    //       </ul>
    // </div>
    <div className="flex w-screen h-screen items-center justify-center">
    <div defaultValue="sign in" className="bg-white rounded-lg p-4 w-[400px]">
      <ul className="grid w-full grid-cols-2 text-center bg-gray-100 py-1 rounded-md">
        <li onClick={() => setSelected('login')} className={selected==='login' ? "bg-white rounded-md mx-1 cursor-pointer" : "rounded-md mx-1 cursor-pointer text-gray-600"}>Login</li>
        <li onClick={() => setSelected('sign up')} className={selected==='sign up' ? "bg-white rounded-md mx-1 cursor-pointer" : "rounded-md mx-1 cursor-pointer text-gray-600"}>Sign Up</li>
      </ul>
      {selected === 'login' &&
      <div value="account" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Login</h3>
            <p className="text-sm text-muted-foreground">
              Login to your account here.
            </p>
          </div>
          <div className="p-6 pt-0 space-y-2">
            <div className="space-y-1 flex flex-col gap-2">
              <label>Email</label>
              <input type='email' className='border px-2 py-1 rounded-md border-gray-300 focus:outline-0 focus:border-gray-500' />
            </div>
            <div className="space-y-1 flex flex-col gap-2">
              <label htmlFor="username">Password</label>
              <input type='password' className='border px-2 py-1 rounded-md border-gray-300 focus:outline-0 focus:border-gray-500' />
            </div>
          </div>
          <div className={" flex items-center p-6 pt-0"}>
            <button className='bg-[#407bff] text-white py-1 px-4 rounded-md'>Login</button>
          </div>
        </div>
      </div>}
      {selected === 'sign up' &&
      <div value="password" className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <div className={"rounded-xl border bg-card text-card-foreground shadow"}>
          <div className={"flex flex-col space-y-1.5 p-6"}>
            <h3 className={"font-semibold leading-none tracking-tight"}>Sign up</h3>
            <p className={"text-sm text-muted-foreground"}>
              Create your account here.
            </p>
          </div>
          <div className="p-6 pt-0 space-y-2">
            <div className="space-y-1 flex flex-col gap-2">
              <label>Email</label>
              <input type='email' className='border px-2 py-1 rounded-md border-gray-300 focus:outline-0 focus:border-gray-500' />
            </div>
            <div className="space-y-1 flex flex-col gap-2">
              <label>Password</label>
              <input type='password' className='border px-2 py-1 rounded-md border-gray-300 focus:outline-0 focus:border-gray-500' />
            </div>
          </div>
          <div className={" flex items-center p-6 pt-0"}>
            <button className='bg-[#407bff] text-white py-1 px-4 rounded-md'>Sign Up</button>
          </div>
        </div>
      </div>}
    </div>
    </div>
  )
}

export default Login