import { useReducer, useState } from 'react'

// Formun yanında adı, soyadı ve saat dilimini görüntüleyin
// Bonus: Herhangi bir değer eksikse kaydet butonunu devre dışı bırakalım
const reducer = (state, action)=>{
if(action.type==="NAME"){
const newName=action.payload
return{...state,name:newName,charge:false}
}
if(action.type==="SURNAME"){
  const newSurName=action.payload
  return{...state,surName:newSurName,charge:false}
}
if(action.type==="CLOCK"){
  const newClock=action.payload
  return{...state,clock:newClock,charge:false}
}

if(action.type==="SEND"){
  return {...state,charge:true }
}


}



const initialState = {
  name:"",
  surName:"",
  clock:"",
  charge:null
};


export default function PersonalInfo() {
  const [state, dispatch] = useReducer(reducer, initialState);

 let newButton = !(state.name && state.surName && state.clock);
  return (
    <div className='bg-gray-800 h-screen divide-y divide-white/5'>
      <div className='grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8'>
        <div>
          <h2 className='text-base font-semibold leading-7 text-white'>
            Adı Soyadı
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-400'>Zaman Dilimi</p>
        </div>

        <form className='md:col-span-2' onSubmit={(e)=>{
          e.preventDefault()
          dispatch({type:"SEND",})}}>
          <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='first-name'
                className='block text-sm font-medium leading-6 text-white'
              >
                Adınız
              </label>
              <div className='mt-2'>
                <input
                value={state.name}
                  type='text'
                  name='first-name'
                  id='first-name'
                  autoComplete='given-name'
                 onChange={(e)=>{
                  dispatch({type:"NAME",payload:e.target.value})
                 }}
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='last-name'
                className='block text-sm font-medium leading-6 text-white'
              >
                Soyadınız
              </label>
              <div className='mt-2'>
                <input 
                    onChange={(e) => {
                      dispatch({type:"SURNAME",payload:e.target.value})
                    
                  }}
                  value={state.surName}
                  type='text'
                  name='last-name'
                  id='last-name'
                  autoComplete='family-name'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='timezone'
                className='block text-sm font-medium leading-6 text-white'
              >
                Zaman Dilimi
              </label>
              <div className='mt-2'>
                <select
              value={state.clock}
                onChange={(e)=>{dispatch({type:"CLOCK",payload:e.target.value})}}
                  id='timezone'
                  name='timezone'
                  className='block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black'
                >
                  <option value=""></option>
                  <option value="Pasifik Standart Saati">Pasifik Standart Saati</option>
                  <option value="Doğu Standart Saati">Doğu Standart Saati</option>
                  <option value="Greenwich Ortalama Saati">Greenwich Ortalama Saati</option>
                </select>
              </div>
            </div>
          </div>

          <div className='mt-8 flex'>
            <button
            disabled={newButton}
              type='submit'
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                !newButton ? 'bg-indigo-500 hover:bg-indigo-400' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
      {state.charge?<div className='px-4 py-4'>
        <h3 className='text-white text-lg'>Girdiğiniz Bilgiler:</h3>
        <div className='mt-2'>
          <div className='text-gray-400'>Ad: {state.name}</div>
          <div className='text-gray-400'>Soyad: {state.surName}</div>
          <div className='text-gray-400'>Zaman Dilimi: {state.clock}</div>
        </div>
      </div>:null}
      
    </div>
  )
}
