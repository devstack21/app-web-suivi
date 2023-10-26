

import { stringValues } from "config"

export const setToken = (userToken) =>{
  try{
    localStorage.setItem(stringValues.cookiesToken, JSON.stringify(userToken))
    return true
  }
  catch(error){ return false }
}

export const getToken = () =>{
  let token = JSON.parse(localStorage.getItem(stringValues.cookiesToken))
  return token
}

export const deleteToken = () =>{
  localStorage.removeItem(stringValues.cookiesToken) 
}



export const getUserInfo = () =>{
  const userInfo = JSON.parse(localStorage.getItem(stringValues.userInfo))
  return userInfo
}

export const setUserInfo = (userData) =>{
  try{
    localStorage.setItem(stringValues.userInfo, JSON.stringify(userData))
    return true
  }
  catch(error){ return false }
}


export const deleteUserInfo = () =>{
  localStorage.removeItem(stringValues.userInfo) 
}