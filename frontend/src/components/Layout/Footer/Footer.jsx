const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();

  return (
    <div className="FooterComponent --flex-center --py2">
      <p>All rights reserved &copy; {year}-{year+1}</p>
    </div>
  );
};

export default Footer;
