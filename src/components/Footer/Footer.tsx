import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './Footer.css';

const credentialInfos = [
  {
    name: 'ByFish',
    github: 'https://github.com/ByFishh',
    x: 'https://twitter.com/ByFishh',
    address: '0xf859de92a63070c54d05e33a4e99d707a34fdb12',
  },
  {
    name: 'R0BIN0',
    github: 'https://github.com/R0BIN0',
  },
];

const Footer = () => {
  const renderLogo = useMemo(
    () => (
      <Link to="/">
        <div className="footer-logo-container">
          <img src="icon.svg" alt="zkFlow" />
          <p>
            zk<strong>FLOW</strong>
          </p>
        </div>
      </Link>
    ),
    [],
  );

  return (
    <>
      <footer className="footer-container">
        <div className="footer-left">
          <div>{renderLogo}</div>
          <div className="footer-credential-section">
            <p className="footer-credential-title">DEVELOPERS</p>
            <div className="footer-credential-container">
              {credentialInfos.map((item) => (
                <div className="footer-credential-item" key={uuidv4()}>
                  <p className="footer-credential-item-title">{item.name}</p>
                  {item.github && (
                    <p className="footer-credential-item-link">
                      Github: <a href={item.github}>{item.github}</a>
                    </p>
                  )}
                  {item.x && (
                    <p className="footer-credential-item-link">
                      Twitter: <a href={item.x}>{item.x}</a>
                    </p>
                  )}
                  {item.address && (
                    <p className="footer-credential-item-link">
                      Donate: <a href={'https://debank.com/profile/' + item.address}>{item.address}</a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-powered"></p>
        </div>
      </footer>
      <div className="footer-bottom">
        <p className="footer-attention">
          Please conduct your own research and exercise due diligence before utilizing the services advertised on
          zkFlow. ZkFlow is not responsible in case of scam or lost of money
        </p>
      </div>
    </>
  );
};

export default Footer;
