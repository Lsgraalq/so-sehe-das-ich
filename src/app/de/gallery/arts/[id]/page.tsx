import ArtClient from "@/components/ArtClient"

type Props = {
  params: { id: string }
}

export default function ArtPage({ params }: Props) {
  return <ArtClient id={params.id} />
}
