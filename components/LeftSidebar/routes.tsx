import {
  ChartSquareBarIcon,
  SwitchHorizontalIcon,
  CalendarIcon,
  CogIcon,
} from '@heroicons/react/outline'

export const routes = [
  {
    icon: <ChartSquareBarIcon width={25} height={25} />,
    text: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <SwitchHorizontalIcon width={25} height={25} />,
    text: 'Transactions',
    path: '/dashboard',
  },
  {
    icon: <CalendarIcon width={25} height={25} />,
    text: 'Calendar',
    path: '/dashboard',
  },
  {
    icon: <CogIcon width={25} height={25} />,
    text: 'Settings',
    path: '/dashboard',
  },
]
