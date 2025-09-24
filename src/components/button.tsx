interface ButtonProps {
  children: React.ReactNode
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-gradient-to-r from-[#FEC97C] to-[#E35A5A]  text-white rounded-lg">
      {children}
    </button>
  )
}
