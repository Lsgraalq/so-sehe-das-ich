import ArtClient from "@/components/ArtClient"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ArtPage({ params }: Props) {
  const { id } = await params   
  return <ArtClient id={id} />
}
