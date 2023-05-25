import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { API, Core } from '../types'
import { URL } from './config'

type TypeUseState<T> = [T, Dispatch<SetStateAction<T>>]

export type DataProxy<U> = {
  get: (force?: boolean) => Promise<U[]>
  put: (id: number, data: Omit<U, "id">) => Promise<Response>
  post: (data: Omit<U, "id">) => Promise<Response>
  delete: (id: number) => Promise<Response>
}

export type DataState = ReturnType<typeof useInternalDataState>

function getDataProxy<U extends Core.Identifiable>(
  resource: string,
  apiKey: string | null,
  setLoading: (v: boolean) => void,
  [state, setState]: TypeUseState<U[] | null>,
): DataProxy<U> {

  async function get<T>(endpoint: string): Promise<T> {
    setLoading(true)
    const response = await fetch(`${URL}/${endpoint}`, {
      headers: {
        ...(apiKey ? { 'Api-Key': apiKey } : {})
      }
    })
    if (!response.ok) {
      return Promise.reject(response)
    }
    const data = await response.json() as T
    setLoading(false)
    return data
  }

  async function post<T>(endpoint: string, data: T): Promise<Response> {
    const response = await fetch(
      `${URL}/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'Api-Key': apiKey } : {})
        },
        body: JSON.stringify(data),
      }
    )
    return response
  }

  async function put<T>(endpoint: string, id: number, data: T): Promise<Response> {
    const response = await fetch(
      `${URL}/${endpoint}/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'Api-Key': apiKey } : {})
        },
        body: JSON.stringify(data),
      }
    )
    return response
  }

  async function delete_(endpoint: string, id: number): Promise<Response> {
    const response = await fetch(
      `${URL}/${endpoint}/${id}`,
      {
        method: 'DELETE',
        headers: {
          ...(apiKey ? { 'Api-Key': apiKey } : {})
        },
      }
    )
    return response
  }

  return {
    get: async (force?: boolean): Promise<U[]> => {
      if (state === null || force) {
        const p = await get<U[]>(resource)
        setState(p)
        return p
      }
      return state
    },

    put: async (id: number, data: Omit<U, "id">): Promise<Response> => {
      const response = await put(resource, id, data)
      if (!response.ok) {
        return Promise.reject(response)
      }
      if (state !== null) {
        const p = await get<U[]>(resource)
        setState(p)
      }
      return response
    },

    post: async (data: Omit<U, "id">,
    ): Promise<Response> => {
      const response = await post(resource, data)
      if (!response.ok) {
        return Promise.reject(response)
      }
      if (state !== null) {
        const p = await get<U[]>(resource)
        setState(p)
      }
      return response
    },

    delete: async (id: number
    ): Promise<Response> => {
      const response = await delete_(resource, id)
      if (!response.ok) {
        return Promise.reject(response)
      }
      if (state !== null) {
        const p = await get<U[]>(resource)
        setState(p)
      }
      return response
    },
  }
}

