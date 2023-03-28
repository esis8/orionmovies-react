import '../styles/footer.scss';


const Footer = () =>{


    return (

        <div className="footer">
            <footer>
                <hr/>
                <nav>
                    <div className='icons'>
                        <a href='https://github.com/esis8' target="_blank" rel='noopener noreferrer'>
                            <i className="bi bi-github"></i>
                        </a>
                        <a href='https://github.com/shito8' target="_blank" rel='noopener noreferrer'>
                            <i className="bi bi-github"></i>
                        </a>
                    </div>
                    <div className='rights'>
                        <p>Copyright © 2023, Orion Governance. All Rights Reserved.</p>
                    </div>
                </nav>
            </footer>

        </div>
    )
}

export default Footer;