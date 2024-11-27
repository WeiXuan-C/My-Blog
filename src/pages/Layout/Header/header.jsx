import Breadcrumb from './breadcrumb';

const Header = ({ path }) => {
  return (
    <header>
      <Breadcrumb path={path} />
    </header>
  );
};

export default Header;