function useInternalDataState() {
  const [loading, setLoading] = useState<boolean>(false)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [persons, setPersons] = useState<API.Person[] | null>(null)
  const [locations, setLocations] = useState<API.Location[] | null>(null)
  const [amplificationMethods, setAmplificationMethods] = useState<API.AmplificationMethod[] | null>(null)
  const [plantIdentifications, setPlantIdentifications] = useState<API.PlantIdentification[] | null>(null)
  const [identificationMethods, setIdentificationMethods] = useState<API.IdentificationMethod[] | null>(null)
  const [samples, setSamples] = useState<API.Sample[] | null>(null)
  const [sequencings, setSequencings] = useState<API.Sequencing[] | null>(null)
  const [sequencingMethods, setSequencingMethods] = useState<API.SequencingMethod[] | null>(null)
  const [taxonomies, setTaxonomies] = useState<API.Taxonomy[] | null>(null)
  const [consensusSegments, setConsensusSegments] = useState<API.ConsensusSegment[] | null>(null)

  const proxyPerson = getDataProxy<API.Person>("persons", apiKey, setLoading, [persons, setPersons])
  const proxyLocation = getDataProxy<API.Location>("locations", apiKey, setLoading, [locations, setLocations])
  const proxyAmplificationMethod = getDataProxy<API.AmplificationMethod>("amplification_methods", apiKey, setLoading, [amplificationMethods, setAmplificationMethods])
  const proxyPlantIdentification = getDataProxy<API.PlantIdentification>("plant_identifications", apiKey, setLoading, [plantIdentifications, setPlantIdentifications])
  const proxyIdentificationMethod = getDataProxy<API.IdentificationMethod>("identification_methods", apiKey, setLoading, [identificationMethods, setIdentificationMethods])
  const proxySample = getDataProxy<API.Sample>("samples", apiKey, setLoading, [samples, setSamples])
  const proxySequencing = getDataProxy<API.Sequencing>("sequencings", apiKey, setLoading, [sequencings, setSequencings])
  const proxySequencingMethod = getDataProxy<API.SequencingMethod>("sequencing_methods", apiKey, setLoading, [sequencingMethods, setSequencingMethods])
  const proxyTaxonomy = getDataProxy<API.Taxonomy>("taxonomies", apiKey, setLoading, [taxonomies, setTaxonomies])
  const proxyConsensusSegment = getDataProxy<API.ConsensusSegment>("consensus_segments", apiKey, setLoading, [consensusSegments, setConsensusSegments])

  useEffect(() => {
    const _apiKey = getCookie('genorobotics-api-key') as string | undefined
    setApiKey(_apiKey ?? null)
  }, [])

  useEffect(() => {
    if (!apiKey) return
    const cb = async () => {
      setLoading(true)
      const promises = [
        proxyPerson.get(true),
        proxyLocation.get(true),
        proxyAmplificationMethod.get(true),
        proxyPlantIdentification.get(true),
        proxyIdentificationMethod.get(true),
        proxySample.get(true),
        proxySequencing.get(true),
        proxySequencingMethod.get(true),
        proxyTaxonomy.get(true),
        proxyConsensusSegment.get(true),
      ]
      let invalidAuth = false
      for (const p of promises) {
        try {
          await p
        } catch {
          invalidAuth = true
        }
      }
      if (invalidAuth) {
        // remove wrong api key
        setApiKey(null)
        deleteCookie('genorobotics-api-key')
      }
      setLoading(false)
    }
    cb()
  }, [apiKey])

  return {
    loading,
    apiKey,
    setApiKey: (v: string) => {
      setApiKey(v)
      setCookie("genorobotics-api-key", v, { maxAge: 60 * 60 * 24 * 30 * 6 })
    },
    persons: persons ?? [],
    postPerson: proxyPerson.post,
    putPerson: proxyPerson.put,
    deletePerson: proxyPerson.delete,
    locations: locations ?? [],
    postLocation: proxyLocation.post,
    putLocation: proxyLocation.put,
    deleteLocation: proxyLocation.delete,
    amplificationMethods: amplificationMethods ?? [],
    postAmplificationMethod: proxyAmplificationMethod.post,
    putAmplificationMethod: proxyAmplificationMethod.put,
    deleteAmplificationMethod: proxyAmplificationMethod.delete,
    plantIdentifications: plantIdentifications ?? [],
    postPlantIdentification: proxyPlantIdentification.post,
    putPlantIdentification: proxyPlantIdentification.put,
    deletePlantIdentification: proxyPlantIdentification.delete,
    identificationMethods: identificationMethods ?? [],
    postIdentificationMethod: proxyIdentificationMethod.post,
    putIdentificationMethod: proxyIdentificationMethod.put,
    deleteIdentificationMethod: proxyIdentificationMethod.delete,
    samples: samples ?? [],
    postSample: proxySample.post,
    putSample: proxySample.put,
    deleteSample: proxySample.delete,
    sequencings: sequencings ?? [],
    postSequencing: proxySequencing.post,
    putSequencing: proxySequencing.put,
    deleteSequencing: proxySequencing.delete,
    sequencingMethods: sequencingMethods ?? [],
    postSequencingMethod: proxySequencingMethod.post,
    putSequencingMethod: proxySequencingMethod.put,
    deleteSequencingMethod: proxySequencingMethod.delete,
    taxonomies: taxonomies ?? [],
    postTaxonomy: proxyTaxonomy.post,
    putTaxonomy: proxyTaxonomy.put,
    deleteTaxonomy: proxyTaxonomy.delete,
    postConsensusSegment: proxyConsensusSegment.post,
    putConsensusSegment: proxyConsensusSegment.put,
    deleteConsensusSegment: proxyConsensusSegment.delete,
    consensusSements: consensusSegments ?? [],
  }
}

const dataStateContext = createContext<DataState>({} as any)

export interface DataStateProviderProps {
  children: ReactNode
}

export const DataStateProvider: FC<DataStateProviderProps> = (props) => {
  const values = useInternalDataState()
  return (
    <dataStateContext.Provider value={values}>
      {props.children}
    </dataStateContext.Provider>
  )
}

export const useDataState = () => useContext(dataStateContext)
