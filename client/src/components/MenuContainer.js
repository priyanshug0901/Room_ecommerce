import { useEffect } from "react"




const MenuContainer = ({isMenuOpen, setIsMenuOpen, children}) => {

    const handleClickListener = (e) => {
        if(isMenuOpen){

            setIsMenuOpen(false)
        }
    }
    
    useEffect(() => {
        document.addEventListener('click', handleClickListener)
        return () => {
            document.removeEventListener('click', handleClickListener)
        }
    }, [isMenuOpen])

    return (
        <div className="edit-menu">
            {children}
        </div>
    )
}


export default MenuContainer