import Header from "./Header";

const Layout = (props) => {
  return (
    <article>
      <Header />
      <main>{props.children}</main>
    </article>
  );
};

export default Layout;
