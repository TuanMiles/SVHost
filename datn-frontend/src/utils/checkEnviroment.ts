const Enviroment = (path = ''): string => {
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:8000/${path}`
  } else if (process.env.NODE_ENV === 'production') {
    return `https://duantotnghiep-gsy4.onrender.com/${path}`
  } else {
    return `https://duantotnghiep-gsy4.onrender.com/${path}`
  }
}

export default Enviroment
