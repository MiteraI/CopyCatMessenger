import AuthButton from '@/components/AuthButton'
import PostApi from '@/components/PostApi'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Main page <span><AuthButton></AuthButton></span></div>
      <PostApi></PostApi>
    </main>
  )
}
