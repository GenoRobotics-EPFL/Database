
export namespace Core {
  export type Identifiable = {
    id: number
  }
}

export namespace API {

  export type S3UploadFileURL = {
    url: string
  }

  export type S3UploadFileStart = {
    upload_id: string
    urls: string[]
  }

  export type S3UploadFilePart = {
    part: number
    etag: string
  }

  export type S3UploadFileEnd = {
    upload_id: string
    parts: S3UploadFilePart[]
  }

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
    sex: string | null
    lifestage: string | null
    reproduction: string | null
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
    sequence_length: number
  }

  export type PlantIdentification = {
    id: number
    sample_id: number
    sequencing_id: number
    taxonomy_id: number
    identification_method_id: number
    timestamp: Date
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
    sample_id: number
    identification_id: number
    domain: string
    kingdom: string
    phylum: string
    class_: string
    family: string
    species: string
  }

}


