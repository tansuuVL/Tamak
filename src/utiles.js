import Payment from "payment";


export const setLocalStorage = body => {
    localStorage.setItem("auth", JSON.stringify(body))
}

export const getLocalStorage = (title = "auth") => {
    const resp = localStorage.getItem(title)
    const parsed = JSON.parse(resp)
    return parsed
}

export const removeLocalStorage = (title="auth") => {
    localStorage.removeItem(title)
}

export const convertIngredients = (arr) => arr.join(', ') 
export const countTotal = (price, quanity) => Number(price)*Number(quanity)

export const getTotalPrice = (cart) => {
    let result = 0

    cart.forEach(item => {
        result+=item.total
    })

    return result
}
export const convertTime = tms => {
    const date = new Date(tms)

    return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
}



// CARD


export const parseCardNumber = num => {
  let result = ''
  for(let i = 0; i < num.length; i++) {
    if(num[i] !== " ") {
      result += num[i]
    }
  }
  return result
}