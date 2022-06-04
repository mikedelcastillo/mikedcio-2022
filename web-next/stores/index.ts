import { atom, Atom } from "jotai"

export const atomPersist = (key: string, initialValue: any):Atom<any> => {
    const getInitialValue = () => {
        if(typeof window !== "undefined"){
            const item = window.localStorage.getItem(key)
            if (item !== null) {
                try{
                    return JSON.parse(item)
                } catch(e){

                }
            }
        }
        return initialValue
    }
    const baseAtom = atom(getInitialValue())
    const derivedAtom = atom(
        (get) => get(baseAtom),
        (get, set, update) => {
            const nextValue =
          typeof update === "function" ? update(get(baseAtom)) : update
            set(baseAtom, nextValue)
            if(typeof window !== "undefined"){
                window.localStorage.setItem(key, JSON.stringify(nextValue))
            }
        }
    )
    return derivedAtom
}