const setClassNames = (list: (any)[]) => {
  return list.filter(i => typeof i === 'string').join(' ')
}

export default setClassNames;