"use client"
import { useState } from "react"
import { QRCodeCanvas } from "qrcode.react"

export default function ShareModal({ art }: { art: any }) {
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href)
    alert("Ссылка скопирована ✅")
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Поделиться
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              ✕
            </button>

            <div className="flex gap-6 items-center">
              <QRCodeCanvas value={window.location.href} size={150} />

              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <h2 className="font-bold text-lg">{art.title}</h2>
                {art.authorUsername && <p>Автор: {art.authorUsername}</p>}
                {(art.width || art.height) && (
                  <p>
                    Размер: {art.width ?? "?"} x {art.height ?? "?"} см
                  </p>
                )}
                <button
                  onClick={handleCopy}
                  className="mt-3 px-3 py-1 bg-black text-white rounded-md"
                >
                  Копировать ссылку
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
