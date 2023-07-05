'use client'

import { ScrollArea } from './ui/ScrollArea'

const MEMBERS = ['shadcn', 'danabramov']

export default function MemberList() {
  return (
    <div className='my-6'>
      <h2 className='pb-2.5 font-medium'>Members</h2>

      <ScrollArea className='h-48'>
        <ul className='flex flex-col gap-1 rounded-md px-1'>
          {MEMBERS.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
