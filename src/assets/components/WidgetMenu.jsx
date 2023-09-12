
import { Menu } from './Menu'
import menuData from './menuData.json';


export const WidgetMenu = () => {
  return (
    <div className='bg-white text-gray-900 dark:bg-gray-900 dark:!text-white  w-80 rounded  p-5 absolute scroll-m-0 h-3/6 overflow-auto transition-all bottom-4 right-1'>
        <div className="w-full h-8 text-center text-blue-900 dark:text-white">MENÚ CAPAS</div>
        <Menu items={menuData} />
    </div>
  )
}
