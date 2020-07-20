export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Utenti',
    to: '/users',
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Info',
    to: '/about',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Impostazioni',
    route: '/settings',
    icon: 'cil-settings',
    _children:[
      {
        _tag: 'CSidebarNavItem',
        name: 'Modifica Email',
        to: '/settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modifica Password',
        to: '/settings',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Modifica Foto profilo',
        to: '/settings',
      }
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'File Upload',
    to: '/fileUpload',
    icon: 'cil-cloud-upload',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Mappe',
    to: '/mappe',
    icon: 'cil-map',
  },
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  },
  
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

