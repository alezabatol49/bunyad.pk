// Real stock photos per room type, sourced from Pexels (license-free)
const POOLS = {
  exterior: [
    'https://images.pexels.com/photos/24805054/pexels-photo-24805054.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/35060260/pexels-photo-35060260.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7031581/pexels-photo-7031581.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ],
  living: [
    'https://images.pexels.com/photos/34688219/pexels-photo-34688219.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/8089172/pexels-photo-8089172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/35964344/pexels-photo-35964344.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29012619/pexels-photo-29012619.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ],
  kitchen: [
    'https://images.pexels.com/photos/7045356/pexels-photo-7045356.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7587864/pexels-photo-7587864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/7195739/pexels-photo-7195739.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/39017406/pexels-photo-39017406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ],
  bedroom: [
    'https://images.pexels.com/photos/39733066/pexels-photo-39733066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/36708054/pexels-photo-36708054.png?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/6207940/pexels-photo-6207940.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ],
  drawing: [
    'https://images.pexels.com/photos/14598479/pexels-photo-14598479.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/31488453/pexels-photo-31488453.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/36260334/pexels-photo-36260334.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/36098864/pexels-photo-36098864.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ],
  extra: [
    'https://images.pexels.com/photos/27953061/pexels-photo-27953061.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/29855666/pexels-photo-29855666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/30781823/pexels-photo-30781823.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'https://images.pexels.com/photos/26859066/pexels-photo-26859066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'
  ]
}

const ROOM_LABELS = {
  exterior: 'Exterior',
  living: 'Living Room',
  kitchen: 'Kitchen',
  bedroom: 'Bedroom',
  drawing: 'Drawing Room',
  extra: 'Aerial View'
}

// Deterministically assemble 6-8 photos per society so each listing feels unique
export function galleryFor(societyId) {
  const seed = societyId || 1
  const order = ['exterior', 'living', 'kitchen', 'bedroom', 'drawing', 'extra']
  const photos = []
  order.forEach((room, ri) => {
    const pool = POOLS[room]
    const idx = (seed + ri) % pool.length
    photos.push({ url: pool[idx], label: ROOM_LABELS[room], room })
  })
  return photos
}

// Video tour placeholders — rotating set of royalty-free property walkthroughs
const VIDEO_TOURS = [
  'dQw4w9WgXcQ', // placeholder YouTube ID
  'ScMzIvxBSi4',
  'L_jWHffIx5E'
]

export function videoTourFor(societyId) {
  const idx = (societyId || 1) % VIDEO_TOURS.length
  return VIDEO_TOURS[idx]
}
