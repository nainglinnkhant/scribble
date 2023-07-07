'use client'

import { useMembersStore } from '@/stores/membersStore'
import { ScrollArea } from '@/components/ui/ScrollArea'

export default function MemberList() {
  const members = useMembersStore(state => state.members)

  return (
    <div className='my-6'>
      <h2 className='pb-2.5 font-medium'>Members</h2>

      <ScrollArea className='h-48'>
        <ul className='flex flex-col gap-1 rounded-md px-1'>
          {members.map(({ id, username }) => (
            <li key={id}>{username}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
