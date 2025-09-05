'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'

// ---- Types ----
type Painting = {
  id: string
  title: string
  coverUrl?: string
  createdAt: string
}

type Profile = {
  id: string
  displayName: string
  username: string
  bio?: string
  avatarUrl?: string
  website?: string
  location?: string
  stats: {
    paintings: number
    likes: number
    followers: number
  }
}

// ---- Mock data (replace with your data fetching) ----
const MOCK_PROFILE: Profile = {
  id: 'u_123',
  displayName: 'Ilya Merynets',
  username: 'ilya.m',
  bio: 'Креативный художник и фотограф. Люблю холодный свет и крупные формы.',
  avatarUrl: '',
  website: 'https://example.com',
  location: 'Bratislava, SK',
  stats: { paintings: 6, likes: 241, followers: 128 },
}

const MOCK_PAINTINGS: Painting[] = [
  { id: 'p_1', title: 'Noir City', createdAt: '2025-01-02' },
  { id: 'p_2', title: 'Ocean Veins', createdAt: '2025-02-10' },
  { id: 'p_3', title: 'Still Life 22', createdAt: '2025-03-05' },
  { id: 'p_4', title: 'Haze Portrait', createdAt: '2025-04-18' },
  { id: 'p_5', title: 'Blue Spiral', createdAt: '2025-05-09' },
  { id: 'p_6', title: 'Industrial Sun', createdAt: '2025-06-30' },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(MOCK_PROFILE)
  const [paintings] = useState<Painting[]>(MOCK_PAINTINGS)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Local editable copy
  const [form, setForm] = useState({
    displayName: profile.displayName,
    username: profile.username,
    bio: profile.bio ?? '',
    website: profile.website ?? '',
    location: profile.location ?? '',
  })

  function startEdit() {
    setForm({
      displayName: profile.displayName,
      username: profile.username,
      bio: profile.bio ?? '',
      website: profile.website ?? '',
      location: profile.location ?? '',
    })
    setEditing(true)
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)

    // TODO: send to your backend (Firebase/REST). Example payload:
    const payload = { ...form, id: profile.id }
    console.log('Save profile →', payload)
    await new Promise((r) => setTimeout(r, 600))

    setProfile((p) => ({
      ...p,
      displayName: form.displayName,
      username: form.username,
      bio: form.bio,
      website: form.website,
      location: form.location,
    }))
    setSaving(false)
    setEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-950 to-black text-zinc-100">
      {/* Cover */}
      <div className="h-48 md:h-64 w-full bg-[url('/your-cover.jpg')] bg-cover bg-center" />

      <main className="mx-auto max-w-6xl px-4 -mt-16 md:-mt-20 relative">
        {/* Profile Card */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-5 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 flex items-center justify-center text-2xl">
                {profile.displayName.slice(0, 1)}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">{profile.displayName}</h1>
                  <p className="text-zinc-400">@{profile.username}</p>
                  {profile.location && (
                    <p className="mt-1 text-sm text-zinc-400">{profile.location}</p>
                  )}
                  {profile.website && (
                    <a className="mt-1 block text-sm text-blue-300 hover:text-blue-200 underline underline-offset-4" href={profile.website} target="_blank" rel="noreferrer">
                      {profile.website}
                    </a>
                  )}
                </div>

                <div className="flex gap-3">
                  <Link href="/art/new" className="btn-primary">➕ Добавить картину</Link>
                  <button onClick={startEdit} className="btn-ghost">✏️ Редактировать</button>
                </div>
              </div>

              {profile.bio && (
                <p className="mt-4 text-zinc-200/90 leading-relaxed">{profile.bio}</p>
              )}

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-4 text-center">
                <Stat label="Картины" value={profile.stats.paintings} />
                <Stat label="Лайки" value={profile.stats.likes} />
                <Stat label="Подписчики" value={profile.stats.followers} />
              </div>
            </div>
          </div>
        </section>

        {/* Inline Editor */}
        {editing && (
          <section className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl p-5 md:p-8">
            <h2 className="text-lg font-semibold mb-4">Редактировать профиль</h2>
            <form onSubmit={saveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Имя и фамилия">
                <input
                  className="input"
                  value={form.displayName}
                  onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                  placeholder="Ivan Petrov"
                />
              </Field>

              <Field label="Никнейм (username)">
                <input
                  className="input"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="ivan.dev"
                />
              </Field>

              <Field label="Сайт">
                <input
                  className="input"
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                  placeholder="https://your.site"
                />
              </Field>

              <Field label="Локация">
                <input
                  className="input"
                  value={form.location}
                  onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Bratislava, SK"
                />
              </Field>

              <div className="md:col-span-2">
                <Field label="О себе">
                  <textarea
                    className="input min-h-[120px]"
                    value={form.bio}
                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                    placeholder="Короткая биография"
                  />
                </Field>
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button type="button" onClick={() => setEditing(false)} className="btn-ghost">Отмена</button>
                <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Сохранение…' : 'Сохранить'}</button>
              </div>
            </form>
          </section>
        )}

        {/* Paintings Grid */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Мои картины</h2>
            <Link href="/art/new" className="text-sm text-blue-300 hover:text-blue-200 underline underline-offset-4">Добавить ещё</Link>
          </div>

          {paintings.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paintings.map((p) => (
                <li key={p.id}>
                  <PaintingCard painting={p} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="h-14" />
      </main>

      {/* Local styles via Tailwind utilities */}
      <style>{`
        .input { @apply w-full rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/60 px-4 py-3 outline-none focus:border-white/30 focus:bg-white/15 transition; }
        .btn-primary { @apply inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium text-white bg-blue-500/90 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition; }
        .btn-ghost { @apply inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium text-white/90 bg-white/10 hover:bg-white/15 border border-white/15; }
        .chip { @apply inline-flex items-center rounded-full px-2.5 py-1 text-xs bg-white/10 border border-white/10 text-white/90; }
      `}</style>
    </div>
  )
}

// ---- UI Bits ----
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <div className="text-sm text-white/80">{label}</div>
      {children}
    </label>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/70 mt-0.5">{label}</div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="text-3xl">🖼️</div>
      <p className="mt-3 text-white/80">Пока нет картин.</p>
      <Link href="/art/new" className="mt-4 inline-block btn-primary">Добавить первую</Link>
    </div>
  )
}

function PaintingCard({ painting }: { painting: Painting }) {
  const { id, title, coverUrl } = painting
  const bg = useMemo(() => coverUrl ?? undefined, [coverUrl])

  return (
    <Link href={`/art/${id}`} className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
      <div className="aspect-[4/5] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {bg ? (
          <img src={bg} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
        )}
      </div>
      <div className="p-3 flex items-center justify-between">
        <div className="truncate font-medium">{title}</div>
        <span className="chip opacity-0 group-hover:opacity-100 transition">Открыть</span>
      </div>
    </Link>
  )
}
