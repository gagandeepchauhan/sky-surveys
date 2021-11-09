import {useState,useEffect} from 'react'

function getInitialValue(key,initialValue){
	const data = localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))
	if(data) return data
	if(initialValue instanceof Function) return initialValue()
	return initialValue
}

export function useLocalStorage(key,initialValue) {
	const [value,setValue] = useState(()=>getInitialValue(key,initialValue))
	useEffect(()=>{
		localStorage.setItem(key, JSON.stringify(value))
	},[value])
	return [
		value,
		setValue
	]
}