import React, {useState} from 'react'
import PersonalContainer from '../Personal'
import BusinessContainer from '../Business'

export default function Dashboard() {
  const [isActive, setActive] = useState('business')
  const activateBusinessPanel = () => {
    setActive('business')
  }

  const activatePersonalPanel = () => {
   setActive('personal')
  }

  return (
    <div>
      <div className="px-6 py-6 shadow-lg text-lg font-semibold text-red-500">SUMOTAXES</div>
      <div className="mt-6 flex px-4 py-4">
        <div onClick={activateBusinessPanel} className={`w-1/2  px-4 py-4 border rounded-lg  ${isActive === 'business' ? 'bg-rose-400 shadow-lg text-white ' : 'bg-slate-300 shadow-md text-slate-400'}` }>
          Business
        </div>
        <div onClick={activatePersonalPanel} className={`w-1/2  px-4 py-4 shadow-md border ml-4 rounded-lg ${isActive === 'personal' ? 'bg-rose-400 shadow-lg text-white' : 'bg-slate-300 shadow-md text-slate-400'}`}>
          Personal
        </div>
      </div>
      <div className="mt-4">
        { isActive === 'business' && <BusinessContainer />}
        { isActive === 'personal' && <PersonalContainer />}
      </div>
    </div>
  )
}
