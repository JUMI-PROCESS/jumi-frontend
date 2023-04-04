import {createContext} from 'react'
import { FormRepositoryFake } from '../forms/adapters/FormRepositoryFake'

export const RepositoryContextDefault = new FormRepositoryFake()
export const RepositoryContext = createContext({form:RepositoryContextDefault})