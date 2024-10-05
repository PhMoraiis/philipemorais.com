// 'use client'

// import { motion } from 'framer-motion'
// import { Hexagon, Search, SquareTerminal } from 'lucide-react'
// import { useEffect, useState } from 'react'
// import Magnetic from '../Magnetic'
// import { Badge } from '../ui/badge'
// import { Button } from '../ui/button'
// import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'

// const SearchBar = () => {
//   const [open, setOpen] = useState(false)

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
//       event.preventDefault()
//       setOpen((open) => !open)
//     }
//   }

//   return (
//     <div className="w-full flex-1">
//       <motion.div
//         transition={{ type: 'spring', stiffness: 150, damping: 17, bounce: 1 }}
//         className='flex justify-between items-center'>
//         <Button onClick={() => setOpen((open) => !open)} variant='outline' size='lg' className='gap-2 justify-between'>
//           <Search className='h-4 w-4 text-muted-foreground' size={22} />
//           Busque por Projetos
//           <Badge variant='default' className='ml-2'>Ctrl + K</Badge>
//         </Button>
//         <CommandDialog open={open} onOpenChange={setOpen}>
//           <CommandInput placeholder='Digite o nome do Projeto ou Tecnologia...' />
//           <CommandList className='overflow font-Relative'>
//             {projects.length === 0 && techs.length === 0 ? (
//               <CommandEmpty>Nenhum projeto ou tecnologia encontrado.</CommandEmpty>
//             ) : (
//               <div>
//                 <CommandGroup heading="Projetos">
//                   {projects.map((project) => (
//                     <CommandItem key={project.id}>
//                       <Button variant="noHover" size="sm" className='m-0 p-0'>
//                         <Magnetic>
//                           <SquareTerminal className="mr-2 h-4 w-4" />
//                         </Magnetic>
//                         <span className='text-md hover:animate-text-shake'>{project.name}</span>
//                       </Button>
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//                 <CommandGroup heading="Tecnologias">
//                   {techs.map((tech) => (
//                     <CommandItem key={tech.id}>
//                       <Button variant="noHover" size="sm" className='m-0 p-0'>
//                         <div className='flex'>
//                           <Magnetic>
//                             <Hexagon className="mr-2 h-4 w-4" />
//                           </Magnetic>
//                           <span className='text-md hover:animate-text-shake'>{tech.name}</span>
//                         </div>
//                       </Button>
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </div>
//             )}
//           </CommandList>
//         </CommandDialog>
//       </motion.div>
//     </div>
//   )
// }

// export default SearchBar
