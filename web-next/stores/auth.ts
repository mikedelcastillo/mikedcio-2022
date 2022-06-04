import type { User } from "@prisma/client"

import { atom, Atom } from "jotai"
import { atomPersist } from "./index"

export const authLoadingAtom = atom(false)
export const userAtom:Atom<User|null> = atom(null)
export const isLoggedInAtom = atom((get) => get(userAtom) !== null)
export const tokenAtom:Atom<string|null> = atomPersist("token", null)





