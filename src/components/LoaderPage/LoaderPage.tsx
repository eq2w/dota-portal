import './LoaderPage.scss'


const LoaderPage = () => {
    return (
        <section className='loader'>
            <div className="container">
                <div className="loader__wrapper skeleton skeleton__page"></div>
            </div>
        </section>
    )
}

export default LoaderPage