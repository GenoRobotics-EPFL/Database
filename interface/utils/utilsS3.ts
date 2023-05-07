import { URL } from "./config"

export async function downloadFile(filename: string) {
    const response = await fetch(`${URL}/files/download/url/${filename}`)
    const url = (await response.json()).url as string
    const resp = await fetch(url)
    const blob = await resp.blob()
    const tempUrl = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.style.display = "none"
    a.href = tempUrl
    a.download = filename
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(tempUrl)
}

export async function fileExists(filename: string): Promise<boolean> {
    const response = await fetch(`${URL}/files/exists/${filename}`)
    return (await response.json()).exists
}

export async function deleteFile(filename: string) {
    await fetch(`${URL}/files/${filename}`, { method: "DELETE" })
}