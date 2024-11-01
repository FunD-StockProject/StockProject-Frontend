const setItemLocalStorage = (name: string, data: any) => {
  if(typeof(data) == 'object') {
    localStorage.setItem(name, JSON.stringify(data));
  } else if(typeof(data) == 'number') {
    localStorage.setItem(name, data.toString());
  } else {
    localStorage.setItem(name, data);
  }
}

const getItemLocalStorage = (name: string) => {
  const data = localStorage.getItem(name);

  // Wrong item name cause (null)
  if(data == null) return null;

  // number and object type can parse from JSON
  try {
    const json = JSON.parse(data);
    return json;
  } catch {
    return data;
  }
}

const isExistItemLocalStorage = (name: string) => {
  return localStorage.getItem(name) ? true : false;
}

export {setItemLocalStorage, getItemLocalStorage, isExistItemLocalStorage};