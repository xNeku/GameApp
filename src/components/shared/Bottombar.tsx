import { bottombarLinks } from '@/constants';
import { Link, useLocation} from 'react-router-dom';

const Bottombar = () => {

  const { pathname } = useLocation(); 
  return (
    <section className='bottom-bar'>
        {bottombarLinks.map((link) =>{
                    const isActive = pathname === link.route;

                    return (
                        
                         <Link 
                                to={link.route}
                                key={link.imgURL}
                                className={` ${isActive && 
                                  "bg-primary-500 rounded-[10px] "
                             }flex-center flex-col gap-1 p-2 transition`}
                            >
                                <img src={link.imgURL}
                                    alt={link.imgURL}
                                    width={20}
                                    height={20}
                                     className={` ${isActive && 
                                      "invert-white"
                                        }`}
                                 />
                                <p className='tiny-medium text-light-2'></p>
                         </Link>
                        
                    
                )
                })}
    </section>
  )
}

export default Bottombar