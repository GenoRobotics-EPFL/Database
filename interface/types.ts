import internal from "stream"
import { SecureContext } from "tls"

export namespace API {

  export type Person = {
    id: number
    name: string
    email: string
  }

  export type Location = {
    id: number
    collection_area: string
    gps: string
    elevation: number
  }

  export type Sample = {
    id: number
    person_id: number
    location_id: number
    timestamp: Date
    sex: string,
    lifestage: string,
    reproduction: string,
    image_url: string
    image_timestamp: Date
    image_desc: string
  }

  export type AmplificationMethod = {
    id: number
    name: string
  }

  export type Amplification = {
    id: number
    sample_id: number
    amplification_method_id: number
    timestamp: Date
  }

  export type SequencingMethod = {
    id: number
    name: string
    description: string
    type: string
  }

  export type Sequencing = {
    id: number
    sample_id: number
    amplification_id: number
    sequencing_method_id: number
    timestamp: Date
    base_calling_file: string

    //Store the location of the file

  }

  export type PlantIdentification = {
    id: number
    sample_id: number
    sequencing_id: number
    taxonomy_id: number
    identification_method_id: number
    timestamp: Date
    seq1_score: number
    seq2_score: number
    seq3_score: number
    seq4_score: number
  }

  export type IdentificationMethod = {
    id: number
    name: string
    description: string
    type: string
    version: number
  }

  export type Taxonomy = {
    id: number
    domain: string
    kingdom: string
    phylum: string
    class_: string
    family: string
    species: string
  }

  export type ConsensusSegment = {
    id: number
    sequence_id: number
    segment_sequence: string
    primer_name: string
    primer_desc: string
    primer2_name: string
    primer2_desc: string
    DNA_region: string
    sequence_length: string
  }


}


