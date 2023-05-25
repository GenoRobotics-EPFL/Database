import { useState } from "react";
import { API } from "../types";
import { URL } from "./config";

// template
// https://github.com/workfall/multipart-upload-frontend

const FILE_SIZE_THRESHOLD = 5 * 1024 * 1024 // 5MB
const CHUNK_SIZE = FILE_SIZE_THRESHOLD

type ProgressState = {
  step: number
  total: number
}

export type FileUploader = {
  loading: boolean
  /** Value in [0, 1] */
  progress: number
  uploadFile: (file: File, apiKey: string | null) => Promise<Response>
}

function useFileUploader(): FileUploader {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0.0)

  const uploadFile = async (file: File, apiKey: string | null) => {
    setLoading(true)
    setProgress(0.0)
    let r
    if (file.size <= FILE_SIZE_THRESHOLD) {
      r = await uploadSmallFile(file, apiKey)
    } else {
      r = await uploadLargeFile(file, apiKey)
    }
    setLoading(false)
    return r
  }

  const uploadSmallFile = async (file: File, apiKey: string | null) => {
    const resUrl = await fetch(
      `${URL}/files/upload/url/${file.name}`, {
      headers: {
        ...(apiKey ? { 'Api-Key': apiKey } : {})
      }
    })
    const dataUrl = await resUrl.json() as API.S3UploadFileURL
    return await fetch(
      dataUrl.url,
      {
        method: 'PUT',
        body: file,
      }
    )
  }

  const uploadChunk = async (url: string, chunk: Blob, ps: ProgressState) => {

    const res = await fetch(
      url,
      {
        method: "PUT",
        body: chunk,
      }
    )
    ps.step += 1
    setProgress(ps.step / ps.total)
    return res
  }

  const uploadLargeFile = async (file: File, apiKey: string | null) => {
    const nParts = Math.ceil(file.size / CHUNK_SIZE)

    const resStart = await fetch(
      `${URL}/files/upload/large-start/${file.name}?n_parts=${nParts}`,
      {
        method: 'POST',
        headers: {
          ...(apiKey ? { 'Api-Key': apiKey } : {})
        }
      },
    )
    if (resStart.status != 200) { return resStart }

    const dataStart = await resStart.json() as API.S3UploadFileStart

    // upload chunks in parrallel
    // use ps object to avoid closure bugs
    const ps = { step: 0, total: nParts }
    const etags = []
    const promises: Promise<Response>[] = []

    for (let i = 0; i < nParts; i++) {
      const chunk = file.slice(i * CHUNK_SIZE, Math.min((i + 1) * CHUNK_SIZE, file.size))
      const promise = uploadChunk(dataStart.urls[i], chunk, ps)
      promises.push(promise)
    }

    for (const promise of promises) {
      const res = await promise
      const etag = res.headers.get("ETag")
      etags.push(etag)
    }

    const resEnd = await fetch(
      `${URL}/files/upload/large-complete/${file.name}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { 'Api-Key': apiKey } : {})
        },
        body: JSON.stringify({
          upload_id: dataStart.upload_id,
          parts: etags.map((etag, i) => ({ etag: etag, part: i + 1 }))
        })
      },
    )
    return resEnd
  }

  return {
    loading,
    progress,
    uploadFile,
  }
}

export default useFileUploader