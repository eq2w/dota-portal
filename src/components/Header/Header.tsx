import SvgIcon from '../../ui/Svg/Svg'
import './Header.scss'
import IconLogo from '../../assets/icons/icon-logo.svg'
import { NavLink } from 'react-router'
import { useState } from 'react'

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleOpenBurger = () => {
        setOpen(!open)
    }
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrapper">
                    <div className="header__nav">
                        <NavLink className={'header__nav-link'} to={'/heroes'}>Герои</NavLink >
                        <NavLink className={'header__nav-link'} to={'/teams'}>Команды</NavLink >
                    </div>
                    <NavLink className={'header__nav-link header__nav-link--logo'} to={'/'} aria-label='Перейти на главную страницу' ><SvgIcon className='header__logo' width={160} height={40} icon={IconLogo} /></NavLink>
                    <div className="header__nav">
                        <NavLink className={'header__nav-link'} to={'/proPlayers'}>PRO игроки</NavLink >
                        <NavLink className={'header__nav-link'} to={'/topPlayers'}>TOP 100</NavLink >
                    </div>
                    <div className={`header__burger-menu ${open ? 'header__burger-menu--open' : ''} `} onClick={handleOpenBurger}></div>
                    <div className="header__menu">
                        <NavLink className={'header__nav-link'} to={'/heroes'} onClick={handleOpenBurger}>Герои</NavLink >
                        <NavLink className={'header__nav-link'} to={'/teams'} onClick={handleOpenBurger}>Команды</NavLink >
                        <NavLink className={'header__nav-link'} to={'/proPlayers'} onClick={handleOpenBurger}>PRO игроки</NavLink >
                        <NavLink className={'header__nav-link'} to={'/topPlayers'} onClick={handleOpenBurger}>TOP 100</NavLink >
                    </div>
                </div>
                <div className="header__overlay"></div>
            </div>
        </header>
    )
}

export default Header